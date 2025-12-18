import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const screenTitles: Record<string, string> = {
  '/ProductListScreen': 'Products',
  '/CapturesScreen': 'Captures',
  '/ImageTo3DScreen': 'Image to 3D',
  '/ProfileScreen': 'Profile',
  '/SettingsScreen': 'Settings',
};

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const title = screenTitles[pathname] ?? '';

  const [open, setOpen] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    Animated.timing(anim, {
      toValue: open ? 0 : 1,
      duration: 180,
      useNativeDriver: true,
    }).start();
    setOpen(!open);
  };

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 0],
  });

  const opacity = anim;

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.side} />
        <Text style={styles.title}>{title}</Text>

        <TouchableOpacity onPress={toggleMenu} style={styles.side}>
          <Ionicons name="menu" size={24} color="#E5E7EB" />
        </TouchableOpacity>
      </View>

      {open && (
        <Animated.View
          style={[
            styles.menu,
            { opacity, transform: [{ translateY }] },
          ]}
        >
          <MenuItem
            icon="person-outline"
            label="Profile"
            onPress={() => {
              toggleMenu();
              router.push('/ProfileScreen');
            }}
          />
          <MenuItem
            icon="settings-outline"
            label="Settings"
            onPress={() => {
              toggleMenu();
              router.push('/SettingsScreen');
            }}
          />
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

function MenuItem({
  icon,
  label,
  onPress,
}: {
  icon: any;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Ionicons name={icon} size={18} color="#E5E7EB" />
      <Text style={styles.menuText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#020617',
    zIndex: 20,
  },

  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
    paddingHorizontal: 16,
  },

  side: {
    width: 40,
    alignItems: 'flex-end',
  },

  title: {
    flex: 1,
    textAlign: 'center',
    color: '#E5E7EB',
    fontSize: 16,
    fontWeight: '600',
  },

  menu: {
    position: 'absolute',
    top: 56,
    right: 16,
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 10,
    width: 160,
    paddingVertical: 6,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },

  menuText: {
    color: '#E5E7EB',
    fontSize: 14,
    fontWeight: '500',
  },
});
