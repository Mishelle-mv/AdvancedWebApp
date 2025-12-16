const movieModel = require('../model/moviesModel');


const getAllMovies = async (req, res) => {
  try{
    const year = req.query.year; 
    if (year) {
      const moviesByYear = await movieModel.find({ year: year });
      return res.json(moviesByYear);
    } else {
      
    }
    const movies = await movieModel.find();
    res.json(movies);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}   

const getMovieById = async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await movieModel.findById(id);
    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  } 
}

const createMovie = async (req, res) => {
  const movieData = req.body;
  console.log(movieData);
  try {
 const newMovie = await movieModel.create(movieData);
 res.status(201).json(newMovie);
}
catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server Error' });
} 
};       

const deleteMovie = async (req, res) => {
  const id = req.params.id; 
  try { 
    const deleteMovie = await movieModel.findByIdAndDelete(id);
    res.status(200).json(deleteMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
  
}

const updateMovie = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const movie = await movieModel.findByIdAndUpdate(id, updatedData, { new: true });
    res.json(movie);  
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating movie"); 
  }
};

module.exports = {
  getAllMovies,
  getMovieById,     
  createMovie,
  deleteMovie,      
  updateMovie
};

