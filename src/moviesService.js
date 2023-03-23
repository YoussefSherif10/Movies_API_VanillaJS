// Import the axios library
const axios = require('axios')
const data = require('../data/movies.json').movies;

const getMovies = (done) => {
  // get all movies
  done(null, JSON.stringify(data));
}

const getMoviesById = (movieId, done) => {
  // get movie by id
  let existed = data.find(m => m.id === movieId);
  if (!existed)
    return done('Movie doesn\'t exist');
  return done(null, JSON.stringify(existed));
}

const saveMovie = function (newMovie, done) {
  // save the details of a movie read from the request body
  let existed = data.find(m => m.id === newMovie.id);
  if (existed)
    return done('Movie already exists');
  data.push(newMovie);
  return done(null, JSON.stringify(newMovie));
}

const updateMovie = function (movieId, updateData, done) {
 // update movie details of a specific movie
  let existed = data.findIndex(m => m.id === movieId);
  if (existed === -1)
    return done('Movie Not Found');
  updateData.id = movieId;
  data.splice(existed, 1, updateData);
  return done(null, JSON.stringify(data));
}

const deleteMovieById = function (movieId, done) {
  // delete a specific movie
  let index = data.findIndex(m => m.id === movieId);
  if (index === -1)
    return done('Movie Not Found');
  data.splice(index, 1);
  return done(null, 'DELETED');
}



module.exports = {
  getMovies,
  getMoviesById,
  saveMovie,
  updateMovie,
  deleteMovieById
}
