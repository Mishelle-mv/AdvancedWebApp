import dotEnv from 'dotenv';
dotEnv.config({ path: '.env.test' });


//נראה לי שלא צריך את זה
// require("dotenv").config({ path: ".env.test" });
// console.log("JEST SETUP DATABASE_URL =", process.env.DATABASE_URL);
