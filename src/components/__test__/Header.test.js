import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';
import '@testing-library/jest-dom';

describe('Header', () => {
  test('renders header with favorite count', () => {
    render(
      <Header
        favoriteCount={5}
        toggleFavorites={jest.fn()}
        showFavorites={false}
      />
    );
    expect(screen.getByText(/5/i)).toBeInTheDocument();
  });

  test('calls toggleFavorites on button click', () => {
    const toggleFavorites = jest.fn();
    render(
      <Header
        favoriteCount={5}
        toggleFavorites={toggleFavorites}
        showFavorites={false}
      />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(toggleFavorites).toHaveBeenCalled();
  });
});
