const express = require("express");
const router = require("./src/routers/index");
const mongoose = require("./src/database/db");
const dotenv = require("dotenv");

// swaggerUI
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

// middleware
const app = express();
dotenv.config();

const port = process.env.PORT || 8080;
//MONGO DB CONNECTION
require("./src/database/db");

app.use(express.json()); //Used to parse JSON bodies
app.use(express.json({ limit: "50mb" })); //Used to parse JSON bodies
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 100000 }));

app.use("/api", router);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (req, res) => {
  res.send("Hello World! My Api");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
