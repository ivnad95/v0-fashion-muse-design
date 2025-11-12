
import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { Glassmorphism } from './Glassmorphism';
import { Colors, Typography } from '../constants';

interface GlassButtonProps {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
}

export const GlassButton: React.FC<GlassButtonProps> = ({ onPress, title, style }) => {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Glassmorphism
          style={[
            styles.button,
            style,
            pressed ? styles.buttonPressed : styles.buttonIdle,
          ]}
          borderRadius={12}
        >
          <Text style={styles.text}>{title}</Text>
        </Glassmorphism>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.glassShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 5,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  buttonIdle: {
    transform: [{ translateY: 0 }],
  },
  buttonPressed: {
    transform: [{ translateY: 2 }],
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  text: {
    color: Colors.textPrimary,
    fontSize: Typography.base,
    fontWeight: '600',
  },
});
