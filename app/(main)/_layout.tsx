import BottomNav from '@/components/BottomNav';
import Header from '@/components/Header';
import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function MainLayout() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Slot />
      </View>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  content: {
    flex: 1,
  },
});
