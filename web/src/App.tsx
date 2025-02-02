import { useState, useEffect } from 'react';
import { Plus, X, BookOpen, Archive } from 'lucide-react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import ArchivedBooks from './components/ArchivedBooks';
import { Book } from './types';

// Local storage key
const STORAGE_KEY = 'book-progress-data';

function App() {
  const [books, setBooks] = useState<Book[]>(() => {
    // Load initial data from localStorage
    const savedBooks = localStorage.getItem(STORAGE_KEY);
    return savedBooks ? JSON.parse(savedBooks) : [];
  });
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  // Save to localStorage whenever books change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  const addBook = (book: Book) => {
    setBooks([...books, { ...book, id: Date.now(), archived: false }]);
    setIsFormOpen(false);
  };

  const updateProgress = (id: number, currentPage: number) => {
    setBooks(books.map(book => 
      book.id === id ? { ...book, currentPage } : book
    ));
  };

  const editBook = (id: number, updates: Partial<Book>) => {
    setBooks(books.map(book =>
      book.id === id ? { ...book, ...updates } : book
    ));
  };

  const toggleArchive = (id: number) => {
    setBooks(books.map(book =>
      book.id === id ? { ...book, archived: !book.archived } : book
    ));
  };

  const deleteBook = (id: number) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const activeBooks = books.filter(book => !book.archived);
  const archivedBooks = books.filter(book => book.archived);

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 font-mono">
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-12">
          <div className="flex items-center justify-between">
            <a href="/">
            <h1 className="text-3xl font-normal font-serif tracking-tighter flex items-center gap-3">
              <BookOpen className="w-8 h-8" />
              book.mark
            </h1>
              </a>
            <div className="flex gap-3">
                <button
                onClick={() => setShowArchive(!showArchive)}
                className={`${
                  showArchive ? 'bg-amber-500 hover:bg-amber-600' : 'bg-zinc-700 hover:bg-zinc-600'
                } text-white p-3 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 relative`}
                >
                <Archive className="w-6 h-6" />
                {archivedBooks.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {archivedBooks.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsFormOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        <main>
          {showArchive ? (
            <ArchivedBooks
              books={archivedBooks}
              onRestore={toggleArchive}
              onDelete={deleteBook}
            />
          ) : (
            <BookList
              books={activeBooks}
              onUpdateProgress={updateProgress}
              onArchive={toggleArchive}
              onEdit={editBook}
            />
          )}
        </main>

        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-zinc-800 rounded-lg p-6 w-full max-w-md relative animate-slideUp">
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <BookForm onSubmit={addBook} onClose={() => setIsFormOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;