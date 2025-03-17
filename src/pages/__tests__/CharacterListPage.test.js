import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharacterListPage from '../CharacterListPage';
import '@testing-library/jest-dom';

const mockCharacters = [
  { id: 1, name: 'Goku', image: 'goku.jpg' },
  { id: 2, name: 'Vegeta', image: 'vegeta.jpg' },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ items: mockCharacters }),
  })
);

describe('CharacterListPage', () => {
  test('renders character list', async () => {
    render(
      <MemoryRouter>
        <CharacterListPage
          favorites={[]}
          addFavorite={jest.fn()}
          deleteFavorite={jest.fn()}
          showFavorites={false}
        />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    expect(await screen.findByText(/Goku/i)).toBeInTheDocument();
    expect(await screen.findByText(/Vegeta/i)).toBeInTheDocument();
  });

  test('handles search input', async () => {
    render(
      <MemoryRouter>
        <CharacterListPage
          favorites={[]}
          addFavorite={jest.fn()}
          deleteFavorite={jest.fn()}
          showFavorites={false}
        />
      </MemoryRouter>
    );
    expect(await screen.findByText(/Goku/i)).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText(/SEARCH A CHARACTER.../i), {
      target: { value: 'Vegeta' },
    });
    expect(screen.queryByText(/Goku/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Vegeta/i)).toBeInTheDocument();
  });

  test('handles API error', async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject('API is down'));
    render(
      <MemoryRouter>
        <CharacterListPage
          favorites={[]}
          addFavorite={jest.fn()}
          deleteFavorite={jest.fn()}
          showFavorites={false}
        />
      </MemoryRouter>
    );
    expect(
      await screen.findByText(/Unable to get characters/i)
    ).toBeInTheDocument();
  });
});
