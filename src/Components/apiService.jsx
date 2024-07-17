import axios from 'axios';

const API_GATEWAY_URL = 'http://localhost:9001';

// Function to get the authentication token
const getAuthToken = () => {
  const keycloak = JSON.parse(localStorage.getItem('keycloak'));
  return keycloak ? keycloak.token : null;
};

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_GATEWAY_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add a request interceptor to include the auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Token added to request:', token); // Log token for verification
    }
    console.log('Request config:', config); // Log request config for debugging
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getAllProducts = async () => {
  try {
    const response = await apiClient.get('/api/product');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = async (productRequest) => {
  try {
    const response = await apiClient.post('/api/product', productRequest);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id, productRequest) => {
  try {
    const response = await apiClient.put(`/api/product/update/${id}`, productRequest);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (isbn) => {
  try {
    const response = await apiClient.delete(`/api/product/${isbn}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const addToBasket = async (orderLineItemsDto) => {
  try {
    const response = await apiClient.post('/api/baskets/add', orderLineItemsDto);
    return response.data;
  } catch (error) {
    console.error('Error adding to basket:', error);
    throw new Error('Error adding to basket: ' + error.message);
  }
};

export const removeFromBasket = async (isbn) => {
  try {
    const response = await apiClient.delete('/api/baskets/remove', {
      params: { userId: 'default-user', isbn },
    });
    return response.data;
  } catch (error) {
    console.error('Error removing from basket:', error);
    throw new Error('Error removing from basket: ' + error.message);
  }
};

export const updateBasketItemQuantity = async (isbn, quantity) => {
  try {
    const response = await apiClient.put('/api/baskets/update', { isbn, quantity });
    return response.data;
  } catch (error) {
    console.error('Error updating basket item quantity:', error);
    throw new Error('Error updating basket item quantity: ' + error.message);
  }
};

export const getBasketItems = async () => {
  try {
    const response = await apiClient.get('/api/baskets');
    return response.data;
  } catch (error) {
    console.error('Error fetching basket items:', error);
    throw error;
  }
};
