import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './OrderConfirmation.css';
import theKiteRunner from '../assets/TKR.jpg';
import toxic from '../assets/Toxic.jpg';
import Header from './Header';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderNumber = "#63718";
  const books = [
    {
      title: "The Kite Runner",
      author: "Khaled Hosseini",
      price: "21,18€",
      quantity: 1,
      imgSrc: theKiteRunner,
    },
    {
      title: "Toxic",
      author: "Nicole Blanchard",
      price: "19,28€",
      quantity: 1,
      imgSrc: toxic,
    },
  ];

  const shippingAddress = location.state?.formData || {
    name: "Unknown",
    phone: "Unknown",
    email: "Unknown",
    street: "Unknown",
    city: "Unknown",
    zip: "Unknown",
    shippingCountry: "Unknown",
    shippingFirstName: "Unknown",
    shippingLastName: "Unknown",
    shippingStreet: "Unknown",
    shippingCity: "Unknown",
    shippingPlz: "Unknown",
    method: "Standard"
  };

  console.log('Shipping Address:', shippingAddress); // Debugging log

  const handleGoBack = () => {
    navigate(-1); 
  };

  const handleContact = (event) => {
    event.preventDefault();
    navigate('/contact');
  };

  return (
    <div className="oc_order-confirmation-page">
      <Header />
      <main className="oc_main">
        <h2>Order Confirmation</h2>
        <p>Thanks for your purchase. Your order <strong>{orderNumber}</strong> has been confirmed!</p>
        <h3>Order Details:</h3>
        <div className="oc_cart-items">
          {books.map((book, index) => (
            <div key={index} className="oc_cart-item">
              <img src={book.imgSrc} alt={book.title} />
              <div className="oc_item-details">
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Price:</strong> {book.price}</p>
                <p><strong>Quantity:</strong> {book.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="oc_shipping-details">
          <h3>Shipping Details ({shippingAddress.method}) :</h3>
          <p>{shippingAddress.shippingFirstName} {shippingAddress.shippingLastName},</p>
          <p>{shippingAddress.shippingStreet}</p>
          <p>{shippingAddress.shippingCity}, {shippingAddress.shippingPlz}</p>
          <p>{shippingAddress.shippingCountry}</p>
        </div>
        <p>Need help with your order? Reach out to our customer support team via <a onClick={handleContact}>Contact Form</a>.</p>
        <button className="oc_back-button" onClick={handleGoBack}>Back</button>
      </main>
    </div>
  );
};

export default OrderConfirmation;
