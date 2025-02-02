// src/components/BookList.js
import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Animated } from 'react-native';

const BookItem = ({ book, onProgressChange, onPress, onEditBook, onArchive }) => {
  const [animation] = useState(new Animated.Value(1));

  useEffect(() => {
    if (parseInt(book.currentPage) >= parseInt(book.totalPages)) {
      // Start fade out animation
      Animated.parallel([
        Animated.timing(animation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        })
      ]).start(() => {
        onArchive(book.id);
      });
    }
  }, [book.currentPage]);
  
  return (
    <Animated.View
    style={{
      opacity: animation,
      transform: [{
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [-100, 0]
        })
      }]}}
  >
    <TouchableOpacity 
      style={styles.bookItem}
      onPress={() => onPress(book)}
      activeOpacity={0.9}
    >
      <Text style={styles.bookTitle}>{book.title}</Text>
      <Text style={styles.pageCount}>
        {book.currentPage} of {book.totalPages} pages
      </Text>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={book.totalPages}
          value={book.currentPage}
          onValueChange={(value) => onProgressChange(book.id, Math.round(value))}
          minimumTrackTintColor="#4CAF50"
          maximumTrackTintColor="#404040"
          thumbTintColor="#fff"
        />
      </View>
      {book.targetDate && (
        <Text style={styles.targetDate}>Target: {book.targetDate}</Text>
      )}
    </TouchableOpacity>
    </Animated.View>
  );
};

const BookList = ({ books, onProgressChange, onEditBook, onArchive }) => {
  return (
    <FlatList
      data={books}
      renderItem={({ item }) => (
        <BookItem 
          book={item} 
          onProgressChange={onProgressChange}
          onPress={onEditBook}
          onArchive={onArchive}
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
  bookItem: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  bookTitle: {
    fontFamily: 'FrankRuhlLibre',
    fontSize: 20,
    color: 'white',
    marginBottom: 4,
  },
  pageCount: {
    fontFamily: 'DMMono',
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  sliderContainer: {
    marginVertical: 8,
  },
  slider: {
    width: '100%',
  },
  targetDate: {
    fontFamily: 'DMMono',
    fontSize: 14,
    color: '#ccc',
    marginTop: 4,
  },
});

export default BookList;