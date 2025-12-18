// app/CapturesScreen.tsx
import { supabase } from '@/types/supabase';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type CaptureItem = {
  id: string;
  type: 'photo' | 'video';
  file_url: string;
  created_at: string;
};

export default function CapturesScreen() {
  const [captures, setCaptures] = useState<CaptureItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadCaptures = async () => {
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert('User not logged in');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('captures')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setCaptures(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadCaptures();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (!captures.length) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#fff' }}>No captures found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Captures</Text>

      <FlatList
        data={captures}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.captureCard}>
            <Image source={{ uri: item.file_url }} style={styles.image} />
            <Text style={styles.meta}>{item.type.toUpperCase()}</Text>
            <Text style={styles.meta}>{new Date(item.created_at).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
    padding: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  row: {
    justifyContent: 'space-between',
  },
  captureCard: {
    width: '48%',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 4,
  },
  meta: {
    color: '#9CA3AF',
    fontSize: 11,
  },
});
