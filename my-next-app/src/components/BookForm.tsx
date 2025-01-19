'use client';

import { useState, useEffect } from 'react';

interface Book {
  id?: number;
  title: string;
  author: string;
  image?: string;
  summary?: string;
  orderStatus?: string;
}

interface BookFormProps {
  onSubmit: (book: Book) => void;
  initialData?: Book;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [summary, setSummary] = useState('');
  const [orderStatus, setOrderStatus] = useState('For Sale');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAuthor(initialData.author);
      setSummary(initialData.summary || '');
      setOrderStatus(initialData.orderStatus || 'For Sale');
    }
  }, [initialData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert image to a base64 string for simplicity
    let imageBase64 = '';
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        imageBase64 = reader.result as string;
        onSubmit({ title, author, image: imageBase64, summary, orderStatus });
        resetForm();
      };
    } else {
      onSubmit({ title, author, summary, orderStatus });
      resetForm();
    }
  };

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setImage(null);
    setSummary('');
    setOrderStatus('For Sale');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Book Title"
        required
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        required
      />
      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Write your book story summary here..."
      />
      <select value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>
        <option value="For Sale">For Sale</option>
        <option value="Sold Out">Sold Out</option>
      </select>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button type="submit">{initialData ? 'Update Book' : 'Add Book'}</button>
    </form>
  );
};

export default BookForm;
