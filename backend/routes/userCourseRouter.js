import express from 'express';
import db from '../DBConnect.js';
import jwt from 'jsonwebtoken';

const userCourseRouter = express.Router();

userCourseRouter.use((req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return next();
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json("Invalid token");
        }

        if (decoded.administrator === 1) {
            next();
        }
        else {
            return res.status(401).json("User is not an administrator");
        }
    });
});

userCourseRouter.post("", (req, res) => {
    console.log("Entered");
    db.query("INSERT INTO user_course_assignment VALUES (?, ?, ?);", [req.body.userID, req.body.courseID, req.body.term], (err) => {
        if (err) {
            res.status(400).json(err);
        }
        else {
            res.json("Succesfully inserted");
        }
    })
});

userCourseRouter.delete("", (req, res) => {
    db.query("DELETE FROM user_course_assignment WHERE userID=? AND courseID=? AND term=?;", [req.body.userID, req.body.courseID, req.body.term], (err) => {
        if (err) {
            res.status(400).json(err);
        }
        else {
            res.json("Succesfully deleted");
        }
    });
});

export default userCourseRouter;