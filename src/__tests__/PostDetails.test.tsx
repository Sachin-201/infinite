import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PostDetails, { Post } from "../Components/PostDetails";
const mockPost: Post = {
  objectID: "1",
  title: "Test Post",
  author: "John Doe",
  url: "https://example.com",
  created_at: "2022-01-01T12:34:56Z",
  _tags: ["tag1", "tag2"],
};

test("renders post details correctly", () => {
  render(
    <Router>
      <PostDetails post={mockPost} />
    </Router>
  );
  expect(screen.getByText(`Title: ${mockPost.title}`)).toBeTruthy();
  expect(
    screen.getByText(
      `Created At: ${new Date(mockPost.created_at).toLocaleString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: "UTC",
      })}`
    )
  ).toBeTruthy();
  expect(screen.getByText(`Tags: ${mockPost._tags.join(", ")}`)).toBeTruthy();
  expect(screen.getByText(`Author: ${mockPost.author}`)).toBeTruthy();
  expect(screen.getByText("Back to Home")).toBeTruthy();
});

test("renders no post message when post is null", () => {
  render(
    <Router>
      <PostDetails post={null} />
    </Router>
  );
  expect(screen.getByText("No post selected.")).toBeTruthy();
});
