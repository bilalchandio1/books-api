'use client';

import { useState } from 'react';

const Feedback: React.FC = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim() === '') {
      alert('Feedback cannot be empty!');
      return;
    }
    console.log('Feedback submitted:', feedback);
    setFeedback('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Leave your feedback or comments here..."
        style={{ width: '100%', height: '100px', marginBottom: '10px' }}
      />
      <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none' }}>
        Submit Feedback
      </button>
    </form>
  );
};

export default Feedback;
