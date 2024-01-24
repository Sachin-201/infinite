import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';

// Mock the onSearch prop function
const mockOnSearch = jest.fn();

// Mock the SearchBarProps
const defaultProps = {
  onSearch: mockOnSearch,
};

test('SearchBar component renders correctly', () => {
  render(<SearchBar {...defaultProps} />);

  // Check if the SearchBar renders correctly
  expect(screen.getByLabelText('Search')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
});

test('SearchBar handles input change and search button click', () => {
  render(<SearchBar {...defaultProps} />);

  // Simulate user typing in the search input
  const searchInput = screen.getByLabelText('Search');
  fireEvent.change(searchInput, { target: { value: 'test' } });

  // Check if the input value is updated
  expect(searchInput).toHaveValue('test');

  // Simulate user clicking the search button
  const searchButton = screen.getByRole('button', { name: 'Search' });
  fireEvent.click(searchButton);

  // Check if the onSearch prop is called with the correct value
  expect(mockOnSearch).toHaveBeenCalledWith('test');
});

// Add more test cases as needed

