// src/components/ArchivedBookList.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ArchivedBookItem = ({ book, onUnarchive, onDelete }) => {
  const progress = (book.currentPage / book.totalPages) * 100;

  const handleDelete = () => {
    Alert.alert(
      "Delete Book",
      "Are you sure you want to delete this book? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => onDelete(book.id),
          style: "destructive"
        }
      ]
    );
  };

  const handleUnarchive = () => {
    Alert.alert(
      "Unarchive Book",
      "Are you sure you want to unarchive this book? Progress will be reset.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Unarchive", 
          onPress: () => onUnarchive(book.id)
        }
      ]
    );
  };
  
  return (
    <View style={styles.archivedItem}>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.archivedTitle}>{book.title}</Text>
      <Text style={styles.progressText}>
        Progress: {progress.toFixed(0)}% ({book.currentPage} of {book.totalPages} pages)
      </Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={handleUnarchive} style={styles.actionButton}>
          <Ionicons name="arrow-up-circle-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ArchivedBookList = ({ books, onUnarchive, onDelete }) => {
  return (
    <FlatList
      data={books}
      renderItem={({ item }) => (
        <ArchivedBookItem 
          book={item} 
          onUnarchive={onUnarchive}
          onDelete={onDelete}
        />
      )}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  archivedItem: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#404040',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  archivedTitle: {
    fontFamily: 'DMMono',
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  progressText: {
    fontFamily: 'DMMono',
    fontSize: 14,
    color: '#999',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 16,
  },
  actionButton: {
    padding: 4,
  },
});

export default ArchivedBookList;