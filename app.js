const express = require("express");
const router = require("./src/routers/index");
const recognize = require("./src/routers/recognize");

// swaggerUI
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

// middleware
const app = express();

const port = 3000;

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Tesseract API",
            description: "Tesseract 5 API",
            contact: {
                name: "aestech",
            },
            servers: ["http://localhost:3000"],
        },
    },
    apis: ["app.js"],
};

app.use(express.json());

app.use("/api", router);

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));


app.get("/", (req, res) => {
    res.send("Hello World! My Api");
});

app.use("/recognize", recognize);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
