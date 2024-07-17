// Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import './Home.css';
import { getAllProducts, deleteProduct, addToBasket, getBasketItems } from './apiService';

const Home = () => {
  const { keycloak, initialized } = useKeycloak();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllProducts();
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleAddToCart = async (book) => {
    try {
      const orderLineItemsDto = {
        isbn: book.isbn,
        price: book.price,
        quantity: 1, // Assuming quantity is 1 for simplicity
      };
      await addToBasket(orderLineItemsDto);
      console.log(`Added ${book.name} to cart`);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handleEdit = (book) => {
    navigate(`/edit/${book.isbn}`);
  };

  const handleDelete = async (bookIsbn) => {
    try {
      await deleteProduct(bookIsbn);
      setBooks(books.filter(book => book.isbn !== bookIsbn));
      setFilteredBooks(filteredBooks.filter(book => book.isbn !== bookIsbn));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleDescription = (book) => {
    navigate(`/description/${book.id}`, { state: { book } });
  };

  return (
    <Box className="Home_app">
      <Box className="Home_header" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#a2957b', height: '4rem' ,  boxShadow :'0px 5px 10px rgb(169 155 112)' }}>
        <Box className="Home_logo-container" onClick={() => navigate('/')} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <LibraryBooksIcon className="Home_logo-icon" sx={{ color: '#333', width: '40px', height: '40px', marginRight: '10px', transition: 'color 0.3s, transform 0.3s' }} />
          <Typography className="Home_logo-text" variant="h5" sx={{ fontSize: '24px', fontWeight: 'bold', color: '#333', transition: 'color 0.3s' }}>Reader’s Insel</Typography>
        </Box>
        <Box className="Home_search-bar-wrapper">
          <Box className="Home_search-bar">
            <TextField
              fullWidth
              variant="outlined"
              placeholder={isError ? "Search input is required" : "Search..."}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (isError) setIsError(false);
              }}
              error={isError}
              className="Home_search-field"
            />
            <IconButton className="Home_round-button" onClick={onSearch} sx={{ background: 'white', height: '50px', marginLeft: '10px' }} >
              <SearchIcon className="Home_search-icon"/>
            </IconButton>
          </Box>
        </Box>
        <Box className="Home_nav" sx={{ display: 'flex', alignItems: 'center' }}>
          {!keycloak.authenticated ? (
            <Button onClick={() => keycloak.login()} className="Home_nav-button" sx={{ margin: '0 10px', background: 'none', border: '2px solid #333', color: '#333', fontSize: '16px', padding: '5px 15px', cursor: 'pointer', borderRadius: '5px', transition: 'background-color 0.3s, color 0.3s, border-color 0.3s' }}>Log in</Button>
          ) : (
            <>
              <Button onClick={() => keycloak.logout()} className="Home_nav-button" sx={{ margin: '0 10px', background: 'none', border: '2px solid #333', color: '#333', fontSize: '16px', padding: '5px 15px', cursor: 'pointer', borderRadius: '5px', transition: 'background-color 0.3s, color 0.3s, border-color 0.3s' }}>Logout</Button>
            </>
          )}
          <Button onClick={() => navigate('/contact')} className="Home_nav-button" sx={{ margin: '0 10px', background: 'none', border: '2px solid #333', color: '#333', fontSize: '16px', padding: '5px 15px', cursor: 'pointer', borderRadius: '5px', transition: 'background-color 0.3s, color 0.3s, border-color 0.3s' }}>Contact</Button>
          <IconButton onClick={handleBasketClick}>
            <ShoppingCartIcon className="Home_nav-icon" sx={{ color: '#333', transition: 'color 0.3s' }} />
          </IconButton>
        </Box>
      </Box>
      <Box component="main" className="Home_main">
        <Box className="Home_book-list">
          {filteredBooks.map(book => (
            <Card key={book.id} className="Home_book-card" sx={{boxShadow :'0px 2px 10px rgb(169 155 112)'}} >
              <CardMedia
                component="img"
                height="180"
                image={book.imageLink} // Assuming imageLink is the field for the image URL
                alt={book.name} // Assuming name is the field for the book title
                sx={{ objectFit: 'cover' }}
              />
              <CardContent className="Home_book-content">
                <Typography variant="h6">{book.name}</Typography>
                <Typography variant="body2">Author: {book.author}</Typography>
                <Typography variant="body2">Genre: {book.genre}</Typography>
                <Typography variant="body2">Published Year: {book.publishedYear}</Typography>
              </CardContent>
              <Box className="Home_overlay">
                <Button variant="contained" color="primary" onClick={() => handleDescription(book)}>Read Description</Button>
                <Button variant="contained" color="secondary" onClick={() => handleAddToCart(book)}>Add to Cart</Button>
              </Box>
              {isAdmin && (
                <Box className="Home_admin-actions">
                  <Button variant="outlined" color="primary" onClick={() => handleEdit(book)}>Edit</Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(book.isbn)}>Delete</Button>
                </Box>
              )}
            </Card>
          ))}
          {isAdmin && (
            <Card className="Home_book-card Home_add-book" onClick={handleAddBook}>
              <AddIcon className="Home_add-icon" />
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
