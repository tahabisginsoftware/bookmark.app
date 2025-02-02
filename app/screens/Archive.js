// src/screens/ArchiveScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ArchivedBookList from '../components/ArchivedBookList';
import { useBooks } from '../hooks/BooksContext';

const Archive = () => {
  const { archivedBooks, unarchiveBook, deleteBook } = useBooks();

  return (
    <View style={styles.container}>
      <ArchivedBookList
        books={archivedBooks}
        onUnarchive={unarchiveBook}
        onDelete={deleteBook}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
});

export default Archive;