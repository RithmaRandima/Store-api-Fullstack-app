require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const producsRouter = require("./routes/products");

const errorMiddlewear = require("./middleware/error-handler");
const NotfoundMiddlewear = require("./middleware/not-found");

app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Store Api</h1><a href="/api/v1/products">Product route</a>');
});

app.use("/api/v1/products", producsRouter);

app.use(NotfoundMiddlewear);
app.use(errorMiddlewear);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
