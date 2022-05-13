const express = require("express");
const swaggerUi = require("swagger-ui-express");
const controllers = require("../app/controllers");
const swaggerDocument = require("../app/swagger.json");
const redoc = require('redoc-express');

const apiRouter = express.Router();

apiRouter.get('/docs/swagger.json', (req, res) => {
  res.sendFile(swaggerDocument, { root: '.' });
});

//API Redoc
apiRouter.get('/docs',
redoc({
  title: 'API Docs',
  specUrl: '/docs/swagger.json'
}));

//API Swagger
apiRouter.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API authentication 
apiRouter.post("/api/v1/register", controllers.api.v1.authController.register);
apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);

//API History
// apiRouter.get("/api/v1/history", controllers.api.v1.authController.login);

// API Users Table
apiRouter.get("/api/v1/user", controllers.api.v1.profileController.list);
apiRouter.post("/api/v1/user", controllers.api.v1.profileController.create);
apiRouter.put("/api/v1/user/:id", controllers.api.v1.profileController.update);
apiRouter.get("/api/v1/user/:id", controllers.api.v1.profileController.show);
apiRouter.get("/api/v1/users", controllers.api.v1.profileController.findAlllist);
apiRouter.delete(
  "/api/v1/user/:id",
  controllers.api.v1.profileController.destroy
);


// API Cars Table
apiRouter.get("/api/v1/car", controllers.api.v1.carController.list);
apiRouter.post("/api/v1/car", controllers.api.v1.carController.create);
apiRouter.put("/api/v1/car/:id", controllers.api.v1.carController.update);
apiRouter.get("/api/v1/car/:id", controllers.api.v1.carController.show);
apiRouter.get("/api/v1/cars", controllers.api.v1.carController.findAlllist);
apiRouter.delete(
  "/api/v1/car/:id",
  controllers.api.v1.carController.destroy
);


/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
