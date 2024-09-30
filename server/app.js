const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productosRouter = require("./routes/productos");
const clientesRouter = require("./routes/clientes");
const ventasRouter = require("./routes/ventas");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/productos", productosRouter);
app.use("/clientes", clientesRouter);
app.use("/ventas", ventasRouter);

module.exports = app;
