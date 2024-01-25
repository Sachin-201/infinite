import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PostList, { Post } from "../Components/PostList";

const mockPosts: Post[] = [
  {
    objectID: "1",
    title: "Test Post 1",
    author: "John Doe",
    url: "https://example.com/post1",
    created_at: "2022-01-01T12:34:56Z",
    _tags: ["tag1", "tag2"],
  },
  {
    objectID: "2",
    title: "Test Post 2",
    author: "Jane Doe",
    url: "https://example.com/post2",
    created_at: "2022-01-02T12:34:56Z",
    _tags: ["tag3", "tag4"],
  },
];

test("handles post selection correctly", async () => {
  const onSelectPostMock = jest.fn();
  render(
    <Router>
      <PostList
        posts={mockPosts}
        onSelectPost={onSelectPostMock}
        fetchMorePosts={() => Promise.resolve()}
      />
    </Router>
  );

  fireEvent.click(screen.getByTestId("post-1")); // Change to getByTestId

  await waitFor(() => {});

  expect(onSelectPostMock).toHaveBeenCalledWith(mockPosts[0]);
});

test("renders post list correctly", () => {
  render(
    <Router>
      <PostList
        posts={mockPosts}
        onSelectPost={() => {}}
        fetchMorePosts={() => Promise.resolve()}
      />
    </Router>
  );

  mockPosts.forEach((post) => {
    const postLink = screen.getByTestId(`post-${post.objectID}`);
    expect(postLink).toBeTruthy();

    const titleElement = within(postLink).getByRole("heading", {
      name: `Title: ${post.title}`,
    });
    expect(titleElement).toBeTruthy();

    const urlElement = within(postLink).getByRole("link", {
      name: new RegExp(post.url),
    });
    expect(urlElement).toBeTruthy();

    const createdAtElement = within(postLink).getByText(
      `Created At: ${new Date(post.created_at).toLocaleString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: "UTC",
      })}`
    );
    expect(createdAtElement).toBeTruthy();

    const tagsElement = within(postLink).getByText(
      `Tags: ${post._tags.join(", ")}`
    );
    expect(tagsElement).toBeTruthy();

    const authorElement = within(postLink).getByText(`Author: ${post.author}`);
    expect(authorElement).toBeTruthy();
  });
});
