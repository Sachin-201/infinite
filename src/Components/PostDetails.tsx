import React, { Component } from "react";
import { Typography, Paper, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export interface Post {
  objectID: string;
  title: string;
  author: string;
  url: string;
  created_at: string;
  _tags: string[];
}

interface PostDetailsProps {
  post: Post | null;
}

class PostDetails extends Component<PostDetailsProps> {
  render() {
    const { post } = this.props;

    if (!post) {
      return <Typography variant="h6">No post selected.</Typography>;
    }

    return (
      <Paper elevation={3} style={{ padding: 16, margin: 16 }}>
        <Typography variant="h6">Title: {post.title}</Typography>
        <Typography variant="body1">
          URL: <a href={post.url}> {post.url} </a>
        </Typography>
        <Typography variant="body1">Created At: {post.created_at}</Typography>
        <Typography variant="body1">Tags: {post._tags.join(", ")}</Typography>
        <Typography variant="body1">Author: {post.author}</Typography>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/"
          style={{ marginTop: 16 }}
        >
          Back to Home
        </Button>
      </Paper>
    );
  }
}

export default PostDetails;
