const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users"); //"./routes/users"
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

dotenv.config();
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Mongo Connected")
});
app.use("/images", express.static(path.join(__dirname, "public/images")));


console.log(mongoose.connection.readyState);
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (res, req) => {
    try {
        //return res.status(200).json("file uploaded");
    }
    catch (err) {
        console.log(err);
    }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);


app.get("/", (req, res) => {
    res.send("Welcome to homepage")
})
app.listen(process.env.PORT || 8800, () => {
    console.log("Backend Server initiated")
})