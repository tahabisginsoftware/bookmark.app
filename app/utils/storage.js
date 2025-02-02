// src/utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKS_KEY = '@book_mark_books';
const ARCHIVED_BOOKS_KEY = '@book_mark_archived_books';

export const storage = {
  async saveBooks(books) {
    try {
      await AsyncStorage.setItem(BOOKS_KEY, JSON.stringify(books));
    } catch (error) {
      console.error('Error saving books:', error);
    }
  },

  async getBooks() {
    try {
      const books = await AsyncStorage.getItem(BOOKS_KEY);
      return books ? JSON.parse(books) : [];
    } catch (error) {
      console.error('Error loading books:', error);
      return [];
    }
  },

  async saveArchivedBooks(books) {
    try {
      await AsyncStorage.setItem(ARCHIVED_BOOKS_KEY, JSON.stringify(books));
    } catch (error) {
      console.error('Error saving archived books:', error);
    }
  },

  async getArchivedBooks() {
    try {
      const books = await AsyncStorage.getItem(ARCHIVED_BOOKS_KEY);
      return books ? JSON.parse(books) : [];
    } catch (error) {
      console.error('Error loading archived books:', error);
      return [];
    }
  },
};