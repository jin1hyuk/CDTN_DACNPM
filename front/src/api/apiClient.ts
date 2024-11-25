import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5173', // Replace with your API base URL
  timeout: 10000, // Timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Dynamically add the Bearer token to the Authorization header
    const token = localStorage.getItem('token'); // Or get the token from a secure source
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('Request:', config);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Handle successful responses
    console.log('Response:', response.data);
    return response.data; // Return only the data
  },
  (error) => {
    // Handle errors
    console.error('Response error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
