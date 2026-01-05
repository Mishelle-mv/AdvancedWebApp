// import movieModel from '../model/moviesModel';
// import { Request , Response } from 'express'; 

// const getAllMovies = async (req: Request, res: Response) => {
//   try{
//     const year = req.query.year; 
//     if (year) {
//       const moviesByYear = await movieModel.find({ year: year });
//       return res.json(moviesByYear);
//     } else {
//        const movies = await movieModel.find();
//        res.json(movies);
//     }
   
//   }
//   catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// }   

// const getMovieById = async (req: Request, res: Response) => {
//   const id = req.params.id;
//   try {
//     const movie = await movieModel.findById(id);
//     res.json(movie);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   } 
// }

// const createMovie = async (req: Request, res: Response) => {
//   const movieData = req.body;
//   console.log(movieData);
//   try {
//  const newMovie = await movieModel.create(movieData);
//  res.status(201).json(newMovie);
// }
// catch (error) {
//   console.error(error);
//   res.status(500).json({ message: 'Server Error' });
// } 
// };       

// // const deleteMovie = async (req, res) => {
// //   const id = req.params.id; 
// //   try { 
// //     const deleteMovie = await movieModel.findByIdAndDelete(id);
// //     res.status(200).json(deleteMovie);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Server Error' });
// //   }
  
// // }


// // controllers/moviesController.js
// // const deleteMovie = async (req, res) => {
// //     const id = req.params.id;
// //     console.log("DEBUG: Trying to delete ID:", id); // שורת קסם לדיבוג
    
// //     try {
// //         const deletedMovie = await movieModel.findByIdAndDelete(id);
// //         if (!deletedMovie) {
// //             console.log("DEBUG: Movie NOT found in DB");
// //             return res.status(404).json({ message: "Movie not found" });
// //         }
// //         res.status(200).json(deletedMovie);
// //     } catch (error) {
// //         console.error("DEBUG: Delete Error:", error.message);
// //         res.status(500).json({ message: 'Server Error' });
// //     }
// // };

// // const deleteMovie = async (req, res) => {
// //     const id = req.params.id;
// //     try {
// //         const deletedMovie = await movieModel.findByIdAndDelete(id);
        
// //         // זה החלק החסר! אם deletedMovie הוא null, הסרט לא קיים
// //         if (!deletedMovie) {
// //             return res.status(404).json({ message: "Movie not found" });
// //         }
        
// //         res.status(200).json(deletedMovie);
// //     } catch (error) {
// //         res.status(500).json({ message: 'Server Error' });
// //     }
// // };

// // const deleteMovie = async (req, res) => {
// //     const { id } = req.params; // שימוש ב-Destructuring
// //     try {
// //         // בדיקה אם ה-ID בכלל בפורמט תקין של מונגו
// //         if (!mongoose.Types.ObjectId.isValid(id)) {
// //             return res.status(400).json({ message: "Invalid ID format" });
// //         }

// //         const deletedMovie = await movieModel.findByIdAndDelete(id);
        
// //         if (!deletedMovie) {
// //             return res.status(404).json({ message: "Movie not found" });
// //         }
        
// //         res.status(200).json(deletedMovie);
// //     } catch (error) {
// //         console.error("Delete Error:", error);
// //         res.status(500).json({ message: 'Server Error' });
// //     }
// // };

// const deleteMovie = async (req: Request, res: Response) => {
//     try {
//         const id = req.params.id;
//         // מחיקה וקבלת הסרט שנמחק
//         const deleted = await movieModel.findByIdAndDelete(id);
        
//         if (!deleted) {
//             return res.status(404).json({ message: "Movie not found" });
//         }
        
//         return res.status(200).json(deleted);
//     } catch (error) {
//         console.error("Delete Error:", error);
//         return res.status(500).json({ message: "Server Error" });
//     }
// };


// // const updateMovie = async (req, res) => {
// //   const id = req.params.id;
// //   const updatedData = req.body;
// //   try {
// //     const movie = await movieModel.findByIdAndUpdate(id, updatedData, { new: true });
// //     res.json(movie);  
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).send("Error updating movie"); 
// //   }
// // };

//  const updateMovie = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const updatedData = req.body;
//         // { new: true } גורם לזה להחזיר את האובייקט המעודכן
//         const movie = await movieModel.findByIdAndUpdate(id, updatedData, { new: true });
        
//         if (!movie) {
//             return res.status(404).json({ message: "Movie not found" });
//         }
//         res.status(200).json(movie);
//     } catch (error) {
//         res.status(500).json({ message: "Server Error" });
//     }
// };

// export default {
//   getAllMovies,
//   getMovieById,     
//   createMovie,
//   deleteMovie,      
//   updateMovie
// };

import movieModel from '../model/moviesModel';
import { Request, Response } from 'express';

const getAllMovies = async (req: Request, res: Response) => {
    try {
        const { year } = req.query; // הוצאת השנה מה-Query

        if (year) {
            // המרת השנה למספר כי ה-Model מצפה ל-Number
            const yearAsNumber = parseInt(year as string);

            // בדיקה אם ההמרה הצליחה (כדי שלא נשלח NaN למונגו)
            if (!isNaN(yearAsNumber)) {
                const moviesByYear = await movieModel.find({ year: yearAsNumber });
                return res.json(moviesByYear);
            }
        }

        // אם אין שנה או שהיא לא תקינה, מחזירים את כל הסרטים
        const movies = await movieModel.find();
        return res.json(movies);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

// שליפת סרט לפי ID
const getMovieById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const movie = await movieModel.findById(id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        return res.json(movie);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

// יצירת סרט חדש
const createMovie = async (req: Request, res: Response) => {
    try {
        const movieData = req.body;
        const newMovie = await movieModel.create(movieData);
        return res.status(201).json(newMovie);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

// מחיקת סרט - התיקון שחיכינו לו!
const deleteMovie = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedResult = await movieModel.findByIdAndDelete(id);

        if (!deletedResult) {
            return res.status(404).json({ message: "Movie not found" });
        }

        return res.status(200).json(deletedResult);
    } catch (error) {
        console.error("Delete Error:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};

// עדכון סרט
const updateMovie = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        
        // { new: true } מחזיר את האובייקט המעודכן ולא את הישן
        const movie = await movieModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        return res.status(200).json(movie);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
};

export default {
    getAllMovies,
    getMovieById,
    createMovie,
    deleteMovie,
    updateMovie
};
