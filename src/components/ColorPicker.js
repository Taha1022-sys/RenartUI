import React, { useState } from 'react';
import styled from 'styled-components';

const ColorContainer = styled.div`
  display: flex;
  gap: 8px;
  margin: 12px 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 12px;
    margin: 16px 0;
  }
`;

const ColorOption = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 3px solid ${props => props.selected ? '#333' : '#ddd'};
  background-color: ${props => props.color};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props => props.selected ? '0 0 0 2px rgba(51, 51, 51, 0.2)' : 'none'};
  touch-action: manipulation;
  padding: 4px;
  min-width: 40px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    border-color: #333;
  }

  &:focus {
    outline: none;
    border-color: #333;
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    min-width: 44px;
    min-height: 44px;
    padding: 4px;
  }
`;

const ColorLabel = styled.span`
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
  margin-bottom: 8px;
  display: block;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const ColorPicker = ({ colors, selectedColor, onColorChange, label = "Color" }) => {
  const [activeColor, setActiveColor] = useState(selectedColor || colors[0]?.value);

  const handleColorSelect = (color) => {
    setActiveColor(color.value);
    onColorChange(color);
  };

  return (
    <div>
      <ColorLabel>{label}:</ColorLabel>
      <ColorContainer>
        {colors.map((color, index) => (
          <ColorOption
            key={index}
            color={color.value}
            selected={activeColor === color.value}
            onClick={() => handleColorSelect(color)}
            title={color.name}
            aria-label={`Select ${color.name} color`}
          />
        ))}
      </ColorContainer>
    </div>
  );
};

export default ColorPicker;