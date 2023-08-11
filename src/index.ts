import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./db/connect";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRoute from "./routes/users/users";
import orderRoute from "./routes/orders/orders";
import addressRoute from "./routes/address/address";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/address", addressRoute);

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Hello, worlds!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
