import { supabase } from '@/types/supabase';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProductDetailScreen() {
  const router = useRouter();
  const { productId } = useGlobalSearchParams<{ productId: string }>();

  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProduct = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setProduct(data);
    setLoading(false);
  };

  useEffect(() => {
    if (productId) fetchProduct();
  }, [productId]);

  const onView3D = () => {
    router.push(`/ARTryOnScreen?productId=${product?.id}`);
  };

  const onTryInAR = () => {
    router.push(`/ARScene?productId=${product?.id}`);
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#fff' }}>Product not found.</Text>
      </View>
    );
  }

  // Use a placeholder if thumbnail_url is missing or empty
  const imageUri =
    product.thumbnail_url && product.thumbnail_url.length > 0
      ? product.thumbnail_url
      : 'https://via.placeholder.com/500x300.png?text=No+Image';

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: imageUri }}
        style={styles.heroImage}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.secondaryButton} onPress={onView3D}>
            <Text style={styles.secondaryText}>View 3D</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={onTryInAR}>
            <Text style={styles.primaryText}>Try in AR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
  },
  heroImage: {
    width: '100%',
    height: 260,
    backgroundColor: '#1f2937', // placeholder background
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  description: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#2563EB',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryText: {
    color: '#2563EB',
    fontWeight: '600',
  },
});
