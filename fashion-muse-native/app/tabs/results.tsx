import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, ActivityIndicator } from 'react-native';
import { Colors, Typography } from './constants';
import { LinearGradient } from 'expo-linear-gradient';
import { saveGeneration, Generation } from './lib/history';

// Mock data for generated images
const MOCK_IMAGES = [
  { id: '1', uri: 'https://picsum.photos/seed/1/400/600' },
  { id: '2', uri: 'https://picsum.photos/seed/2/400/600' },
  { id: '3', uri: 'https://picsum.photos/seed/3/400/600' },
  { id: '4', uri: 'https://picsum.photos/seed/4/400/600' },
];

export default function ResultsScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      const newGeneration: Generation = {
        id: new Date().toISOString(),
        originalImage: 'placeholder',
        generatedImages: MOCK_IMAGES,
        timestamp: Date.now(),
      };
      saveGeneration(newGeneration);
    }, 3000); // Simulate a 3-second loading time

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <LinearGradient
          colors={[Colors.primaryDark, Colors.primaryBlue]}
          style={StyleSheet.absoluteFill}
        />
        <ActivityIndicator size="large" color={Colors.textPrimary} />
        <Text style={styles.loadingText}>Generating...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.primaryDark, Colors.primaryBlue]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.header}>
        <Text style={styles.title}>Generated Images</Text>
      </View>
      <FlatList
        data={MOCK_IMAGES}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.uri }} style={styles.image} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: Typography['2xl'],
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  list: {
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    margin: 4,
    aspectRatio: 2 / 3,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: Colors.textPrimary,
    fontSize: Typography.lg,
  },
});
