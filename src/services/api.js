import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://localhost:7133/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

const applyFilters = (products, filters) => {
  return products.filter(product => {
    if (filters.minPrice && product.price < parseFloat(filters.minPrice)) return false;
    if (filters.maxPrice && product.price > parseFloat(filters.maxPrice)) return false;
    if (filters.minPopularity && (product.rating || product.popularity) < parseFloat(filters.minPopularity)) return false;
    return true;
  });
};

export const productService = {
  getAllProducts: async () => {
    try {
      const response = await api.get('/products');
      console.log('📦 Received products from API:', response.data?.length || 0, 'items');
      const colorOptions = [
        { name: 'Yellow Gold', value: '#E6CA97' },
        { name: 'Rose Gold', value: '#E1A4A9' },
        { name: 'White Gold', value: '#D9D9D9' }
      ];
      const products = (response.data || []).map(product => ({
        ...product,
        images: [product.images?.yellow, product.images?.rose, product.images?.white],
        colors: colorOptions,
        rating: product.popularityRating ?? product.rating ?? 4.5
      }));
      return products;
    } catch (error) {
      console.error('❌ Failed to fetch products from API:', error.message);
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  },

  getProductsByFilters: async (filters) => {
    try {
      const params = new URLSearchParams();
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.minPopularity) params.append('minPopularity', filters.minPopularity);
      const queryString = params.toString();
      const url = queryString ? `/products?${queryString}` : '/products';
      console.log('🔍 Fetching filtered products with params:', Object.fromEntries(params));
      const response = await api.get(url);
      console.log('📦 Received filtered products from API:', response.data?.length || 0, 'items');
      const colorOptions = [
        { name: 'Yellow Gold', value: '#E6CA97' },
        { name: 'Rose Gold', value: '#E1A4A9' },
        { name: 'White Gold', value: '#D9D9D9' }
      ];
      const products = (response.data || []).map(product => ({
        ...product,
        images: [product.images?.yellow, product.images?.rose, product.images?.white],
        colors: colorOptions,
        rating: product.popularityRating ?? product.rating ?? 4.5
      }));
      return products;
    } catch (error) {
      console.error('❌ Failed to fetch filtered products from API:', error.message);
      throw new Error(`Failed to fetch filtered products: ${error.message}`);
    }
  },


};

export { api };

export default api;