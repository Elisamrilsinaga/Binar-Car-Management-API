const express = require("express");
const swaggerUi = require("swagger-ui-express");
const controllers = require("../app/controllers");
const swaggerDocument = require("../app/swagger.json");
// const redoc = require('redoc-express');

const apiRouter = express.Router();
apiRouter.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// apiRouter.get('/docs/swagger.json', (req, res) => {
//   res.sendFile(swaggerDocument, { root: '.' });
// });

//API Redoc
// apiRouter.get('/docs',
// redoc({
//   title: 'API Docs',
//   specUrl: '/docs/swagger.json'
// }));

// API authentication 
// apiRouter.post("/api/v1/register", controllers.api.v1.authController.register);
// apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);

//API History
// apiRouter.get("/api/v1/history", controllers.api.v1.authController.login);

//login and register
apiRouter.post("/api/v1/user/register", controllers.api.v1.profileController.create);
apiRouter.post("/api/v1/user/login", controllers.api.v1.profileController.login);

// API Users Table
apiRouter.post("/api/v1/user/create", controllers.api.v1.profileController.authorize, controllers.api.v1.profileController.create1);
apiRouter.get("/api/v1/user", controllers.api.v1.profileController.authorize, controllers.api.v1.profileController.list);
apiRouter.put("/api/v1/user/:id", controllers.api.v1.profileController.authorize, controllers.api.v1.profileController.update);
apiRouter.post("/api/v1/user/:id", controllers.api.v1.profileController.authorize, controllers.api.v1.profileController.updaterole);
apiRouter.get("/api/v1/user/profile", controllers.api.v1.profileController.authorize, controllers.api.v1.profileController.profile);
apiRouter.get("/api/v1/user/:id", controllers.api.v1.profileController.authorize, controllers.api.v1.profileController.show);
apiRouter.delete(
  "/api/v1/user/:id",
  controllers.api.v1.profileController.authorize, controllers.api.v1.profileController.destroy
);


// API Cars Table
apiRouter.get("/api/v1/cars", controllers.api.v1.profileController.authorize, controllers.api.v1.carController.list);
apiRouter.get("/api/v1/cars/history", controllers.api.v1.profileController.authorize, controllers.api.v1.carController.history);
apiRouter.post("/api/v1/cars", controllers.api.v1.profileController.authorize, controllers.api.v1.carController.create);
apiRouter.put("/api/v1/cars/:id", controllers.api.v1.profileController.authorize, controllers.api.v1.carController.update);
apiRouter.get("/api/v1/cars/:id", controllers.api.v1.profileController.authorize, controllers.api.v1.carController.show);
apiRouter.delete(
  "/api/v1/cars/:id",
  controllers.api.v1.profileController.authorize, controllers.api.v1.carController.destroy
);


apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
