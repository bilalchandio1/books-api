'use client';

import { useEffect, useState } from 'react';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
import Feedback from '../components/Feedback';
import styles from '../app/styles/Home.module.css';  // For a file in the root styles folder


interface Book {
  id: number;
  title: string;
  author: string;
  image?: string;
  summary?: string;
  orderStatus?: string;
}

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const res = await fetch('/api/books');
      if (!res.ok) throw new Error(`Failed to fetch books. Status code: ${res.status}`);
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Add a new book
  const addBook = async (book: Partial<Book>) => {
    try {
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });
      if (!res.ok) throw new Error('Failed to add book');
      await fetchBooks();
    } catch (error) {
      console.error(error);
    }
  };

  // Update a book
  const updateBook = async (book: Book) => {
    try {
      const res = await fetch('/api/books', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });
      if (!res.ok) throw new Error('Failed to update book');
      await fetchBooks();
      setEditingBook(null); // Reset editing state
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a book
  const deleteBook = async (id: number) => {
    try {
      const res = await fetch(`/api/books?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete book');
      await fetchBooks();
    } catch (error) {
      console.error(error);
    }
  };

  // Populate books on load
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Books Management</h1>

      {/* Form Section */}
      <section className={styles.section}>
        <h2>Add or Edit a Book</h2>
        <BookForm
          onSubmit={editingBook ? (book) => updateBook({ ...editingBook, ...book }) : addBook}
          initialData={editingBook || undefined}
        />
      </section>

      {/* Book List Section */}
      <section className={`${styles.section} ${styles.scrollAnimation}`}>
        <h2>Your Books</h2>
        <BookList books={books} onDelete={deleteBook} onEdit={setEditingBook} />
      </section>

      {/* Feedback Section */}
      <section className={`${styles.section} ${styles.scrollAnimation}`}>
        <h2>Feedback</h2>
        <Feedback />
      </section>
    </div>
  );
}
