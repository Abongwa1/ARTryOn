import { supabase } from '@/types/supabase';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type UserProfile = {
  name: string | null;
  email: string;
  type: 'End User' | 'Business';
};

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      alert('Failed to fetch user');
      setLoading(false);
      return;
    }

    setUser({
      name: user.user_metadata?.full_name || 'No Name',
      email: user.email!,
      type: user.user_metadata?.account_type || 'End User',
    });
    setLoading(false);
  };

  const onLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/LoginScreen');
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={{ color: '#fff' }}>No user data found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* MAIN CONTENT */}
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{user.name}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>

          <Text style={styles.label}>Account Type</Text>
          <Text style={styles.value}>{user.type}</Text>
        </View>

        <TouchableOpacity
          style={styles.businessButton}
          onPress={() => router.push('/BusinessIntegrationScreen')}
        >
          <Text style={styles.businessText}>Business Integration</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
  },

  content: {
    flex: 1,
    padding: 16,
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },

  card: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },

  label: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 8,
  },

  value: {
    color: '#E5E7EB',
    fontSize: 14,
  },

  businessButton: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },

  businessText: {
    color: '#ffffff',
    fontWeight: '600',
  },

  logoutButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F87171',
    paddingVertical: 12,
    alignItems: 'center',
  },

  logoutText: {
    color: '#FCA5A5',
    fontWeight: '600',
  },
});
