import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BottomNav() {
  const router = useRouter();
  const path = usePathname();

  const Tab = ({ icon, route }: any) => (
    <TouchableOpacity onPress={() => router.push(route)}>
      <Ionicons
        name={icon}
        size={22}
        color={path === route ? '#60A5FA' : '#64748B'}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <View style={styles.container}>
        <Tab icon="cube-outline" route="/ProductListScreen" />
        <Tab icon="camera-outline" route="/CapturesScreen" />
        <Tab icon="scan-outline" route="/ImageTo3DScreen" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#020617',
  },

  container: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1f2937',
    backgroundColor: '#020617',
  },
});
