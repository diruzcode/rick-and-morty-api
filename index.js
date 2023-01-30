const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const configSwaggerJsdoc = require("./swagger.config.json");

const app = express();
const port = 3000;
const mainRoute = require("./routes/main");
app.use(cors());

const specs = swaggerJsdoc(configSwaggerJsdoc);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api/v1/rick-and-morty", mainRoute);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
