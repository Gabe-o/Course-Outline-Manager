
import { auth } from "../firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import express from 'express';
import db from '../DBConnect.js';
import jwt from "jsonwebtoken";

const userRouter = express.Router();

// Adds that given user to db
userRouter.post("", (req, res) => {
    // For preventing user creation without a role
    if (req.body.admin || req.body.instructor || req.body.reviewer) {
        db.query("INSERT INTO user VALUES (?, ?, ?, ?);",
            [
                req.body.userID,
                req.body.admin,
                req.body.instructor,
                req.body.reviewer
            ],
            (err, data) => {
                if (err) {
                    res.status(400).json(err);
                }
                else {
                    res.json(data);
                }
            })
    }
    else {
        res.status(400).json("User must have a role");
    }
});

// Gets user information with the given username
userRouter.get("/:userID", (req, res) => {
    db.query("SELECT * FROM user WHERE userID=?;", [req.params.userID], (err, data) => {
        if (err) {
            res.status(400).json(err);
        }
        else if (data.length === 0) {
            res.status(404).json("userID: '" + req.params.userID + "' not found");
        }
        else {
            res.json(data);
        }
    })
});

userRouter.post("/register", (req, res) => {

    if (req.body.email.split("@")[1] != "uwo.ca") {
        res.status(403).json("This email domain is forbidden, you must register with uwo.ca");
        return;
    }

    createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
        .then(() => {
            res.status(200).json("We have sent an email verification to " + req.body.email);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
});

userRouter.post("/login", (req, res) => {
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
        .then(() => {
            res.status(200).json(jwt.sign({ email: req.body.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' }));
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

export default userRouter;