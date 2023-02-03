const express = require('express');
const db = require('../DBConnect.js');

const outlineRouter = express.Router();

// Get outlines that match query
outlineRouter.get("", (req, res) => {
    // Get all outlines when query is undefined
    if (!req.query.userID && !req.query.courseID) {
        db.query("SELECT * FROM outline;", (err, data) => {
            if (err) {
                res.status(400).json(err);
            }
            else {
                res.json(data);
            }
        })
    }
    // Get outlines by courseID or userID
    else {
        db.query(`SELECT * 
        FROM outline 
        LEFT JOIN user_course_assignment ON outline.courseID=user_course_assignment.courseID 
        WHERE user_course_assignment.userID LIKE ? AND outline.courseID LIKE ?;`,
            [
                "%" + (req.query.userID != undefined ? req.query.userID : "") + "%",
                "%" + (req.query.courseID != undefined ? req.query.courseID : "") + "%"
            ],
            (err, data) => {
                if (err) {
                    res.status(400).json(err);
                }
                else if (data.length === 0) {
                    res.status(404).json("userID: '" + req.query.userID + "', courseID: '" + req.query.courseID + "' not found");
                }
                else {
                    res.json(data);
                }
            })

    }

});

// Add a new outline
outlineRouter.post("", (req, res) => {
    db.query(`INSERT INTO outline (dateApproved, status, courseID, term) VALUES (?, ?, ?, ?);`,
        [
            req.body.dateApproved,
            req.body.status,
            req.body.courseID,
            req.body.term
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

// Update outline with given id
outlineRouter.post("/:id", (req, res) => {
    db.query(`UPDATE outline SET dateApproved=?, status=? WHERE outlineID=?;`,
        [
            req.body.dateApproved,
            req.body.status,
            req.params.id
        ],
        (err, data) => {
            if (err) {
                res.status(400).json(err);
            }
            else if (data.info.includes("Rows matched: 0")) {
                res.status(404).json("outlineID: '" + req.params.id + "' not found");
            }
            else {
                res.json(data);
            }
        })
});

module.exports = outlineRouter;