import React from 'react';
import styled from 'styled-components';

const StarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const Star = styled.svg`
  width: 16px;
  height: 16px;
  fill: ${props => props.filled ? '#ffd700' : '#e5e5e5'};
  transition: fill 0.2s ease;

  @media (max-width: 768px) {
    width: 14px;
    height: 14px;
  }
`;

const RatingText = styled.span`
  margin-left: 8px;
  font-size: 14px;
  color: #666;
  font-weight: 400;
  font-family: 'Avenir Book', 'Avenir', -apple-system, BlinkMacSystemFont, sans-serif;
  transition: all 0.3s cubic-bezier(.4,0,.2,1);
`;

const StarRating = ({ rating, showRatingText = true }) => {
  const normalizedRating = Math.max(0, Math.min(5, rating));
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1 >= 0.5;

  return (
    <StarContainer>
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          filled={index < fullStars || (index === fullStars && hasHalfStar)}
          viewBox="0 0 24 24"
        >
          <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.46,13.97L5.82,21L12,17.27Z" />
        </Star>
      ))}
      {showRatingText && (
        <RatingText>
          {normalizedRating.toFixed(1)} <span style={{fontSize: 'inherit', fontFamily: 'inherit', color: 'inherit'}}>/ 5</span>
        </RatingText>
      )}
    </StarContainer>
  );
};

export default StarRating;