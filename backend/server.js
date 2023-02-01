const express = require('express');
const cors = require("cors");

const userRouter = require("./routes/userRouter");
const outlineRouter = require("./routes/outlineRouter");

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

app.get("/test", (req, res) => {
    res.json("Got Request");
});

app.listen(9000, () => {
    console.log("Listening on port 9000");
});