'use client';

interface Book {
  id: number;
  title: string;
  author: string;
  image?: string;
  summary?: string;
  orderStatus?: string;
}

interface BookListProps {
  books: Book[];
  onDelete: (id: number) => void;
  onEdit: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onDelete, onEdit }) => {
  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {books.map((book) => (
        <li
          key={book.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '10px',
            border: '1px solid #ccc',
            marginBottom: '10px',
            borderRadius: '5px',
          }}
        >
          {book.image && <img src={book.image} alt={`${book.title} cover`} style={{ width: '150px' }} />}
          <div>
            <strong>{book.title}</strong> by {book.author}
            <p>{book.summary}</p>
            <p>Status: {book.orderStatus}</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => onEdit(book)} style={{ backgroundColor: '#007BFF', color: 'white' }}>
              Edit
            </button>
            <button onClick={() => onDelete(book.id)} style={{ backgroundColor: '#DC3545', color: 'white' }}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BookList;
