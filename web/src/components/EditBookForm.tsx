import React, { useState } from 'react';
import { Book } from '../types';
import { X } from 'lucide-react';

interface EditBookFormProps {
  book: Book;
  onSubmit: (updates: Partial<Book>) => void;
  onClose: () => void;
}

function EditBookForm({ book, onSubmit, onClose }: EditBookFormProps) {
  const [formData, setFormData] = useState({
    title: book.title,
    totalPages: book.totalPages.toString(),
    currentPage: book.currentPage.toString(),
    deadline: book.deadline || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: formData.title,
      totalPages: parseInt(formData.totalPages),
      currentPage: parseInt(formData.currentPage),
      deadline: formData.deadline || undefined
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 animate-fadeIn z-50">
      <div className="bg-zinc-800 rounded-lg p-6 w-full max-w-md relative animate-slideUp">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold mb-6">Edit Book</h2>
          
          <div>
            <label className="block text-sm mb-2">Book Title</label>
            <input
              type="text"
              name="title"
              required
              className="w-full bg-zinc-700 rounded px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Total Pages</label>
            <input
              type="number"
              name="totalPages"
              required
              min="1"
              className="w-full bg-zinc-700 rounded px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              value={formData.totalPages}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Current Page</label>
            <input
              type="number"
              name="currentPage"
              required
              min="0"
              max={parseInt(formData.totalPages)}
              className="w-full bg-zinc-700 rounded px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              value={formData.currentPage}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Target Completion Date</label>
            <input
              type="date"
              name="deadline"
              className="w-full bg-zinc-700 rounded px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              value={formData.deadline}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-zinc-600 hover:bg-zinc-700 text-white py-2 rounded transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBookForm;