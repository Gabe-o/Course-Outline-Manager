const express = require('express');
const db = require('../DBConnect.js');

const changeRouter = express.Router();

changeRouter.post("", (req, res) => {
    db.query(`INSERT INTO change (dateTime, section, content, comment, outlineID, authorID) VALUES (?, ?, ?, ?, ?, ?)`,
        [
            req.body.dateTime,
            req.body.section,
            req.body.content,
            req.body.comment,
            req.body.outlineID,
            req.body.authorID
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

module.exports = changeRouter;