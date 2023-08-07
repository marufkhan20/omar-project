const express = require("express");
const app = express();
const dotenv = require("dotenv");
const ErrorHandler = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

// import routes
const user = require("./controllers/userController");
const shop = require("./controllers/shopController");
const product = require("./controllers/productController");
const event = require("./controllers/eventController");
const coupon = require("./controllers/couponCodeController");
const payment = require("./controllers/paymentController");
const order = require("./controllers/orderController");
const message = require("./controllers/messageController");
const conversation = require("./controllers/conversationController");
const withdraw = require("./controllers/withdrawController");

app.use(express.json({ limit: "20mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://omar-project.vercel.app"],
    credentials: true,
  })
);
// app.use("/", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

// config
if (process.env.NODE_ENV !== "production") {
  dotenv.config({
    path: "config/.env",
  });
}

// use routes
app.get("/test", (req, res) => {
  res.status(200).json({
    message: "Test message",
  });
});
app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/order", order);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/withdraw", withdraw);
app.use("/", (req, res) => {
  res.send("Hello World");
});

// It's for error handling
app.use(ErrorHandler);

module.exports = app;
