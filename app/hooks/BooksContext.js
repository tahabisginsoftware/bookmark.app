// BooksContext.js (new file)
import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage'; // or wherever your storage lives

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  // Local states for books and archivedBooks
  const [books, setBooks] = useState([]);
  const [archivedBooks, setArchivedBooks] = useState([]);

  // Load from storage once on mount
  useEffect(() => {
    (async () => {
      const savedBooks = await storage.getBooks();
      const savedArchivedBooks = await storage.getArchivedBooks();
      setBooks(savedBooks || []);
      setArchivedBooks(savedArchivedBooks || []);
    })();
  }, []);

  const addBook = async (book) => {
    const updatedBooks = [...books, book];
    setBooks(updatedBooks);
    await storage.saveBooks(updatedBooks);
  };

  const updateBook = async (bookId, newData) => {
    const updatedBooks = books.map((b) => b.id === bookId ? newData : b);
    setBooks(updatedBooks);
    await storage.saveBooks(updatedBooks);
  };

  const archiveBook = async (bookId) => {
    const bookToArchive = books.find((b) => b.id === bookId);
    if (!bookToArchive) return;

    const updatedBooks = books.filter((b) => b.id !== bookId);
    const updatedArchived = [...archivedBooks, { ...bookToArchive, archived: true }];

    setBooks(updatedBooks);
    setArchivedBooks(updatedArchived);

    await Promise.all([
      storage.saveBooks(updatedBooks),
      storage.saveArchivedBooks(updatedArchived),
    ]);
  };

  const unarchiveBook = async (bookId) => {
    const bookToUnarchive = archivedBooks.find((book) => book.id === bookId);
    if (!bookToUnarchive) return;
  
    // Reset the book progress so it doesn't instantly re-archive
    const resetBook = {
      ...bookToUnarchive,
      currentPage: 0, // Reset progress
      archived: false, // Ensure it is unarchived
    };
  
    // Remove from archived list
    const updatedArchivedBooks = archivedBooks.filter((book) => book.id !== bookId);
    // Add to books list
    const updatedBooks = [resetBook, ...books]; // Prepend to appear at top
  
    setArchivedBooks(updatedArchivedBooks);
    setBooks(updatedBooks);
  
    await Promise.all([
      storage.saveArchivedBooks(updatedArchivedBooks),
      storage.saveBooks(updatedBooks),
    ]);
  };

  const deleteBook = async (bookId) => {
    const filtered = archivedBooks.filter((b) => b.id !== bookId);
    setArchivedBooks(filtered);
    await storage.saveArchivedBooks(filtered);
  };

  // Provide these methods + state to children
  const value = {
    books,
    archivedBooks,
    addBook,
    updateBook,
    archiveBook,
    unarchiveBook,
    deleteBook,
  };

  return (
    <BooksContext.Provider value={value}>
      {children}
    </BooksContext.Provider>
  );
};

// Custom hook for easy consumption
export const useBooks = () => useContext(BooksContext);