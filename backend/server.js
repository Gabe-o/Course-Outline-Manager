const express = require('express');
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log('Request: ', req.method, ' \tPath: ', req.url);
    next();
});

app.get("/test", (req, res) => {
    res.json("Got Request");
});
app.listen(9000, () => {
    console.log("Listening on port 9000");
});