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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const moviesModel_1 = __importDefault(require("../model/moviesModel"));
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("TEST DATABASE_URL:", process.env.DATABASE_URL);
    app = yield (0, index_1.default)();
    yield moviesModel_1.default.deleteMany({});
}));
afterAll(() => {
    console.log("afterAll");
    // done();
});
const moviesList = [
    { title: "Inception", year: 2010 },
    { title: "The Matrix", year: 1999 },
    { title: "Interstellar", year: 2014 }
];
describe("Sample Test Suite", () => {
    test("Sample Test Case", () => __awaiter(void 0, void 0, void 0, function* () {
        const respponse = yield (0, supertest_1.default)(app).get("/movie");
        expect(respponse.status).toBe(200);
        expect(respponse.body).toEqual([]);
    }));
    // test("Create Movie", async () => {
    //     for (const movie of moviesList) {
    //         const response = await request(app).post("/movie").send(movie);
    //         expect(response.status).toBe(201);
    //         expect(response.body.title).toBe(movie.title);
    //         expect(response.body.year).toBe(movie.year);
    //     }
    // });
    test("Test Create Movie", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/movie").send(moviesList[0]);
        expect(response.status).toBe(201);
        // השורה הקריטית: שמירת ה-ID שנוצר בתוך המערך שלנו
        moviesList[0]._id = response.body._id;
    }));
    test("Get All Movies", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/movie");
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(moviesList.length);
    }));
    test("Get Movie by year", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/movie?year=" + moviesList[0].year);
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].title).toBe(moviesList[0].title);
        moviesList[0]._id = response.body[0]._id;
    }));
    //get movie by id
    test("Get Movie by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/movie/" + moviesList[0]._id);
        expect(response.status).toBe(200);
        expect(response.body.title).toBe(moviesList[0].title);
        expect(response.body.year).toBe(moviesList[0].year);
        expect(response.body._id).toBe(moviesList[0]._id);
    }));
    test("Update Movie", () => __awaiter(void 0, void 0, void 0, function* () {
        moviesList[0].title = "Inception Updated";
        //const movieId = moviesList[0]._id;
        const response = yield (0, supertest_1.default)(app)
            .put("/movie/" + moviesList[0]._id)
            .send(moviesList[0]);
        expect(response.status).toBe(200);
        expect(response.body.title).toBe(moviesList[0].title);
        expect(response.body.year).toBe(moviesList[0].year);
        expect(response.body._id).toBe(moviesList[0]._id);
    }));
    // test("Delete Movie", async () => {
    //     const response = await request(app).delete("/movie/" + moviesList[0]._id);
    //     expect(response.status).toBe(200);
    //     expect(response.body._id).toBe(moviesList[0]._id); 
    //     const getResponse = await request(app).get("/movie/" + moviesList[0]._id);
    //     expect(getResponse.status).toBe(404);
    // });
    test("Delete Movie", () => __awaiter(void 0, void 0, void 0, function* () {
        // שלב 1: מחיקה. וודאי ש-moviesList[0]._id הוגדר בטסט ה-POST!
        const deleteRes = yield (0, supertest_1.default)(app).delete("/movie/" + moviesList[0]._id);
        // אם כאן את מקבלת 500 או 400, סימן ש-moviesList[0]._id לא הגיע מה-POST
        expect(deleteRes.status).toBe(200);
        // שלב 2: ניסיון שליפה חוזר - עכשיו חייב לחזור 404
        const getResponse = yield (0, supertest_1.default)(app).get("/movie/" + moviesList[0]._id);
        expect(getResponse.status).toBe(404);
    }));
});
// describe("Sample Test Suite", () => {
//     // טסט 1: מוודא שהבסיס נתונים ריק בהתחלה
//     test("Sample Test Case", async () => {
//         const response = await request(app).get("/movie");
//         expect(response.status).toBe(200);
//         expect(response.body).toEqual([]);
//     });
//     // טסט 2: יוצר את כל הסרטים מהרשימה
//     test("Test Create Movie", async () => {
//         for (let i = 0; i < moviesList.length; i++) {
//             const response = await request(app).post("/movie").send(moviesList[i]);
//             expect(response.status).toBe(201);
//             // שומרים את ה-ID שנוצר בתוך המערך שלנו לשימוש בהמשך
//             moviesList[i]._id = response.body._id; 
//         }
//     });
//     // טסט 3: עכשיו יש בדיוק 3 סרטים, אז זה יעבור!
//    test("Update Movie", async () => {
//     const updatedData = { title: "Inception Updated", year: 2010 };
//     const response = await request(app)
//         .put("/movie/" + moviesList[0]._id)
//         .send(updatedData);
//     expect(response.status).toBe(200);
//     expect(response.body.title).toBe(updatedData.title);
//     // חשוב: אל תשנה את moviesList[0]._id כאן, הוא כבר קיים וצריך להישאר אותו דבר!
// });
//     // טסט 4: חיפוש לפי שנה
//     test("Get Movie by year", async () => {
//         const response = await request(app).get("/movie?year=" + moviesList[0].year);
//         expect(response.status).toBe(200);
//         // מחפשים שנה ספציפית, בנתונים שלנו יש רק סרט אחד לכל שנה
//         expect(response.body.length).toBe(1); 
//         expect(response.body[0].title).toBe(moviesList[0].title);
//     });
//     // טסט 5: שליפה לפי ID
//     test("Get Movie by ID", async () => {
//         const response = await request(app).get("/movie/" + moviesList[0]._id);
//         expect(response.status).toBe(200);
//         expect(response.body._id).toBe(moviesList[0]._id);        
//     });
//    test("Update Movie", async () => {
//     const updatedData = { title: "Inception Updated", year: 2010 };
//     const response = await request(app)
//         .put("/movie/" + moviesList[0]._id)
//         .send(updatedData);
//     expect(response.status).toBe(200);
//     expect(response.body.title).toBe(updatedData.title);
//     // חשוב מאוד: לא לעשות moviesList[0]._id = response.body._id כאן!
// });
// test("Delete Movie", async () => {
//     // שלב 1: מחיקה
//     const deleteRes = await request(app).delete("/movie/" + moviesList[0]._id);
//     expect(deleteRes.status).toBe(200);
//     // שלב 2: בדיקה שנמחק
//     const getRes = await request(app).get("/movie/" + moviesList[0]._id);
//     expect(getRes.status).toBe(404);
// });
// });
//# sourceMappingURL=movies.test.js.map