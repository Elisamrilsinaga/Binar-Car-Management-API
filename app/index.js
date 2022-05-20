const express = require("express");
// const swaggerUi = require("swagger-ui-express");
// const morgan = require("morgan");
const router = require("../config/router");
// const redoc = require("redoc-express");
// const swaggerDocument = require("./swagger.json");
const app = express();

/** Install request logger */
// app.use(morgan("dev"));

/** Install JSON request parser */
app.use(express.json());

/** Install Router */
app.use(router);

module.exports = app;

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

