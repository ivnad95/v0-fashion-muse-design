
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Pressable, FlatList } from 'react-native';
import { GlassButton, OptionButton } from '../components';
import { Colors, Typography } from './constants';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Camera } from 'lucide-react-native';

const GENERATION_OPTIONS = [
  { id: '1', title: 'Editorial' },
  { id: '2', title: 'Street Style' },
  { id: '3', title: 'Avant-Garde' },
  { id: '4', title: 'Minimalist' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState('1');

  const handleGenerate = () => {
    router.push('/tabs/results');
  };

  const handleUpload = () => {
    // Simulate image upload
    console.log('Upload button pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[Colors.primaryDark, Colors.primaryBlue]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.header}>
        <Text style={styles.title}>Fashion Muse Studio</Text>
        <Text style={styles.subtitle}>AI-Powered Fashion Photography</Text>
      </View>

      <View style={styles.mainContent}>
        <Pressable onPress={handleUpload} style={styles.uploadContainer}>
          <Camera size={48} color={Colors.textSecondary} />
          <Text style={styles.uploadText}>Tap to upload a photo</Text>
        </Pressable>

        <View style={styles.optionsContainer}>
          <Text style={styles.optionsText}>Style</Text>
          <FlatList
            data={GENERATION_OPTIONS}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <OptionButton
                title={item.title}
                isSelected={selectedOption === item.id}
                onPress={() => setSelectedOption(item.id)}
              />
            )}
          />
        </View>
      </View>

      <GlassButton onPress={handleGenerate} title="Generate" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: Typography['3xl'],
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: Typography.lg,
    color: Colors.textSecondary,
    marginTop: 8,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  uploadContainer: {
    width: '100%',
    height: 200,
    borderWidth: 2,
    borderColor: Colors.glassBorder,
    borderStyle: 'dashed',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  uploadText: {
    color: Colors.textSecondary,
    fontSize: Typography.base,
    marginTop: 8,
  },
  optionsContainer: {
    width: '100%',
    marginTop: 20,
  },
  optionsText: {
    color: Colors.textPrimary,
    fontSize: Typography.lg,
    marginBottom: 10,
  },
});
