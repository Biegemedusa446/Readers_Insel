import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, TextField, Button, CircularProgress, Typography } from '@mui/material';
import './Edit.css';
import { getAllProducts, updateProduct } from './apiService';
import Header from './Header';

const Edit = () => {
  const { isbn } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    published_year: '',
    isbn: '',
    image_link: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const products = await getAllProducts();
        const book = products.find(p => p.isbn === isbn);
        if (book) {
          setFormData(book);
        } else {
          setError('Book not found');
        }
      } catch (error) {
        setError('Error fetching book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [isbn]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await updateProduct(formData.isbn, formData);
      if (response) {
        setSuccess('Book updated successfully!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setError('Failed to update book');
      }
    } catch (error) {
      setError('An error occurred while updating the book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <Box className="Edit_edit-page">
        <Box className="Edit_edit-container">
          <Typography variant="h4" className="Edit_edit-header">Edit Book</Typography>
          <form className="Edit_edit-form" onSubmit={handleSubmit}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Published Year"
              name="published_year"
              value={formData.published_year}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="ISBN"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Image URL"
              name="image_link"
              value={formData.image_link}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            {formData.image_link && (
              <Box className="Edit_image-preview">
                <img src={formData.image_link} alt="Book" />
              </Box>
            )}
            <Box className="Edit_edit-buttons">
              <Button type="submit" variant="contained" color="primary" disabled={loading}>Save</Button>
              <Button type="button" variant="outlined" color="secondary" onClick={() => navigate('/')}>Cancel</Button>
            </Box>
            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">{success}</Typography>}
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default Edit;
