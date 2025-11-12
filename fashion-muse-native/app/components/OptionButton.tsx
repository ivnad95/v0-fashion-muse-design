
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '../constants';

interface OptionButtonProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}

export const OptionButton: React.FC<OptionButtonProps> = ({ title, isSelected, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, isSelected ? styles.selected : styles.idle]}
    >
      <Text style={[styles.text, isSelected ? styles.textSelected : styles.textIdle]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  selected: {
    backgroundColor: Colors.accentBlue,
  },
  idle: {
    backgroundColor: Colors.glassBg,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  text: {
    fontSize: Typography.sm,
  },
  textSelected: {
    color: Colors.textPrimary,
  },
  textIdle: {
    color: Colors.textSecondary,
  },
});
