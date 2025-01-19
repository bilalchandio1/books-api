'use client';

import { useEffect, useState } from 'react';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';

export default function Home() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await fetch('/api/books');
    const data = await response.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = (newBook) => setBooks([...books, newBook]);
  const deleteBook = (id) => setBooks(books.filter((book) => book.id !== id));
  const editBook = (id, updatedBook) => {
    const updatedBooks = books.map((book) => (book.id === id ? updatedBook : book));
    setBooks(updatedBooks);
  };

  return (
    <div>
      <h1>Books API with Next.js</h1>
      <BookForm onAddBook={addBook} />
      <BookList books={books} onDeleteBook={deleteBook} onEditBook={editBook} />
    </div>
  );
}
