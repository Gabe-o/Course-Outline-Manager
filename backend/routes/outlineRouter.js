const express = require('express');
const db = require('../DBConnect.js');

const outlineRouter = express.Router();

// Get all outlines
outlineRouter.get("", (req, res) => {
    db.query("SELECT * FROM outline;", (err, data) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
});

// Get outlines that match query
outlineRouter.get("", (req, res) => {
    db.query(`SELECT * 
    FROM outline
    JOIN user_outline_assignment ON userID=userID
    WHERE userID LIKE ? AND courseID LIKE ?;`,
        [
            "%" + req.query.user + "%",
            "%" + req.query.course + "%"
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
                res.json(err);
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
                res.json(err);
            }
            else {
                res.json(data);
            }
        })
});

module.exports = outlineRouter;