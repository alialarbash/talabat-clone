import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { Colors } from './Colors';

export type ScreenTitleProps = TextProps & { color?: string };

export default function ScreenTitle({ style, color = Colors.orange, ...rest }: ScreenTitleProps) {
  return <Text style={[styles.title, { color }, style]} {...rest} />;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
});


