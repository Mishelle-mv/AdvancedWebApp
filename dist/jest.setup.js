"use strict";
const dotEnv = require('dotenv');
dotEnv.config({ path: '.env.test' });
require("dotenv").config({ path: ".env.test" });
console.log("JEST SETUP DATABASE_URL =", process.env.DATABASE_URL);
//# sourceMappingURL=jest.setup.js.map