import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../Components/SearchBar";

const mockOnSearch = jest.fn();

const defaultProps = {
  onSearch: mockOnSearch,
};

test("SearchBar component renders correctly", () => {
  render(<SearchBar {...defaultProps} />);

  expect(screen.getByLabelText("Search")).toBeTruthy();
  expect(screen.getByRole("button", { name: "Search" })).toBeTruthy();
});

test("SearchBar handles input change and search button click", () => {
  render(<SearchBar {...defaultProps} />);

  const searchInput = screen.getByLabelText("Search");
  fireEvent.change(searchInput, { target: { value: "test" } });

  expect(searchInput.value).toBe("test");

  const searchButton = screen.getByRole("button", { name: "Search" });
  fireEvent.click(searchButton);

  expect(mockOnSearch).toHaveBeenCalledWith("test");
});
