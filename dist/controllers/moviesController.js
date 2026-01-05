"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moviesModel_1 = __importDefault(require("../model/moviesModel"));
const getAllMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const year = req.query.year;
        if (year) {
            const moviesByYear = yield moviesModel_1.default.find({ year: year });
            return res.json(moviesByYear);
        }
        else {
            const movies = yield moviesModel_1.default.find();
            res.json(movies);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
const getMovieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const movie = yield moviesModel_1.default.findById(id);
        res.json(movie);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movieData = req.body;
    console.log(movieData);
    try {
        const newMovie = yield moviesModel_1.default.create(movieData);
        res.status(201).json(newMovie);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
// const deleteMovie = async (req, res) => {
//   const id = req.params.id; 
//   try { 
//     const deleteMovie = await movieModel.findByIdAndDelete(id);
//     res.status(200).json(deleteMovie);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// }
// controllers/moviesController.js
// const deleteMovie = async (req, res) => {
//     const id = req.params.id;
//     console.log("DEBUG: Trying to delete ID:", id); // שורת קסם לדיבוג
//     try {
//         const deletedMovie = await movieModel.findByIdAndDelete(id);
//         if (!deletedMovie) {
//             console.log("DEBUG: Movie NOT found in DB");
//             return res.status(404).json({ message: "Movie not found" });
//         }
//         res.status(200).json(deletedMovie);
//     } catch (error) {
//         console.error("DEBUG: Delete Error:", error.message);
//         res.status(500).json({ message: 'Server Error' });
//     }
// };
// const deleteMovie = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const deletedMovie = await movieModel.findByIdAndDelete(id);
//         // זה החלק החסר! אם deletedMovie הוא null, הסרט לא קיים
//         if (!deletedMovie) {
//             return res.status(404).json({ message: "Movie not found" });
//         }
//         res.status(200).json(deletedMovie);
//     } catch (error) {
//         res.status(500).json({ message: 'Server Error' });
//     }
// };
// const deleteMovie = async (req, res) => {
//     const { id } = req.params; // שימוש ב-Destructuring
//     try {
//         // בדיקה אם ה-ID בכלל בפורמט תקין של מונגו
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ message: "Invalid ID format" });
//         }
//         const deletedMovie = await movieModel.findByIdAndDelete(id);
//         if (!deletedMovie) {
//             return res.status(404).json({ message: "Movie not found" });
//         }
//         res.status(200).json(deletedMovie);
//     } catch (error) {
//         console.error("Delete Error:", error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// };
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // מחיקה וקבלת הסרט שנמחק
        const deleted = yield moviesModel_1.default.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Movie not found" });
        }
        return res.status(200).json(deleted);
    }
    catch (error) {
        console.error("Delete Error:", error);
        return res.status(500).json({ message: "Server Error" });
    }
});
// const updateMovie = async (req, res) => {
//   const id = req.params.id;
//   const updatedData = req.body;
//   try {
//     const movie = await movieModel.findByIdAndUpdate(id, updatedData, { new: true });
//     res.json(movie);  
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error updating movie"); 
//   }
// };
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        // { new: true } גורם לזה להחזיר את האובייקט המעודכן
        const movie = yield moviesModel_1.default.findByIdAndUpdate(id, updatedData, { new: true });
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json(movie);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
exports.default = {
    getAllMovies,
    getMovieById,
    createMovie,
    deleteMovie,
    updateMovie
};
//# sourceMappingURL=moviesController.js.map