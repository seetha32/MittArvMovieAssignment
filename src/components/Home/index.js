import React, { Component } from 'react';
import MovieCard from '../MovieCard';
import MovieSearch from '../MovieSearch';
import {fetchTopRatedMovies} from './fetchTopRatedMovies';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoading: false,
      pageNumber: 1,
      searchTerm: '',
      sortBy: 'popularity.desc', // Default sort by popularity in descending order
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = async () => {
    const { pageNumber, sortBy } = this.state;
    try {
      this.setState({ isLoading: true });
      const movies = await fetchTopRatedMovies(pageNumber, sortBy);
      this.setState(prevState => ({
        movies: [...prevState.movies, ...movies],
        isLoading: false,
        pageNumber: prevState.pageNumber + 1,
      }));
    } catch (error) {
      console.error('Error fetching movies:', error);
      this.setState({ isLoading: false });
    }
  };

  handleSearch = async searchTerm => {
    // Reset movies list and page number
    this.setState({ movies: [], pageNumber: 1, searchTerm }, () => {
      this.fetchMovies();
    });
  };

  handleSortChange = async sortBy => {
    // Reset movies list and page number
    this.setState({ movies: [], pageNumber: 1, sortBy }, () => {
      this.fetchMovies();
    });
  };

  render() {
    const { movies, isLoading } = this.state;

    return (
      <div>
        <MovieSearch onSearch={this.handleSearch} />
        <div className="movie-list">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
          {isLoading && <div>Loading...</div>}
        </div>
      </div>
    );
  }
}

export default Home;