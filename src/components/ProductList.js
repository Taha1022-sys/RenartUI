import React, { useState } from 'react';
import styled from 'styled-components';
import { useProducts } from '../hooks/useProducts';
import { productService } from '../services/api';
import { formatApiTestResults } from '../utils/apiHelpers';
import ProductCard from './ProductCard';
import FilterBar from './FilterBar';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;

  @media (max-width: 1024px) {
    padding: 20px;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 40px;
  position: relative;
  min-height: 100px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
    min-height: 80px;
  }
`;

const Title = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 64px;
  font-weight: 400;
  color: #333;
  margin: 0;
  font-family: 'Avenir Book', 'Avenir', -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: 1px;
  line-height: 1.1;

  @media (max-width: 1024px) {
    font-size: 48px;
  }
  @media (max-width: 768px) {
    font-size: 36px;
  }
  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const ProductListTitle = styled.h2`
  text-align: center;
  font-size: 45px;
  font-weight: 400;
  color: #333;
  margin: 32px 0 24px 0;
  font-family: 'Avenir Book', 'Avenir', -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: 1px;
  line-height: 1.1;

  @media (max-width: 1024px) {
    font-size: 36px;
    margin: 24px 0 18px 0;
  }
  @media (max-width: 768px) {
    font-size: 28px;
    margin: 18px 0 12px 0;
  }
  @media (max-width: 480px) {
    font-size: 22px;
    margin: 12px 0 8px 0;
  }
`;

const Logo = styled.img`
  height: 96px;
  width: auto;
  margin-right: 32px;
  display: block;
  @media (max-width: 1024px) {
    height: 72px;
    margin-right: 24px;
  }
  @media (max-width: 768px) {
    height: 56px;
    margin-right: 16px;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 24px;
  transition: opacity 0.4s cubic-bezier(.4,0,.2,1);
  opacity: 1;
  will-change: opacity;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
    margin-top: 20px;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-top: 16px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 40px;
  color: #e74c3c;
`;

const ErrorMessage = styled.p`
  font-size: 1.125rem;
  margin: 0 0 16px 0;
`;

const RetryButton = styled.button`
  background: #333;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #555;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
`;

const EmptyStateMessage = styled.p`
  font-size: 1.125rem;
  margin: 0;
`;

const TestButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  margin-left: 16px;
  transition: background-color 0.2s ease;

  &:hover {
    background: #0056b3;
  }

  @media (max-width: 768px) {
    margin: 8px 0 0 0;
  }
`;

const ApiStatus = styled.div`
  background: ${props => props.success ? '#d4edda' : '#f8d7da'};
  color: ${props => props.success ? '#155724' : '#721c24'};
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 0.875rem;
  border: 1px solid ${props => props.success ? '#c3e6cb' : '#f5c6cb'};
  white-space: pre-line;
  font-family: monospace;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;

  @media (max-width: 1024px) {
    gap: 10px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }

  @media (max-width: 480px) {
    margin-top: 12px;
  }
`;

const ApiInfo = styled.span`
  font-size: 0.875rem;
  color: #666;
  font-family: monospace;
`;

const ResultsCount = styled.div`
  margin-bottom: 16px;
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
`;

const ProductList = () => {
  const [filters, setFilters] = useState({});
  const [apiStatus, setApiStatus] = useState(null);
  const { products, loading, error, refetch } = useProducts(filters);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const testApiConnection = async () => {
    setApiStatus({ testing: true });
    try {
      const result = await productService.testConnection();
      setApiStatus(result);
      if (result.success) {
        refetch(); 
      }
    } catch (error) {
      setApiStatus({
        success: false,
        message: 'Connection test failed',
        error: error.message
      });
    }
  };

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    alert(`Added ${product.name} to cart!`);
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <Logo src="https://cdn.prod.website-files.com/68234acd8fb1ab421a72b174/6835a18d5509df5179891345_Renart_Social_Primary.png" alt="Renart Logo" />
          <Title>Renart Jewelry Collection</Title>
        </Header>
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header>
          <Logo src="https://cdn.prod.website-files.com/68234acd8fb1ab421a72b174/6835a18d5509df5179891345_Renart_Social_Primary.png" alt="Renart Logo" />
          <Title>Renart Jewelry Collection</Title>
        </Header>
        <ErrorContainer>
          <ErrorMessage>Failed to load products: {error}</ErrorMessage>
          <RetryButton onClick={refetch}>
            Try Again
          </RetryButton>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Logo src="https://cdn.prod.website-files.com/68234acd8fb1ab421a72b174/6835a18d5509df5179891345_Renart_Social_Primary.png" alt="Renart Logo" />
        <Title>Renart Jewelry Collection</Title>
      </Header>

      <FilterBar onFiltersChange={handleFiltersChange} />
      <ProductListTitle>Product List</ProductListTitle>

      {products.length > 0 && (
        <ResultsCount>
          Showing {products.length} product{products.length !== 1 ? 's' : ''}
        </ResultsCount>
      )}

      {products.length === 0 ? (
        <EmptyState>
          <EmptyStateMessage>
            No products found matching your criteria. Try adjusting your filters.
          </EmptyStateMessage>
        </EmptyState>
      ) : (
        <ProductGrid>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </ProductGrid>
      )}
    </Container>
  );
};

export default ProductList;