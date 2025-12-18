import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ARScene() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AR Scene Placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});
