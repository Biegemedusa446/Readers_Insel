import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Description.css';
import Header from './Header';

const Description = () => {
  const location = useLocation();
  const { book } = location.state || {};

  useEffect(() => {
  }, [book]);

  if (!book) return <div>No book selected</div>;

  return (
    <div className="Description_description-page">
      <Header />
      <main>
        <div className="Description_description-book-details">
          <img src={book.image_link} alt={book.name} className="Description_book-image" />
          <div className="Description_description-book-info">
            <h2>{book.name}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Published Year:</strong> {book.published_year}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Description:</strong> {book.description}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Description;
