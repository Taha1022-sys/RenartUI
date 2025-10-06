import React, { useState } from 'react';
import styled from 'styled-components';
import StarRating from './StarRating';
import ColorPicker from './ColorPicker';

const Card = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;

  @media (max-width: 1024px) {
    height: 280px;
  }

  @media (max-width: 768px) {
    height: 250px;
  }

  @media (max-width: 480px) {
    height: 220px;
  }
`;

import { CSSTransition, SwitchTransition } from 'react-transition-group';

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  left: 0;
  top: 0;
  will-change: opacity, transform;
  transition: opacity 0.7s cubic-bezier(0.77, 0, 0.175, 1), transform 0.7s cubic-bezier(0.77, 0, 0.175, 1);
  &.fade-slide-enter {
    opacity: 0;
    transform: translateX(48px);
  }
  &.fade-slide-enter-active {
    opacity: 1;
    transform: translateX(0);
  }
  &.fade-slide-exit {
    opacity: 1;
    transform: translateX(0);
  }
  &.fade-slide-exit-active {
    opacity: 0;
    transform: translateX(-48px);
  }
`;

const CarouselArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.2s ease;
  z-index: 2;
  
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
  
  &.prev {
    left: 8px;
  }
  
  &.next {
    right: 8px;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
`;

const CarouselDots = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;

  @media (max-width: 768px) {
    gap: 12px;
    bottom: 16px;
  }
`;

const Dot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 4px;
  min-width: 16px;
  min-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #fff;
  }

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.active ? '#333' : 'rgba(255, 255, 255, 0.8)'};
  }

  @media (max-width: 768px) {
    min-width: 24px;
    min-height: 24px;
    padding: 8px;
    
    &::before {
      width: 10px;
      height: 10px;
    }
  }
`;

const CardContent = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    padding: 18px;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 14px;
  }
`;

const ProductName = styled.h3`
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin: 0 0 12px 0;
  line-height: 1.4;
  font-family: 'Montserrat Medium', 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  transition: all 0.3s cubic-bezier(.4,0,.2,1);
`;

const PriceContainer = styled.div`
  margin: 12px 0;
`;

const Price = styled.span`
  font-size: 15px;
  font-weight: 400;
  color: #333;
  font-family: 'Montserrat', 'Montserrat Regular', -apple-system, BlinkMacSystemFont, sans-serif;
  transition: all 0.3s cubic-bezier(.4,0,.2,1);
`;

const OriginalPrice = styled.span`
  font-size: 1rem;
  color: #999;
  text-decoration: line-through;
  margin-left: 8px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const SelectedColorName = styled.div`
  font-size: 12px;
  color: #666;
  font-weight: 400;
  margin: 8px 0 4px 0;
    text-align: left;
  font-family: 'Avenir Book', 'Avenir', -apple-system, BlinkMacSystemFont, sans-serif;
  transition: all 0.3s cubic-bezier(.4,0,.2,1);
`;

const AddToCartButton = styled.button`
  background: #333;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: auto;
  min-height: 44px;
  touch-action: manipulation;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;

  &:hover {
    background: #555;
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 768px) {
    padding: 14px 20px;
    min-height: 48px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 16px;
    font-size: 1rem;
  }
`;

const ProductCard = ({ product, onAddToCart }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    const colorIndex = product.colors.findIndex(c => c.value === color.value);
    if (colorIndex !== -1) {
      setCurrentImageIndex(colorIndex);
    }
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
    if (product.colors && product.colors[index]) {
      setSelectedColor(product.colors[index]);
    }
  };

  const goToPrevImage = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : (product.images?.length || 1) - 1;
    setCurrentImageIndex(newIndex);
    if (product.colors && product.colors[newIndex]) {
      setSelectedColor(product.colors[newIndex]);
    }
  };

  const goToNextImage = () => {
    const newIndex = currentImageIndex < (product.images?.length || 1) - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
    if (product.colors && product.colors[newIndex]) {
      setSelectedColor(product.colors[newIndex]);
    }
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNextImage();
    }
    if (isRightSwipe) {
      goToPrevImage();
    }
  };

  const handleAddToCart = () => {
    onAddToCart({
      ...product,
      selectedColor: selectedColor
    });
  };

  const currentImage = product.images?.[currentImageIndex] || product.images?.[0] || '/placeholder-jewelry.jpg';

  return (
    <Card>
      <ImageContainer
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={currentImage}
            timeout={500}
            classNames="fade-slide"
          >
            <ProductImage 
              src={currentImage} 
              alt={product.name}
              onError={(e) => {
                e.target.src = '/placeholder-jewelry.jpg';
              }}
            />
          </CSSTransition>
        </SwitchTransition>
        {product.images && product.images.length > 1 && (
          <>
            <CarouselArrow className="prev" onClick={goToPrevImage} aria-label="Previous image">
              ‹
            </CarouselArrow>
            <CarouselArrow className="next" onClick={goToNextImage} aria-label="Next image">
              ›
            </CarouselArrow>
            <CarouselDots>
              {product.images.map((_, index) => (
                <Dot
                  key={index}
                  active={index === currentImageIndex}
                  onClick={() => handleDotClick(index)}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </CarouselDots>
          </>
        )}
      </ImageContainer>

      <CardContent>
        <ProductName>{product.name}</ProductName>
        
        <StarRating rating={product.rating || product.popularity || 4.5} />

        {product.colors && product.colors.length > 0 && (
          <>
            <ColorPicker
              colors={product.colors}
              selectedColor={selectedColor?.value}
              onColorChange={handleColorChange}
            />
            {selectedColor && (
              <SelectedColorName>
                {selectedColor.name}
              </SelectedColorName>
            )}
          </>
        )}

        <PriceContainer>
          <Price>${product.price}</Price>
          {product.originalPrice && product.originalPrice > product.price && (
            <OriginalPrice>${product.originalPrice}</OriginalPrice>
          )}
        </PriceContainer>

        <AddToCartButton onClick={handleAddToCart}>
          Add to Cart
        </AddToCartButton>
      </CardContent>
    </Card>
  );
};

export default ProductCard;