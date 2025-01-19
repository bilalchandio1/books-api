

const fetchBooks = async () => {
  try {
    const res = await fetch('/api/books'); // Fetch from the correct API endpoint
    if (!res.ok) {
      throw new Error(`Failed to fetch books. Status code: ${res.status}`);
    }
    const data = await res.json();
    setBooks(data);
  } catch (error: any) {
    setError(error.message);
    console.error('Error fetching books:', error);
  }
};
