import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShippingAddress.css';
import Header from './Header';

const ShippingAddress = () => {
  const [showShippingAddress, setShowShippingAddress] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    zip: '',
    shippingCountry: '',
    shippingFirstName: '',
    shippingLastName: '',
    shippingStreet: '',
    shippingCity: '',
    shippingPlz: '',
    method: 'Standard'
  });

  const navigate = useNavigate();

  const handleAddShippingAddress = () => {
    setShowShippingAddress(true);
  };

  const handleGoBackToBillingAddress = () => {
    setShowShippingAddress(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/confirmorder', { state: { formData } });
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Header />
      <div className="sa_shipping-address-page">
        <div className="sa_modal">
          <div className="sa_modal-header">
            <h2>{showShippingAddress ? 'Add Shipping Address' : 'Add Address'}</h2>
            <button className="sa_close-button" onClick={goBack}>&times;</button>
          </div>
          <form className="sa_address-form" onSubmit={handleSubmit}>
            {!showShippingAddress && (
              <>
                <div className="sa_form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="sa_form-row">
                  <div className="sa_form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="text" id="phone" value={formData.phone} onChange={handleChange} required />
                  </div>
                  <div className="sa_form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="sa_form-group">
                  <label htmlFor="street">Street</label>
                  <input type="text" id="street" value={formData.street} onChange={handleChange} required />
                </div>
                <div className="sa_form-row">
                  <div className="sa_form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" value={formData.city} onChange={handleChange} required />
                  </div>
                  <div className="sa_form-group">
                    <label htmlFor="zip">Zip Code</label>
                    <input type="text" id="zip" value={formData.zip} onChange={handleChange} required />
                  </div>
                </div>
                <div className="sa_add-shipping-address" onClick={handleAddShippingAddress}>
                  + Add Shipping Address (Optional)
                </div>
              </>
            )}

            {showShippingAddress && (
              <>
                <div className="sa_form-group">
                  <label htmlFor="shippingCountry">Country</label>
                  <input type="text" id="shippingCountry" value={formData.shippingCountry} onChange={handleChange} required />
                </div>
                <div className="sa_form-row">
                  <div className="sa_form-group">
                    <label htmlFor="shippingFirstName">First Name</label>
                    <input type="text" id="shippingFirstName" value={formData.shippingFirstName} onChange={handleChange} required />
                  </div>
                  <div className="sa_form-group">
                    <label htmlFor="shippingLastName">Last Name</label>
                    <input type="text" id="shippingLastName" value={formData.shippingLastName} onChange={handleChange} required />
                  </div>
                </div>
                <div className="sa_form-group">
                  <label htmlFor="shippingStreet">Street</label>
                  <input type="text" id="shippingStreet" value={formData.shippingStreet} onChange={handleChange} required />
                </div>
                <div className="sa_form-row">
                  <div className="sa_form-group">
                    <label htmlFor="shippingCity">City</label>
                    <input type="text" id="shippingCity" value={formData.shippingCity} onChange={handleChange} required />
                  </div>
                  <div className="sa_form-group">
                    <label htmlFor="shippingPlz">Zip Code</label>
                    <input type="text" id="shippingPlz" value={formData.shippingPlz} onChange={handleChange} required />
                  </div>
                </div>
                <div className="sa_go-back-to-billing" onClick={handleGoBackToBillingAddress}>
                  &lt; Go Back to Billing Address
                </div>
              </>
            )}

            <div className="sa_terms">
              By proceeding, you agree to our <a href="/terms">Terms of Use</a> and confirm you have read our <a href="/privacy">Privacy</a> and <a href="/cookies">Cookie Statement</a>.
            </div>
            <div className="sa_form-actions">
              <button type="button" className="sa_cancel-button" onClick={goBack}>Back</button>
              <button type="submit" className="sa_save-button">Next</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
