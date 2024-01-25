import React from "react";
import { Component } from "react";
import { Post } from "./PostDetails";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Paper, Link } from "@mui/material";

interface PostListProps {
  posts: Post[];
  onSelectPost: (post: Post) => void;
  fetchMorePosts: () => Promise<void>;
}

interface PostListState {
  loading: boolean;
}

class PostList extends Component<PostListProps, PostListState> {
  constructor(props: PostListProps) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render() {
    const { posts, onSelectPost } = this.props;
    return (
      <div>
        <ul style={{ padding: 0, listStyleType: "none" }}>
          {posts.map((post) => (
            // <Link
            //   key={post.objectID}
            //   component={RouterLink}
            //   to="/post"
            //   onClick={() => onSelectPost(post)}
            //   style={{ textDecoration: "none" }}
            // >

            <Link
              key={post.objectID}
              component={RouterLink}
              to="/post"
              onClick={() => onSelectPost(post)}
              style={{ textDecoration: "none" }}
              data-testid={`post-${post.objectID}`}
            >
              <Paper
                elevation={3}
                style={{
                  margin: "20px",
                  padding: "10px",
                  backgroundColor: "#f2f2f2",
                }} // Set background color to light gray
              >
                <Typography variant="h6">Title: {post.title}</Typography>
                <Typography variant="body1">
                  URL: <a href={post.url}> {post.url} </a>{" "}
                </Typography>
                <Typography variant="body1">
                  Created At:{" "}
                  {new Date(post.created_at).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    timeZone: "UTC",
                  })}
                </Typography>
                <Typography variant="body1">
                  Tags: {post._tags.join(", ")}
                </Typography>
                <Typography variant="body1">Author: {post.author}</Typography>
              </Paper>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

export default PostList;
