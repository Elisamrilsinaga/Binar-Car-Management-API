const {
   DB_USERNAME = "postgres",
   DB_PASSWORD = "samril28",
   DB_HOST = "localhost",
   DB_NAME = "db_car",
 } = process.env;
 
 module.exports = {
   development: {
     username: DB_USERNAME,
     password: DB_PASSWORD,
     database: `${DB_NAME}_dev`,
     host: DB_HOST,
     dialect: "postgres",
   },
   test: {
     username: DB_USERNAME,
     password: DB_PASSWORD,
     database: `${DB_NAME}_testN`,
     host: DB_HOST,
     dialect: "postgres",
   },
   production: {
     username: DB_USERNAME,
     password: DB_PASSWORD,
     database: `${DB_NAME}_product`,
     host: DB_HOST,
     dialect: "postgres",
   },
 };