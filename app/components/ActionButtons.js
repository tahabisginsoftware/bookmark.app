// src/components/ActionButtons.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ActionButtons = ({ onArchivePress, onAddPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={onArchivePress}
      >
        <Ionicons name="archive-outline" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.button, styles.addButton]} 
        onPress={onAddPress}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 34,
    right: 20,
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 54,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#4CAF50',
  },
});

export default ActionButtons;