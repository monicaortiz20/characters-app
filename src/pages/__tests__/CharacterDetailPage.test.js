import React from 'react';
import { render, screen } from '@testing-library/react';
import CharacterDetailPage from '../CharacterDetailPage';
import '@testing-library/jest-dom'; // Para tener matchers adicionales

const mockCharacter = {
  id: 1,
  name: 'Goku',
  image: 'goku.jpg',
  description: 'A Saiyan warrior',
  transformations: [{ name: 'Super Saiyan', ki: 9000 }],
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockCharacter),
  })
);

describe('CharacterDetailPage', () => {
  test('renders character details', async () => {
    render(
      <CharacterDetailPage
        favorites={[]}
        addFavorite={jest.fn()}
        deleteFavorite={jest.fn()}
        showFavorites={false}
        toggleFavorites={jest.fn()}
      />
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    expect(await screen.findByText(/Goku/i)).toBeInTheDocument();
    expect(await screen.findByText(/A Saiyan warrior/i)).toBeInTheDocument();
    expect(await screen.findByText(/Super Saiyan/i)).toBeInTheDocument();
  });

  test('handles API error', async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject('API is down'));
    render(
      <CharacterDetailPage
        favorites={[]}
        addFavorite={jest.fn()}
        deleteFavorite={jest.fn()}
        showFavorites={false}
        toggleFavorites={jest.fn()}
      />
    );
    expect(
      await screen.findByText(/Unable to catch character details/i)
    ).toBeInTheDocument();
  });
});
