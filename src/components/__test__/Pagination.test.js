import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';
import '@testing-library/jest-dom'; // Para tener matchers adicionales

describe('Pagination', () => {
  test('renders pagination buttons', () => {
    render(
      <Pagination
        itemsPerPage={10}
        totalItems={100}
        currentPage={1}
        setCurrentPage={jest.fn()}
      />
    );
    expect(screen.getAllByRole('button').length).toBe(10);
  });

  test('calls setCurrentPage on button click', () => {
    const setCurrentPage = jest.fn();
    render(
      <Pagination
        itemsPerPage={10}
        totalItems={100}
        currentPage={1}
        setCurrentPage={setCurrentPage}
      />
    );
    fireEvent.click(screen.getByText('2'));
    expect(setCurrentPage).toHaveBeenCalledWith(2);
  });
});
