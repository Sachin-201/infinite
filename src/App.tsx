import React from 'react';
import { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Paper, CircularProgress } from "@mui/material";
import SearchBar from "./Components/SearchBar";
import PostList from "./Components/PostList";
import PostDetails, { Post } from "./Components/PostDetails";

interface AppState {
  posts: Post[];
  filteredPosts: Post[];
  selectedPost: Post | null;
  page: number;
  loading: boolean;
  nbPages?: number;
}

class App extends Component<{}, AppState> {
  interval: number | undefined;
  constructor(props: {}) {
    super(props);

    this.state = {
      posts: [],
      filteredPosts: [],
      selectedPost: null,
      page: 0,
      loading: false,
      nbPages: 0,
    };
  }

  componentDidMount() {
    this.fetchPosts();
    this.interval = setInterval(this.fetchPosts, 10000);
    window.addEventListener("scroll", this.handleWindowScroll);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    window.removeEventListener("scroll", this.handleWindowScroll);
  }

  handleWindowScroll = () => {
    const scrollY = window.scrollY;
    const { loading } = this.state;
    if (
      !loading &&
      window.innerHeight + scrollY >= document.body.offsetHeight - 200
    ) {
      this.fetchPosts();
    }
  };

  fetchPosts = async () => {
    const { page, posts, loading } = this.state;
    if (page > 0 && page > this.state.nbPages) {
      console.log("Reached maximum number of pages to fetch. Stopping...");
      return;
    }

    try {
      this.setState({ loading: true });

      const response = await axios.get(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
      );
      if (page === 0) {
        this.setState({
          nbPages: response.data.nbPages,
        });
      }

      this.setState({
        posts: [...posts, ...response.data.hits],
        page: page + 1,
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearch = (searchTerm: string) => {
    const { posts } = this.state;
    if (searchTerm.trim() === "") {
      this.setState({ filteredPosts: [] });
      return;
    }
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({ filteredPosts: filtered });
  };

  handleSelectPost = (post: Post) => {
    this.setState({ selectedPost: post });
  };

  render() {
    const { filteredPosts, selectedPost, loading } = this.state;
    return (
      <Router>
        <div>
          <SearchBar onSearch={this.handleSearch}  />
          {loading && <CircularProgress style={{ marginTop: "20px" }} />}
          <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
            <Routes>
              <Route
                path="/"
                element={
                  <PostList
                    posts={
                      filteredPosts.length > 0
                        ? filteredPosts
                        : this.state.posts
                    }
                    onSelectPost={this.handleSelectPost}
                    fetchMorePosts={this.fetchPosts}
                  />
                }
              />
              <Route
                path="/post"
                element={<PostDetails post={selectedPost} />}
              />
            </Routes>
          </Paper>
        </div>
      </Router>
    );
  }
}

export default App;
