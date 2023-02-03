const express = require('express');
const db = require('../DBConnect.js');

const userRouter = express.Router();

// Adds that given user to db
userRouter.post("", (req, res) => {
    if (req.body.admin || req.body.instructor || req.body.reviewer) {
        db.query("INSERT INTO user VALUES (?, ?, ?, ?);",
            [
                req.body.userID,
                req.body.admin,
                req.body.instructor,
                req.body.reviewer
            ],
            (err, data) => {
                if (err) {
                    res.status(400).json(err);
                }
                else {
                    res.json(data);
                }
            })
    }
    else {
        res.status(400).json("User must have a role");
    }
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