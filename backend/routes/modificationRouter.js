import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../DBConnect.js';

const modificationRouter = express.Router();

modificationRouter.use((req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        res.status(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json("Invalid token");
        }
        else {
            req.user = decoded;
            next();
        }
    });
});

// Add a change to an outline in db
modificationRouter.post("", (req, res) => {
    db.query(`INSERT INTO modification (dateTime, section, content, comment, outlineID, authorID) VALUES (?, ?, ?, ?, ?, ?);`,
        [
            req.body.dateTime,
            req.body.section,
            req.body.content,
            req.body.comment,
            req.body.outlineID,
            req.user.email.split("@")[0]
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

// Get all changes for an outline
modificationRouter.get("", (req, res) => {
    db.query(`SELECT * FROM modification WHERE outlineID=?;`,
        [
            req.query.outlineID
        ],
        (err, data) => {
            if (err) {
                res.status(400).json(err);
            }
            else if (data.length === 0) {
                res.status(404).json("outlineID: '" + req.query.outlineID + "' not found");
            }
            else {
                res.json(data);
            }
        })
});

export default modificationRouter;