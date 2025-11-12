
import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { Glassmorphism } from './Glassmorphism';
import { Colors, Typography } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';

interface GlassButtonProps {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export const GlassButton: React.FC<GlassButtonProps> = ({ onPress, title, style, children }) => {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          style={[
            styles.button,
            style,
            pressed ? styles.buttonPressed : styles.buttonIdle,
          ]}
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.03)']}
            style={StyleSheet.absoluteFill}
          />
          {children}
          <Text style={styles.text}>{title}</Text>
        </View>
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
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
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
    color: Colors.silverMid,
    fontSize: Typography.base,
    fontWeight: '600',
    textShadowColor: Colors.shadowColor,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
