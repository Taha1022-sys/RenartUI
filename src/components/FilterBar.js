import React, { useState } from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    gap: 20px;
    padding: 18px;
  }

  @media (max-width: 768px) {
    padding: 16px;
    gap: 16px;
    flex-direction: column;
    align-items: stretch;
  }

  @media (max-width: 480px) {
    padding: 12px;
    gap: 12px;
    margin-bottom: 16px;
  }
`;

const ActiveFiltersDisplay = styled.div`
  background: #e8f4f8;
  border: 1px solid #bee5eb;
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 16px;
  font-size: 0.875rem;
  color: #0c5460;

  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
`;

const FilterTag = styled.span`
  background: #17a2b8;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 8px;
  font-size: 0.8rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 180px;
  flex: 1;

  @media (max-width: 1024px) {
    min-width: 160px;
  }

  @media (max-width: 768px) {
    min-width: auto;
    flex: none;
  }
`;

const FilterLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #333;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const FilterInput = styled.input`
  padding: 12px 16px;
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  font-size: 0.875rem;
  transition: border-color 0.2s ease;
  min-height: 44px;
  box-sizing: border-box;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;

  &:focus {
    outline: none;
    border-color: #333;
  }

  @media (max-width: 768px) {
    padding: 14px 16px;
    font-size: 16px;
    min-height: 48px;
  }
`;

const FilterSelect = styled.select`
  padding: 12px 16px;
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  font-size: 0.875rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s ease;
  min-height: 44px;
  box-sizing: border-box;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;

  &:focus {
    outline: none;
    border-color: #333;
  }

  @media (max-width: 768px) {
    padding: 14px 16px;
    font-size: 16px;
    min-height: 48px;
  }
`;

const ApplyButton = styled.button`
  background: #333;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  align-self: flex-end;

  &:hover {
    background: #555;
  }

  @media (max-width: 768px) {
    align-self: stretch;
    padding: 12px;
  }
`;

const ClearButton = styled.button`
  background: transparent;
  color: #666;
  border: 2px solid #e5e5e5;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #333;
    color: #333;
  }

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  align-self: flex-end;

  @media (max-width: 1024px) {
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    align-self: stretch;
    gap: 8px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const FilterBar = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minPopularity: ''
  });
  const [activeFilters, setActiveFilters] = useState({});

  const handleInputChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApplyFilters = () => {
    const cleanFilters = {};
    Object.keys(filters).forEach(key => {
      if (filters[key] !== '') {
        if (key === 'minPopularity') {
          // Convert rating (1-5) to popularityScore (0-1)
          cleanFilters[key] = (parseFloat(filters[key]) / 5).toFixed(2);
        } else {
          cleanFilters[key] = filters[key];
        }
      }
    });
    setActiveFilters(cleanFilters);
    onFiltersChange(cleanFilters);
    console.log('🔍 Applied filters:', cleanFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      minPopularity: ''
    });
    setActiveFilters({});
    onFiltersChange({});
    console.log('🔄 Cleared all filters');
  };

  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  return (
    <div>
      {hasActiveFilters && (
        <ActiveFiltersDisplay>
          <strong>Active Filters:</strong>{' '}
          {activeFilters.minPrice && <FilterTag>Min: ${activeFilters.minPrice}</FilterTag>}
          {activeFilters.maxPrice && <FilterTag>Max: ${activeFilters.maxPrice}</FilterTag>}
          {activeFilters.minPopularity && <FilterTag>Rating: {activeFilters.minPopularity}+</FilterTag>}
        </ActiveFiltersDisplay>
      )}
      
      <FilterContainer>
      <FilterGroup>
        <FilterLabel>Min Price ($)</FilterLabel>
        <FilterInput
          type="number"
          placeholder="0"
          value={filters.minPrice}
          onChange={(e) => handleInputChange('minPrice', e.target.value)}
        />
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>Max Price ($)</FilterLabel>
        <FilterInput
          type="number"
          placeholder="10000"
          value={filters.maxPrice}
          onChange={(e) => handleInputChange('maxPrice', e.target.value)}
        />
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>Minimum Rating</FilterLabel>
        <FilterSelect
          value={filters.minPopularity}
          onChange={(e) => handleInputChange('minPopularity', e.target.value)}
        >
          <option value="">Any Rating</option>
          <option value="1">1+ Stars</option>
          <option value="2">2+ Stars</option>
          <option value="3">3+ Stars</option>
          <option value="4">4+ Stars</option>
          <option value="5">5 Stars</option>
        </FilterSelect>
      </FilterGroup>

      <ButtonGroup>
        <ClearButton onClick={handleClearFilters}>
          Clear
        </ClearButton>
        <ApplyButton onClick={handleApplyFilters}>
          Apply Filters
        </ApplyButton>
      </ButtonGroup>
      </FilterContainer>
    </div>
  );
};

export default FilterBar;