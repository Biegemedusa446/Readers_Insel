import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';
import { getBasketItems, addToBasket, removeFromBasket, updateBasketItemQuantity, getAllProducts } from './apiService';
import Header from './Header';

const Checkout = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const basket = await getBasketItems();
        const allProducts = await getAllProducts();

        if (basket.items && Array.isArray(basket.items)) {
          const transformedBooks = basket.items.map(item => {
            const product = allProducts.find(p => p.isbn === item.isbn) || {};
            return {
              id: item.id,
              isbn: item.isbn,
              quantity: item.quantity,
              name: product.name || 'Unknown Book',
              author: product.author || 'Unknown Author',
              price: product.price || 0,
              imageLink: product.imageLink || 'https://via.placeholder.com/150',
            };
          });

          setBooks(transformedBooks);
        } else {
          console.error('Basket items are not an array:', basket.items);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleRemove = async (book) => {
    try {
      await removeFromBasket(book.isbn);
      setBooks(books.filter(b => b.isbn !== book.isbn));
      alert('Removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const handleAddToCart = async (book) => {
    try {
      const orderLineItemsDto = {
        isbn: book.isbn,
        quantity: 1,
      };
      await addToBasket(orderLineItemsDto);
      console.log(`Added ${book.name} to cart`);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const calculateTotal = () => {
    if (!Array.isArray(books)) return { subTotal: 0, delivery: 0, total: 0 };

    const subTotal = books.reduce((acc, book) => acc + (book.price * book.quantity), 0);
    const delivery = 4.00; // Static delivery cost
    const total = subTotal + delivery;
    return { subTotal, delivery, total };
  };

  const { subTotal, delivery, total } = calculateTotal();

  const handleCheckout = () => {
    navigate('/shippingaddress');
  };

  return (
    <div className="Checkout_checkout-page">
      <Header />
      <main className="Checkout_main">
        <h2>Shopping Cart</h2>
        <div className="Checkout_cart-summary">
          <p>{books.length} Items</p>
        </div>
        <table className="Checkout_cart-table">
          <thead>
            <tr>
              <th>Product Details</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(books) && books.map((book, index) => (
              <tr key={index} className="Checkout_cart-item">
                <td className="Checkout_item-details">
                  <img src={book.imageLink} alt={book.name} />
                  <div>
                    <h3>{book.name}</h3>
                    <p>{book.author}</p>
                  </div>
                </td>
                <td className="Checkout_item-quantity">
                  <button onClick={() => handleRemove(book)}>-</button>
                  <input type="text" value={book.quantity} readOnly />
                  <button onClick={() => handleAddToCart(book)}>+</button>
                </td>
                <td className="Checkout_item-price">{book.price.toFixed(2)}€</td>
                <td className="Checkout_item-total">{(book.price * book.quantity).toFixed(2)}€</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="Checkout_summary">
          <p><strong>Sub-total:</strong> {subTotal.toFixed(2)}€</p>
          <p><strong>Delivery:</strong> {delivery.toFixed(2)}€</p>
          <p><strong>Total:</strong> {total.toFixed(2)}€</p>
          <button className="Checkout_checkout-button" onClick={handleCheckout}>Checkout</button>
          <button className="Checkout_continue-shopping" onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
