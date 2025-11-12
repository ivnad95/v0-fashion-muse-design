
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image } from 'react-native';
import { Colors, Typography } from './constants';
import { LinearGradient } from 'expo-linear-gradient';
import { getHistory, Generation } from './lib/history';
import { useIsFocused } from '@react-navigation/native';
import { Stack } from 'expo-router';

export default function HistoryScreen() {
  const [history, setHistory] = useState<Generation[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadHistory = async () => {
      const storedHistory = await getHistory();
      setHistory(storedHistory);
    };

    if (isFocused) {
      loadHistory();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: 'Generation History' }} />
      <LinearGradient
        colors={[Colors.primaryDark, Colors.primaryBlue]}
        style={StyleSheet.absoluteFill}
      />
      {history.length > 0 ? (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text style={styles.timestamp}>
                {new Date(item.timestamp).toLocaleString()}
              </Text>
              <FlatList
                data={item.generatedImages}
                horizontal
                keyExtractor={(img) => img.id}
                renderItem={({ item: img }) => (
                  <Image source={{ uri: img.uri }} style={styles.image} />
                )}
              />
            </View>
          )}
        />
      ) : (
        <View style={styles.content}>
          <Text style={styles.placeholderText}>No history yet.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: Colors.textSecondary,
    fontSize: Typography.base,
  },
  historyItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.glassBorder,
  },
  timestamp: {
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
  },
});
