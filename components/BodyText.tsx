import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { Colors } from './Colors';

export type BodyTextProps = TextProps & { color?: string };

export default function BodyText({ style, color = Colors.text, ...rest }: BodyTextProps) {
  return <Text style={[styles.text, { color }, style]} {...rest} />;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
});


