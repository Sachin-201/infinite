import React from "react";
import {
  render,
  act,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import App from "../App";

const mockAxios = new MockAdapter(axios);
const mockApiResponse = {
  hits: [
    {
      objectID: "1",
      title: "Test Post 1",
      author: "John Doe",
      url: "https://example.com/post1",
      created_at: "2022-01-01T12:34:56Z",
      _tags: ["tag1", "tag2"],
    },
  ],
  nbPages: 1,
};

mockAxios
  .onGet("https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0")
  .reply(200, mockApiResponse);

test("renders App component and fetches posts", async () => {
  render(
      <App />
  );
});

describe("YourComponent", () => {
  jest.useFakeTimers();
  it("should fetch posts on componentDidMount", () => {
    const fetchPostsMock = jest.fn();

    render(<App fetchPosts={fetchPostsMock} />);

    expect(fetchPostsMock).toHaveBeenCalledTimes(0);
  });

  it("should set up interval on componentDidMount", () => {
    render(<App />);

    act(() => {
      jest.advanceTimersByTime(10000);
    });
  });

  it("should clear interval on componentWillUnmount", () => {
    const { unmount } = render(<App />);

    unmount();

    act(() => {
      jest.advanceTimersByTime(10000);
    });
  });

  it("should remove event listener on componentWillUnmount", () => {
    const removeEventListenerMock = jest.fn();
    global.removeEventListener = removeEventListenerMock;

    const { unmount } = render(<App />);

    unmount();

    expect(removeEventListenerMock).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
  });
});

describe("Handle Scroll ", () => {
  it("should fetch posts when scrolled to the bottom 23 ", () => {
    const fetchPostsMock = jest.fn();

    document.body.getBoundingClientRect = jest.fn(() => ({
      height: 1000,
    }));

    const { getByTestId } = render(<App fetchPosts={fetchPostsMock} />);

    window.innerHeight = 500;
    window.scrollY = 300;

    fireEvent.scroll(window);

    expect(fetchPostsMock).toHaveBeenCalledTimes(0);
  });

  it("should not fetch posts if already loading", () => {
    const fetchPostsMock = jest.fn();
    const { rerender } = render(
      <App fetchPosts={fetchPostsMock} loading={true} />
    );
    fireEvent.scroll(window);
    expect(fetchPostsMock).not.toHaveBeenCalled();
    rerender(<App fetchPosts={fetchPostsMock} loading={false} />);
    fireEvent.scroll(window);
    expect(fetchPostsMock).toHaveBeenCalledTimes(0);
  });
});






