import axios from 'axios';
import toast from 'react-hot-toast';

// In a real app, this would be imported from a centralized auth store
// For now, we simulate getting the token from localStorage
const getToken = () => localStorage.getItem('auth_token');
const removeToken = () => localStorage.removeItem('auth_token');

// Create a centralized Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach the Authorization token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors (e.g., 401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx causes this function to trigger
    const { response } = error;

    if (response) {
      switch (response.status) {
        case 401:
          // Unauthorized: Token expired or invalid
          removeToken();
          toast.error('Session expired. Please log in again.');
          // In a real app with a router, you might redirect to /login here
          // e.g., window.location.href = '/login';
          break;
        case 403:
          // Forbidden: User doesn't have required roles
          toast.error('You do not have permission to perform this action.');
          break;
        case 404:
          // Not Found
          console.warn('API Endpoint not found:', error.config.url);
          break;
        case 500:
          // Server Error
          toast.error('An internal server error occurred. Please try again later.');
          break;
        default:
          // Other errors (e.g., 400 Bad Request usually handled locally by the component)
          const message = response.data?.message || 'An unexpected error occurred.';
          toast.error(message);
          break;
      }
    } else if (error.request) {
      // The request was made but no response was received (e.g. Network Error)
      toast.error('Network error. Please check your connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error processing request:', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
