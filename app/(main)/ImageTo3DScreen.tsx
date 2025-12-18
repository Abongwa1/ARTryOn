// app/ImageTo3DScreen.tsx
import { supabase } from '@/types/supabase';
import { Buffer } from 'buffer';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ImageTo3DScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'done'>('idle');
  const [modelUrl, setModelUrl] = useState<string | null>(null);

  const uploadInputImage = async (fileUri: string) => {
    const ext = fileUri.split('.').pop();
    const fileName = `${Date.now()}.${ext}`;
    const filePath = `image-to-3d/${fileName}`;

    const base64 = await FileSystem.readAsStringAsync(fileUri, { encoding: 'base64' });

    const { error: uploadError } = await supabase.storage
      .from('image-to-3d')
      .upload(filePath, Buffer.from(base64, 'base64'), { contentType: 'image/jpeg' });

    if (uploadError) {
      alert(uploadError.message);
      return null;
    }

    const url = supabase.storage.from('image-to-3d').getPublicUrl(filePath).data.publicUrl;
    return url;
  };

  const onPickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ 
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      quality: 0.8 
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const onConvert = async () => {
    if (!selectedImage) return;
    setStatus('processing');

    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error('User not logged in');

      const uploadedUrl = await uploadInputImage(selectedImage);
      if (!uploadedUrl) throw new Error('Upload failed');

      // Insert record in DB
      await supabase.from('image_to_3d').insert({ 
        user_id: user.id, 
        image_url: uploadedUrl, 
        status: 'processing' 
      });

      // Call Supabase Function to generate 3D model
      const { data, error } = await supabase.functions.invoke('generate-3d-model', {
        body: { image_url: uploadedUrl, user_id: user.id },
      });

      if (error) throw error;

      setModelUrl(data?.model_url || null);
      setStatus('done');
    } catch (err: any) {
      alert(err.message);
      setStatus('idle');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image → 3D Model</Text>
      <Text style={styles.subtitle}>Upload a 2D product image to generate an AR-ready 3D model.</Text>

      <TouchableOpacity style={styles.pickButton} onPress={onPickImage}>
        <Text style={styles.pickText}>{selectedImage ? 'Change Image' : 'Select Image'}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.convertButton, !selectedImage && { opacity: 0.5 }]} 
        onPress={onConvert} 
        disabled={!selectedImage || status === 'processing'}
      >
        <Text style={styles.convertText}>
          {status === 'processing' ? 'Processing...' : 'Generate 3D Model'}
        </Text>
      </TouchableOpacity>

      {status === 'processing' && <ActivityIndicator size="small" color="#10B981" style={{ marginTop: 16 }} />}
      {status === 'done' && modelUrl && (
        <Text style={styles.resultText}>3D model generated! URL: {modelUrl}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050816', padding: 16 },
  title: { color: '#ffffff', fontSize: 20, fontWeight: '700', marginBottom: 8 },
  subtitle: { color: '#9CA3AF', fontSize: 13, marginBottom: 24 },
  pickButton: { backgroundColor: '#111827', borderRadius: 10, paddingVertical: 12, alignItems: 'center', marginBottom: 16 },
  pickText: { color: '#E5E7EB' },
  convertButton: { backgroundColor: '#2563EB', borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  convertText: { color: '#ffffff', fontWeight: '600' },
  resultText: { marginTop: 24, color: '#10B981' },
});
