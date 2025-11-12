import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants';

interface NumberChipProps {
  count: number;
  isSelected: boolean;
  onPress: () => void;
}

export const NumberChip: React.FC<NumberChipProps> = ({ count, isSelected, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, isSelected && styles.activeChip]}
    >
      <Text style={[styles.text, isSelected && styles.activeText]}>{count}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeChip: {
    backgroundColor: Colors.accentBlue,
  },
  text: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  activeText: {
    color: Colors.textPrimary,
  },
});
