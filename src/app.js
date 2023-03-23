// Import the required dependencies
const http = require("http");
const {respond, getID, failedResponse, getRequestData} = require("./utils");
const {getMovies, getMoviesById, saveMovie, updateMovie, deleteMovieById} = require("./moviesService");
// Define the port at which the application will run
const PORT = 80;

const regExp = /\/api\/movies\/[0-9]+/;

// Define the server
const server = http.createServer(async (req, res) => {
  // Get all movies
  if (req.url === '/api/movies' && req.method === 'GET'){
    getMovies((error, result) => {
      respond(res, error, result);
    })
  }

  // Get a movie with specified id
  else if (req.url.match(regExp) && req.method === 'GET'){
    const id = getID(req);
    getMoviesById(id, (error, result) => {
      respond(res, error, result);
    })
  }

  // Save movie details
  else if (req.url === '/api/movies' && req.method === "POST"){
    let newMovie = await getRequestData(req);
    saveMovie(newMovie, (error, result) => {
      respond(res, error, result);
    })
  }

  // Update a specific movie
  else if (req.url.match(regExp) && req.method === 'PUT'){
    const id = getID(req);
    let newData = await getRequestData(req);
    updateMovie(id, newData, (error, result) => {
      respond(res, error, result);
    })
  }

  // Delete a specific movie
  else if (req.url.match(regExp) && req.method === 'DELETE'){
    const id = getID(req);
    deleteMovieById(id, (error, result) => {
      respond(res, error, result);
    })
  }

  // If no route present capture in the else part
  else
    failedResponse(res, 'INVALID REQUEST');
});
// listen to the server on the specified port
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
server.on("error", (error) => {
  if (error.code === "EADRINUSE") {
    console.log("Port already in use");
  }
});
