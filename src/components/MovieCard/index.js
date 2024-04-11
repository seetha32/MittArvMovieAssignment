import React from 'react';

const MovieCard = ({ movie }) => {
  const { title, posterPath, releaseYear, imdbRating } = movie;

  return (
    <div className="movie-card">
      <img src={posterPath} alt={title} />
      <div className="movie-info">
        <h2>{title}</h2>
        <p>Release Year: {releaseYear}</p>
        <p>IMDB Rating: {imdbRating}</p>
      </div>
    </div>
  );
};

export default MovieCard;