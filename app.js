require("dotenv").config();

const express = require("express");
const app = express();

const errorMiddlewear = require("./middleware/error-handler");
const NotfoundMiddlewear = require("./middleware/not-found");

app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Store Api</h1><a href="/api/v1/products">Product route</a>');
});

app.use(NotfoundMiddlewear);
app.use(errorMiddlewear);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
