import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Pressable, Image } from 'react-native';
import { Colors } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Sparkles } from 'lucide-react-native';
import { NumberChip } from '../components';

const IMAGE_COUNT_OPTIONS = [1, 2, 4, 6, 8];

export default function HomeScreen() {
  const router = useRouter();
  const [imageCount, setImageCount] = useState(4);

  const handleGenerate = () => {
    router.push('/tabs/results');
  };

  const handleUpload = () => {
    // Simulate image upload
    console.log('Upload button pressed');
  };

  return (
    <SafeAreaView style={styles.screenContent}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[Colors.primaryDark, Colors.primaryBlue]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.fixedHeader}>
        <Text style={styles.headerText}>Good morning, Creator</Text>
        <View style={styles.imageCountContainer}>
          {IMAGE_COUNT_OPTIONS.map((count) => (
            <NumberChip
              key={count}
              count={count}
              isSelected={imageCount === count}
              onPress={() => setImageCount(count)}
            />
          ))}
        </View>
      </View>
      <View style={styles.scrollableContent}>
        <View style={styles.uploadArea}>
          <Image source={{ uri: 'https://v0-fashion-app-clone.vercel.app/fashion-muse-logo.png' }} style={styles.logo} />
          <Pressable onPress={handleUpload}>
            <Text style={styles.uploadPrompt}>Tap to upload your photo</Text>
            <Text style={styles.uploadSubtext}>Start your fashion transformation</Text>
          </Pressable>
        </View>
        <Pressable style={styles.primaryButton} onPress={handleGenerate}>
          <Sparkles size={20} color="white" />
          <Text style={styles.primaryButtonText}>Generate Photoshoot</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    flex: 1,
    backgroundColor: Colors.primaryDark,
  },
  fixedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    color: Colors.textPrimary,
    fontSize: 18,
  },
  imageCountContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  numberChip: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeNumberChip: {
    backgroundColor: Colors.accentBlue,
  },
  buttonText: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  scrollableContent: {
    flex: 1,
    padding: 20,
  },
  uploadArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 256,
    height: 64,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  uploadPrompt: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    textAlign: 'center',
  },
  uploadSubtext: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
  primaryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.accentDarkBlue,
    borderRadius: 25,
    height: 50,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
