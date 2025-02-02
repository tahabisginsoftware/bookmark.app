// Update HomeScreen.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BookList from '../components/BookList';
import ActionButtons from '../components/ActionButtons';
import AddBookModal from '../components/AddBookModal';
import EditBookModal from '../components/EditBookModal';
import { useBooks } from '../hooks/BooksContext';

const HomeScreen = ({ navigation }) => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  
  const { 
    books, 
    addBook, 
    updateBook, 
    archiveBook 
  } = useBooks();

  const handleProgressChange = (bookId, newPage) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      updateBook(bookId, { ...book, currentPage: newPage });
    }
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setEditModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <BookList 
        books={books} 
        onProgressChange={handleProgressChange}
        onEditBook={handleEditBook}
        onArchive={archiveBook}
      />
      <ActionButtons
        onArchivePress={() => navigation.navigate('Archive')}
        onAddPress={() => setAddModalVisible(true)}
      />
      <AddBookModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onAdd={addBook}
      />
      <EditBookModal
        visible={editModalVisible}
        book={selectedBook}
        onClose={() => {
          setEditModalVisible(false);
          setSelectedBook(null);
        }}
        onUpdate={updateBook}
        onArchive={archiveBook}
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

export default HomeScreen;