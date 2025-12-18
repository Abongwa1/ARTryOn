// app/BusinessIntegrationScreen.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function BusinessIntegrationScreen() {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [platform, setPlatform] = useState<'shopify' | 'woocommerce' | ''>('');

  const onDetectPlatform = () => {
    // Simple detection logic
    if (websiteUrl.includes('myshopify')) {
      setPlatform('shopify');
    } else if (websiteUrl.includes('woocommerce')) {
      setPlatform('woocommerce');
    } else {
      setPlatform('');
    }
  };

  const onConnect = () => {
    // TODO: implement Supabase Function / API to connect store and sync products
    alert(`Connecting to ${platform} store: ${websiteUrl}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Business Integration</Text>
      <Text style={styles.subtitle}>
        Connect your Shopify or WooCommerce store to sync products.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Store website URL"
        value={websiteUrl}
        onChangeText={setWebsiteUrl}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={onDetectPlatform}>
        <Text style={styles.buttonText}>Detect Platform</Text>
      </TouchableOpacity>

      <Text style={styles.platformText}>
        Detected platform:{' '}
        <Text style={styles.platformValue}>{platform || 'Unknown'}</Text>
      </Text>

      <TouchableOpacity
        style={[styles.connectButton, !platform && { opacity: 0.5 }]}
        disabled={!platform}
        onPress={onConnect}
      >
        <Text style={styles.connectText}>Connect Store</Text>
      </TouchableOpacity>
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
    marginBottom: 8,
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 13,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#111827',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#ffffff',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#111827',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#E5E7EB',
  },
  platformText: {
    marginTop: 16,
    color: '#9CA3AF',
  },
  platformValue: {
    color: '#E5E7EB',
    fontWeight: '600',
  },
  connectButton: {
    marginTop: 24,
    backgroundColor: '#10B981',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  connectText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
