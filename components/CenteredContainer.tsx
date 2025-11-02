import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { Colors } from './Colors';

export type CenteredContainerProps = ViewProps & { backgroundColor?: string };

export default function CenteredContainer({ style, backgroundColor, ...rest }: CenteredContainerProps) {
  return <View style={[styles.container, { backgroundColor: backgroundColor ?? Colors.background }, style]} {...rest} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
});


