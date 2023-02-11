import express from 'express';
import db from '../DBConnect.js';

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
                res.status(400).json(err);
            }
            else {
                res.json(data);
            }
        })
});

export default userCourseRouter;