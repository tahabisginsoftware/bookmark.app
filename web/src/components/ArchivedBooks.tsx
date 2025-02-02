import { useState } from 'react';
import { Book } from '../types';
import { Trash2, RefreshCw, AlertTriangle } from 'lucide-react';

interface ArchivedBooksProps {
  books: Book[];
  onRestore: (id: number) => void;
  onDelete: (id: number) => void;
}

interface DeleteModalProps {
  book: Book;
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteModal({ book, onConfirm, onCancel }: DeleteModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-zinc-800 rounded-lg p-6 w-full max-w-md animate-slideUp">
        <div className="flex items-center gap-3 text-amber-500 mb-4">
          <AlertTriangle className="w-6 h-6" />
          <h3 className="text-xl font-bold">Delete Book</h3>
        </div>
        <p className="text-zinc-300 mb-6">
          Are you sure you want to delete "{book.title}"? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-zinc-600 hover:bg-zinc-700 text-white py-2 rounded transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function ArchivedBooks({ books, onRestore, onDelete }: ArchivedBooksProps) {
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  if (books.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-400">
        <p>No archived books yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-zinc-300 mb-6">Archived Books</h2>
      <div className="grid gap-4">
        {books.map(book => (
          <div
            key={book.id}
            className="bg-zinc-800 rounded-lg p-4 flex items-center justify-between group"
          >
            <div>
              <h3 className="font-bold mb-1">{book.title}</h3>
              <p className="text-sm text-zinc-400">
                Progress: {Math.round((book.currentPage / book.totalPages) * 100)}%
                ({book.currentPage} of {book.totalPages} pages)
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => onRestore(book.id)}
                className="text-zinc-500 hover:text-emerald-500 transition-colors p-3"
                title="Restore book"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={() => setBookToDelete(book)}
                className="text-zinc-500 hover:text-red-500 transition-colors p-3"
                title="Delete book"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {bookToDelete && (
        <DeleteModal
          book={bookToDelete}
          onConfirm={() => {
            onDelete(bookToDelete.id);
            setBookToDelete(null);
          }}
          onCancel={() => setBookToDelete(null)}
        />
      )}
    </div>
  );
}

export default ArchivedBooks