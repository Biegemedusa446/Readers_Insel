import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import './Contact.css';
import Header from './Header';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    terms: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://formspree.io/f/xpwawldz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          message: formData.message,
        })
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: '',
          terms: false,
        });
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <Box className="Contact_contact-page" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>    
      <Header />
      <Box component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
        <Typography variant="h2" gutterBottom>Contact us</Typography>
        {submitted ? (
          <Typography variant="h5" sx={{ marginTop: 2, color: 'green' }}>
            Your request has been sent. We will contact you shortly.
          </Typography>
        ) : (
          <Box component="form" className="Contact_contact-form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
            <TextField
              label="First name"
              name="firstName"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={formData.firstName}
              onChange={handleChange}
              sx={{ backgroundColor: 'white' }}
            />
            <TextField
              label="Last name"
              name="lastName"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={formData.lastName}
              onChange={handleChange}
              sx={{ backgroundColor: 'white' }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={formData.email}
              onChange={handleChange}
              sx={{ backgroundColor: 'white' }}
            />
            <TextField
              label="Your message"
              name="message"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              sx={{ backgroundColor: 'white' }}
            />
            <FormControlLabel
              control={<Checkbox
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
              />}
              label="By clicking here, I state that I have read and understood the terms and conditions."
            />
            <Box className="Contact_form-buttons" sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
              <Button type="submit" variant="contained" color="primary">Send</Button>
              <Button type="reset" variant="outlined" color="secondary" onClick={() => setFormData({
                firstName: '',
                lastName: '',
                email: '',
                message: '',
                terms: false,
              })}>Clear form</Button>
            </Box>
          </Box>
        )}
        <Button className="Contact_back-button" onClick={() => navigate(-1)} variant="outlined" color="primary" sx={{ marginTop: 2 }}>Back</Button>
      </Box>
    </Box>
  );
};

export default Contact;
