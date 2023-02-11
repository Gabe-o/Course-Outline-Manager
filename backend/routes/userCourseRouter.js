import express from 'express';
import db from '../DBConnect.js';
import jwt from 'jsonwebtoken';

const userCourseRouter = express.Router();

userCourseRouter.use((req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
});
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