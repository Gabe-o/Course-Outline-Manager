const express = require('express');
const cors = require("cors");

const userRouter = require("./routes/userRouter");
const outlineRouter = require("./routes/outlineRouter");
const changeRouter = require("./routes/changeRouter");
const userCourseRouter = require("./routes/userCourseRouter");
const courseRouter = require('./routes/courseRouter');

const app = express();

app.use(cors());
app.use(express.json());

// Request Logging
app.use((req, res, next) => {
    console.log('Request: ', req.method, ' \tPath: ', req.url);
    next();
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/outline", outlineRouter);
app.use("/api/change", changeRouter);
app.use("/api/userCourse", userCourseRouter);
app.use("/api/course", courseRouter);

app.listen(9000, () => {
    console.log("Listening on port 9000");
});