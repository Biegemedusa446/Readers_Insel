import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, CircularProgress, Typography } from '@mui/material';
import './Add.css';
import { createProduct } from './apiService';
import Header from './Header';

const Add = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    genre: '',
    publishedYear: '',
    isbn: '',
    imageLink: '',
    price: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      const response = await createProduct(formData);
      if (response) {
        setSuccess('Book added successfully!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setError('Failed to add book');
      }
    } catch (error) {
      setError('An error occurred while adding the book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <Header />
    <Box className="Add_add-page">
      <Box className="Add_add-container">
        <Typography variant="h4" className="Add_add-header">Add Book</Typography>
        <form className="Add_add-form" onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="name"
            value={formData.name}
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
            name="publishedYear"
            value={formData.publishedYear}
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
          />
          <TextField
            label="Image URL"
            name="imageLink"
            value={formData.imageLink}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          {formData.image_link && (
            <Box className="Add_image-preview">
              <img src={formData.image_link} alt="Book" />
            </Box>
          )}
          <Box className="Add_add-buttons">
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

export default Add;
