import { useState, useEffect } from 'react';
import { productService } from '../services/api';

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = Object.keys(filters).length > 0 
        ? await productService.getProductsByFilters(filters)
        : await productService.getAllProducts();
      
      setProducts(data);
    } catch (err) {
      setError(err.message);
      setProducts([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [JSON.stringify(filters)]);

  return { products, loading, error, refetch: fetchProducts };
};