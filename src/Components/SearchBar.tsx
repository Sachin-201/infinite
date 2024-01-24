import  { Component } from "react";
import React from 'react';
import { TextField, Button, Grid } from "@mui/material";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

interface SearchBarState {
  searchTerm: string;
}

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);

    this.state = {
      searchTerm: "",
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.currentTarget.value.trim();
    this.setState({ searchTerm });
  };

  handleSearch = () => {
    const { searchTerm } = this.state;
    this.props.onSearch(searchTerm);
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSearch}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default SearchBar;
