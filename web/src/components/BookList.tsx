import { useState } from 'react';
import { Book } from '../types';
import { Archive, Edit2 } from 'lucide-react';
import EditBookForm from './EditBookForm';

interface BookListProps {
  books: Book[];
  onUpdateProgress: (id: number, currentPage: number) => void;
  onArchive: (id: number) => void;
  onEdit: (id: number, updates: Partial<Book>) => void;
}

function BookList({ books, onUpdateProgress, onArchive, onEdit }: BookListProps) {
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const handleProgressUpdate = (book: Book, newPage: number) => {
    onUpdateProgress(book.id, newPage);
    
    // Auto-archive when book is completed
    if (newPage === book.totalPages) {
      setTimeout(() => {
        onArchive(book.id);
      }, 1000); // Delay to show the completion animation
    }
  };

  if (books.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-400">
        <p>No books added yet. Click the + button to add your first book!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {books.map(book => (
        <div
          key={book.id}
          className="bg-zinc-800 rounded-lg p-6 transition-all duration-300 hover:bg-zinc-750 group"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-serif font-normal mb-1">{book.title}</h3>
              <p className="text-sm text-zinc-400">
                {book.currentPage} of {book.totalPages} pages
              </p>
            </div>
            <div className="flex items-start gap-4">
              {book.deadline && (
                <div className="text-right">
                  <p className="text-sm text-zinc-400">Target Date</p>
                  <p className="text-sm">{new Date(book.deadline).toLocaleDateString()}</p>
                </div>
              )}
              <button
                onClick={() => setEditingBook(book)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
                title="Edit book"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => onArchive(book.id)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
                title="Archive book"
              >
                <Archive className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative pt-3 pb-3">
            <input
              type="range"
              min="0"
              max={book.totalPages}
              value={book.currentPage}
              onChange={(e) => handleProgressUpdate(book, parseInt(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            <div className="h-2 bg-zinc-700 rounded-full">
              <div
                className={`h-full bg-emerald-500 transition-all duration-500 ease-out relative
                  ${book.currentPage === book.totalPages ? 'animate-pulse' : ''}`}
                style={{ width: `${(book.currentPage / book.totalPages) * 100}%` }}
              />
            </div>
            <div
              className="absolute w-6 h-6 bg-white rounded-full shadow-lg cursor-pointer transform -translate-y-1/2 top-1/2 transition-transform hover:scale-110"
              style={{ left: `calc(${(book.currentPage / book.totalPages) * 100}% - 12px)` }}
            />
          </div>
        </div>
      ))}

      {editingBook && (
        <EditBookForm
          book={editingBook}
          onSubmit={(updates) => {
            onEdit(editingBook.id, updates);
            setEditingBook(null);
          }}
          onClose={() => setEditingBook(null)}
        />
      )}
    </div>
  );
}

export default BookList;