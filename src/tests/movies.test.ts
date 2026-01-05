import request from "supertest";
import initApp from "../index";
import moviesModel from "../model/moviesModel";
import { Express } from "express";

let app : Express ;

beforeAll(async () => {
    console.log("TEST DATABASE_URL:", process.env.DATABASE_URL);
    app = await initApp();
    await moviesModel.deleteMany({});
});

afterAll(() => {
    console.log("afterAll");
   // done();
});

type MovieData = { title: string; year: number; _id?: string };

const moviesList: MovieData[] = [
    { title: "Inception", year: 2010},
    { title: "The Matrix", year: 1999},
    { title: "Interstellar", year: 2014}     
];

describe("Sample Test Suite", () => {
    test("Sample Test Case", async () => {
        const respponse = await request(app).get("/movie");
        expect(respponse.status).toBe(200);
        expect(respponse.body).toEqual([]);

    });

    // test("Create Movie", async () => {
    //     for (const movie of moviesList) {
    //         const response = await request(app).post("/movie").send(movie);
    //         expect(response.status).toBe(201);
    //         expect(response.body.title).toBe(movie.title);
    //         expect(response.body.year).toBe(movie.year);
    //     }
    // });

    test("Test Create Movie", async () => {
    const response = await request(app).post("/movie").send(moviesList[0]);
    expect(response.status).toBe(201);
    
    // השורה הקריטית: שמירת ה-ID שנוצר בתוך המערך שלנו
    moviesList[0]._id = response.body._id; 
});

    test("Get All Movies", async () => {
        const response = await request(app).get("/movie");
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(moviesList.length);
    });

    test("Get Movie by year", async () => {
        const response = await request(app).get("/movie?year="+ moviesList[0].year);
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].title).toBe(moviesList[0].title);
        moviesList[0]._id = response.body[0]._id;
    });

    //get movie by id
    test("Get Movie by ID", async () => {
        const response = await request(app).get("/movie/" + moviesList[0]._id);
        expect(response.status).toBe(200);
        expect(response.body.title).toBe(moviesList[0].title);
        expect(response.body.year).toBe(moviesList[0].year);
        expect(response.body._id).toBe(moviesList[0]._id);        
    });

    test("Update Movie", async () => {
        moviesList[0].title = "Inception Updated";
        //const movieId = moviesList[0]._id;
        const response = await request(app)
        .put("/movie/" + moviesList[0]._id)
        .send(moviesList[0]);
        expect(response.status).toBe(200);
        expect(response.body.title).toBe(moviesList[0].title);
        expect(response.body.year).toBe(moviesList[0].year);
        expect(response.body._id).toBe(moviesList[0]._id);
    });

    // test("Delete Movie", async () => {
    //     const response = await request(app).delete("/movie/" + moviesList[0]._id);
    //     expect(response.status).toBe(200);
    //     expect(response.body._id).toBe(moviesList[0]._id); 
       
    //     const getResponse = await request(app).get("/movie/" + moviesList[0]._id);
    //     expect(getResponse.status).toBe(404);
    // });

test("Delete Movie", async () => {
    // שלב 1: מחיקה. וודאי ש-moviesList[0]._id הוגדר בטסט ה-POST!
    const deleteRes = await request(app).delete("/movie/" + moviesList[0]._id);
    
    // אם כאן את מקבלת 500 או 400, סימן ש-moviesList[0]._id לא הגיע מה-POST
    expect(deleteRes.status).toBe(200);

    // שלב 2: ניסיון שליפה חוזר - עכשיו חייב לחזור 404
    const getResponse = await request(app).get("/movie/" + moviesList[0]._id);
    expect(getResponse.status).toBe(404);
});

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