// src/components/ProductCard.tsx
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export type Product = {
  id: string;
  name: string;
  description: string;
  thumbnail_url: string; // full public URL
};

type Props = {
  product: Product;
  onPress: () => void;
};

const ProductCard: React.FC<Props> = ({ product, onPress }) => {
  // fallback if URL is empty
  const imageUri =
    product.thumbnail_url && product.thumbnail_url.length > 0
      ? product.thumbnail_url
      : 'https://via.placeholder.com/150'; // placeholder

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: imageUri }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.name}>
          {product.name}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {product.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    color: '#9CA3AF',
    fontSize: 12,
  },
});
