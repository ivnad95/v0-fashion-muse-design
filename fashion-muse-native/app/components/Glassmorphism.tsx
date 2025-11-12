
import React, { useState } from 'react';
import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import { Canvas, RoundedRect, BackdropFilter, Blur } from '@shopify/react-native-skia';
import { Colors } from '../constants';

interface GlassmorphismProps {
  children: React.ReactNode;
  style?: any;
  borderRadius?: number;
}

export const Glassmorphism: React.FC<GlassmorphismProps> = ({
  children,
  style,
  borderRadius = 20,
}) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  };

  return (
    <View style={style} onLayout={onLayout}>
      {size.width > 0 && size.height > 0 && (
        <Canvas style={StyleSheet.absoluteFill}>
          <RoundedRect x={0} y={0} width={size.width} height={size.height} r={borderRadius} color={Colors.glassBg} />
          <BackdropFilter
            filter={<Blur blur={20} />}
            clip={{ x: 0, y: 0, width: size.width, height: size.height, r: borderRadius }}
          >
          </BackdropFilter>
          <RoundedRect
            x={0}
            y={0}
            width={size.width}
            height={size.height}
            r={borderRadius}
            color={Colors.glassBorder}
            style="stroke"
            strokeWidth={1}
          />
        </Canvas>
      )}
      {children}
    </View>
  );
};
