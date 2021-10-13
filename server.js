if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.set("layout", "layouts/layout");

// app.set("public", __dirname + "/public");

app.use(methodOverride("_method"));
app.use(expressLayouts);

app.use(express.static(__dirname + "/public"));
// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
// app.use(bodyParser.json())


app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json());

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to mongoose"));

const indexRouter = require("./routes/index");
app.use("/", indexRouter);
const subscribersRoute = require("./routes/subscribers");
app.use("/subscribers", subscribersRoute);

const authorRouter = require("./routes/authors");
app.use("/authors", authorRouter);

const bookRouter = require("./routes/books");
app.use("/books", bookRouter);

app.listen(process.env.PORT || 3000, () => console.log("server started"));
