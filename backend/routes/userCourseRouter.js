const express = require('express');
const db = require('../DBConnect.js');

const userCourseRouter = express.Router();

// Adds that given user to db
userCourseRouter.post("", (req, res) => {
    db.query("INSERT INTO user_course_assignment VALUES (?, ?);",
        [
            req.body.userID,
            req.body.courseID
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

module.exports = userCourseRouter;