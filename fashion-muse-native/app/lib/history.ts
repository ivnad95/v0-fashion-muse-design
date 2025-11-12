
import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = 'generation_history';

export interface Generation {
  id: string;
  originalImage: string; // For now, we'll just store a placeholder
  generatedImages: { id: string; uri: string }[];
  timestamp: number;
}

export const getHistory = async (): Promise<Generation[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(HISTORY_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to fetch history.', e);
    return [];
  }
};

export const saveGeneration = async (generation: Generation) => {
  try {
    const existingHistory = await getHistory();
    const newHistory = [generation, ...existingHistory];
    const jsonValue = JSON.stringify(newHistory);
    await AsyncStorage.setItem(HISTORY_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save generation.', e);
  }
};
