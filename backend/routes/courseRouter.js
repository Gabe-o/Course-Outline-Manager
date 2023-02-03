const express = require('express');
const db = require('../DBConnect.js');

const courseRouter = express.Router();

courseRouter.post("", (req, res) => {
    db.query(`INSERT INTO course (courseID, courseName, courseReviewer) VALUES (?, ?, ?);`,
        [
            req.body.courseID,
            req.body.courseName,
            req.body.courseReviewer
        ],
        (err, data) => {
            if (err) {
                res.status(400).json(err);
            }
            else {
                res.json(data);
            }
        })
});

courseRouter.get("/:courseID", (req, res) => {
    db.query(`SELECT * FROM course WHERE courseID=?`, [req.params.courseID], (err, data) => {
        if (err) {
            res.status(400).json(err);
        }
        else if (data.length === 0) {
            res.status(404).json("courseID: '" + req.params.courseID + "' not found");
        }
        else {
            res.json(data);
        }
    })
});

module.exports = courseRouter;