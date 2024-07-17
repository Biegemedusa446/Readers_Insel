import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { Box, Typography, Button, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import './Header.css';
import { getBasketItems } from './apiService'; 

const Header = () => {
  const { keycloak, initialized } = useKeycloak();
  const navigate = useNavigate();

  const handleBasketClick = async () => {
    try {
      const basketItems = await getBasketItems();
      console.log('Basket items:', basketItems); 
      navigate('/checkout', { state: { basketItems } });
    } catch (error) {
      console.error('Error fetching basket items:', error);
    }
  };

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="Header_header" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#a2957b', height: '4rem' }}>
      <Box className="Header_logo-container" onClick={() => navigate('/')} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <LibraryBooksIcon className="Header_logo-icon" sx={{ color: '#333', width: '40px', height: '40px', marginRight: '10px', transition: 'color 0.3s, transform 0.3s' }} />
        <Typography className="Header_logo-text" variant="h5" sx={{ fontSize: '24px', fontWeight: 'bold', color: '#333', transition: 'color 0.3s' }}>Reader’s Insel</Typography>
      </Box>
      <Box className="Header_nav" sx={{ display: 'flex', alignItems: 'center' }}>
        {!keycloak.authenticated ? (
          <Button onClick={() => keycloak.login()} className="Header_nav-button" sx={{ margin: '0 10px', background: 'none', border: '2px solid #333', color: '#333', fontSize: '16px', padding: '5px 15px', cursor: 'pointer', borderRadius: '5px', transition: 'background-color 0.3s, color 0.3s, border-color 0.3s' }}>Log in</Button>
        ) : (
          <Button onClick={() => keycloak.logout()} className="Header_nav-button" sx={{ margin: '0 10px', background: 'none', border: '2px solid #333', color: '#333', fontSize: '16px', padding: '5px 15px', cursor: 'pointer', borderRadius: '5px', transition: 'background-color 0.3s, color 0.3s, border-color 0.3s' }}>Logout</Button>
        )}
        <Button onClick={() => navigate('/profile')} className="Header_nav-button" sx={{ margin: '0 10px', background: 'none', border: '2px solid #333', color: '#333', fontSize: '16px', padding: '5px 15px', cursor: 'pointer', borderRadius: '5px', transition: 'background-color 0.3s, color 0.3s, border-color 0.3s' }}>Profile</Button>
        <Button onClick={() => navigate('/contact')} className="Header_nav-button" sx={{ margin: '0 10px', background: 'none', border: '2px solid #333', color: '#333', fontSize: '16px', padding: '5px 15px', cursor: 'pointer', borderRadius: '5px', transition: 'background-color 0.3s, color 0.3s, border-color 0.3s' }}>Contact</Button>
        <IconButton onClick={handleBasketClick}>
          <ShoppingCartIcon className="Header_nav-icon" sx={{ color: '#333', transition: 'color 0.3s' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
