import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Description from './Components/Description';
import Contact from './Components/Contact';
import Checkout from './Components/Checkout';
import ShippingAddress from './Components/ShippingAddress';
import ConfirmOrder from './Components/ConfirmOrder';
import OrderConfirmation from './Components/OrderConfirmation';
import Add from './Components/Add'
import Edit from './Components/Edit';
import './App.css';
import Footer from './Components/Footer';

const App = () => {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/description/:id" element={<Description />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/shippingaddress" element={<ShippingAddress />} />
        <Route path="/confirmorder" element={<ConfirmOrder />} />
        <Route path="/orderconfirmation" element={<OrderConfirmation />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
