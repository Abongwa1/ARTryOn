import { supabase } from '@/types/supabase';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ProductCard, { Product } from '../../components/ProductCard';

export default function ProductListScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('products')
      .select('id, name, description, thumbnail_url'); // select URL field

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    // optional: filter out products without URLs
    const validProducts = (data || []).filter(
      (p) => p.thumbnail_url && p.thumbnail_url.length > 0
    );

    setProducts(validProducts);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Browse Products</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              router.push(`/ProductDetailScreen?productId=${item.id}`)
            }
          />
        )}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.emptyText}>No products found.</Text>
          ) : null
        }
        contentContainerStyle={styles.listContent}
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
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyText: {
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 40,
  },
});
