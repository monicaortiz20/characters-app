import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CharacterCard from "../CharacterCard";
import "@testing-library/jest-dom"; // Para tener matchers adicionales

const mockCharacter = { id: 1, name: "Goku", image: "goku.jpg" };

describe("CharacterCard", () => {
  test("renders character card", () => {
    render(
      <CharacterCard
        character={mockCharacter}
        addFavorite={jest.fn()}
        deleteFavorite={jest.fn()}
        isFavorite={false}
      />
    );
    expect(screen.getByText(/Goku/i)).toBeInTheDocument();
  });

  test("calls addFavorite on button click if not favorite", () => {
    const addFavorite = jest.fn();
    render(
      <CharacterCard
        character={mockCharacter}
        addFavorite={addFavorite}
        deleteFavorite={jest.fn()}
        isFavorite={false}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(addFavorite).toHaveBeenCalledWith(mockCharacter);
  });

  test("calls deleteFavorite on button click if favorite", () => {
    const deleteFavorite = jest.fn();
    render(
      <CharacterCard
        character={mockCharacter}
        addFavorite={jest.fn()}
        deleteFavorite={deleteFavorite}
        isFavorite={true}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(deleteFavorite).toHaveBeenCalledWith(mockCharacter);
  });
});
