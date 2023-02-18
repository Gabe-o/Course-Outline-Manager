import express from 'express';
import db from '../DBConnect.js';
import jwt from "jsonwebtoken";

const courseRouter = express.Router();

courseRouter.use((req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return next();
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        console.log(decoded);
        console.log("Entered jwt");
        if (err) {
            res.status(401).json("Invalid token");
        }
        else {
            if (decoded.administrator === 1) {
                next();
            }
            else {
                res.status(403).json("Access denied!");
            }
        }

    });

});

// Add a course to db
courseRouter.post("", (req, res) => {
    console.log("Entered");
    db.query("INSERT INTO course (courseID, courseName, courseReviewer, department) VALUES (?, ?, ?, ?);",
        [
            req.body.courseID,
            req.body.courseName,
            req.body.courseReviewer,
            req.body.department
        ],
        (err) => {
            if (err) {
                res.status(400).json(err);
            }
            else {
                res.status(200).json("Succesfully added course!");
            }
        })
});

// Get a course from db by ID
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

courseRouter.get("", (req, res) => {
    db.query("SELECT * FROM course", (err, data) => {
        if (err) {
            res.status(400).json(err);
        }
        else if (data.length === 0) {
            res.status(404).json("No courses found!");
        }
        else {
            res.status(200).json(data);
        }
    })
});

export default courseRouter;