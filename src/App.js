import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import ProductList from './components/ProductList';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    
    @media (max-width: 1024px) {
      font-size: 15px;
    }
    
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  body {
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f8f9fa;
    color: #333;
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }

  button {
    font-family: inherit;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Improved touch targets for mobile */
  @media (max-width: 768px) {
    button, input, select, textarea {
      min-height: 44px;
    }
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Better focus indicators */
  *:focus {
    outline: 2px solid #333;
    outline-offset: 2px;
  }

  button:focus {
    outline: 2px solid #333;
    outline-offset: 2px;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <ProductList />
      </AppContainer>
    </>
  );
}

export default App;