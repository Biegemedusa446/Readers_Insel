import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { Box, Typography, Button, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SearchIcon from '@mui/icons-material/Search';
import './Header.css';
import { getBasketItems } from './apiService'; // Import the API function to get basket items

const Header = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate(); // useNavigate hook

  const onSearch = () => {
    if (!searchQuery.trim()) {
      setIsError(true);
      return;
    }
    setIsError(false);
    handleSearch(searchQuery);
  };

  const handleBasketClick = async () => {
    try {
      const basketItems = await getBasketItems();
      console.log('Basket items:', basketItems); // You can handle the basket items as needed
      navigate('/checkout', { state: { basketItems } }); // Pass basket items to the checkout page
    } catch (error) {
      console.error('Error fetching basket items:', error);
    }
  };

  return (
    <Box className="Header_header" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#a2957b', height: '4rem' }}>
      <Box className="Header_logo-container" onClick={() => navigate('/')} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <LibraryBooksIcon className="Header_logo-icon" sx={{ color: '#333', width: '40px', height: '40px', marginRight: '10px', transition: 'color 0.3s, transform 0.3s' }} />
        <Typography className="Header_logo-text" variant="h5" sx={{ fontSize: '24px', fontWeight: 'bold', color: '#333', transition: 'color 0.3s' }}>Reader’s Insel</Typography>
      </Box>
      <Box className="search-bar" sx={{ width: '300px', mx: 2 }}>
        <TextField 
          fullWidth 
          variant="outlined" 
          placeholder="Search by Title, Author, or ISBN" 
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (isError) setIsError(false);
          }}
          error={isError}
          helperText={isError ? "Search input is required" : ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={onSearch}>
                  <SearchIcon sx={{ color: '#666', transition: 'color 0.3s', '&:hover': { color: '#333' } }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            bgcolor: '#f8f0dc',  // A lighter shade of the header color
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#333',
                transition: 'border-color 0.3s',
              },
              '&:hover fieldset': {
                borderColor: '#555',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#333',
              },
            },
            '& .MuiInputBase-input': {
              color: '#333',
            },
          }} 
        />
      </Box>
      <Box className="nav">
        <Button onClick={() => navigate('/login')} sx={{ mx: 1, border: 2, borderColor: '#333', color: '#333', transition: 'background-color 0.3s, color 0.3s', '&:hover': { bgcolor: '#333', color: '#fff' } }}>Log in</Button>
        <Button onClick={() => navigate('/profile')} sx={{ mx: 1, border: 2, borderColor: '#333', color: '#333', transition: 'background-color 0.3s, color 0.3s', '&:hover': { bgcolor: '#333', color: '#fff' } }}>Profile</Button>
        <Button onClick={() => navigate('/contact')} sx={{ mx: 1, border: 2, borderColor: '#333', color: '#333', transition: 'background-color 0.3s, color 0.3s', '&:hover': { bgcolor: '#333', color: '#fff' } }}>Contact</Button>
        <IconButton onClick={handleBasketClick} sx={{ mx: 1 }}>
          <ShoppingCartIcon sx={{ color: '#333', transition: 'color 0.3s', '&:hover': { color: '#555' } }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
