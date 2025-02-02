// src/components/BookProgressBar.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const BookProgressBar = ({ progress }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.progress, { width: `${progress}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 4,
    backgroundColor: '#404040',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
});

export default BookProgressBar;