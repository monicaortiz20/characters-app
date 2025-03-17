import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';
import '@testing-library/jest-dom'; // Para tener matchers adicionales

describe('SearchBar', () => {
  test('renders search bar', () => {
    render(<SearchBar handleSearch={jest.fn()} id="testSearchBar" />);
    expect(
      screen.getByPlaceholderText(/SEARCH A CHARACTER.../i)
    ).toBeInTheDocument();
  });

  test('calls handleSearch on input change', () => {
    const handleSearch = jest.fn();
    render(<SearchBar handleSearch={handleSearch} id="testSearchBar" />);
    const input = screen.getByPlaceholderText(/SEARCH A CHARACTER.../i);
    fireEvent.change(input, { target: { value: 'Goku' } });
    expect(handleSearch).toHaveBeenCalled();
    expect(handleSearch).toHaveBeenCalledWith(expect.any(Object)); // Verifica que se llama con un evento
  });
});
