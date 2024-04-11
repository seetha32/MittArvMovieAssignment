export const fetchTopRatedMovies = async (pageNumber, sortBy) => {
    //const API_KEY = 'YOUR_API_KEY';
    const API_URL = `https://api.themoviedb.org/3/movie/top_rated?page=${pageNumber}&sort_by=${sortBy}`;
    
    const response = await fetch(API_URL);
    const data = await response.json();
    
    return data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      posterPath: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
      releaseYear: new Date(movie.release_date).getFullYear(),
      imdbRating: movie.vote_average,
    }));
  };