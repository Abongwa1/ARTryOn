import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();

  const handleLogout = () => {
    // Replace with real auth sign-out logic (Supabase/Firebase/etc.)
    Alert.alert(
      'Log out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log out',
          style: 'destructive',
          onPress: () => {
            router.replace('./(auth)/loginScreen');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>General</Text>

      <SettingItem
        icon="person-outline"
        label="Account"
        onPress={() => router.push('./ProfileScreen')}
      />

      <SettingItem
        icon="notifications-outline"
        label="Notifications"
        onPress={() => {}}
      />

      <SettingItem
        icon="lock-closed-outline"
        label="Privacy & Security"
        onPress={() => {}}
      />

      <Text style={styles.sectionTitle}>App</Text>

      <SettingItem
        icon="color-palette-outline"
        label="Appearance"
        onPress={() => {}}
      />

      <SettingItem
        icon="information-circle-outline"
        label="About"
        onPress={() => {}}
      />

      <View style={styles.divider} />

      <SettingItem
        icon="log-out-outline"
        label="Log out"
        danger
        onPress={handleLogout}
      />
    </View>
  );
}

function SettingItem({
  icon,
  label,
  onPress,
  danger = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  danger?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Ionicons
        name={icon}
        size={20}
        color={danger ? '#EF4444' : '#E5E7EB'}
      />
      <Text
        style={[
          styles.itemText,
          danger && { color: '#EF4444' },
        ]}
      >
        {label}
      </Text>
      <Ionicons
        name="chevron-forward"
        size={18}
        color="#6B7280"
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 16,
  },

  sectionTitle: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 8,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: '#020617',
    borderRadius: 10,
  },

  itemText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: '#E5E7EB',
    fontWeight: '500',
  },

  chevron: {
    marginLeft: 8,
  },

  divider: {
    height: 1,
    backgroundColor: '#1f2937',
    marginVertical: 20,
  },
});
