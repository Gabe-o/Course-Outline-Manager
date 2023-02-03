const express = require('express');
const db = require('../DBConnect.js');

const userRouter = express.Router();

// Adds that given user to db
userRouter.post("", (req, res) => {
    db.query("INSERT INTO user VALUES (?, ?, ?, ?);",
        [
            req.body.userID,
            req.body.admin,
            req.body.instructor,
            req.body.reviewer
        ],
        (err, data) => {
            if (err) {
                res.json(err);
            }
            else {
                res.json(data);
            }
        })
});

// Gets user information with the given username
userRouter.get("/:id", (req, res) => {
    db.query("SELECT * FROM user WHERE userID=?;", [req.params.userID], (err, data) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
});

module.exports = userRouter;