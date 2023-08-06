const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./db/Database");
const cloudinary = require("cloudinary");

// handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error(`Erro: ${err.message}`);
  console.log("Shutting down the server for handling uncaught exceptions");
});

// config cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// config
if (process.env.NODE_ENV !== "production") {
  dotenv.config({
    path: "config/.env",
  });
}

// connect database
connectDatabase();

// create server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.error(`Shutting down the server for ${err.message}`);
  console.log("Shutting down the server for unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
