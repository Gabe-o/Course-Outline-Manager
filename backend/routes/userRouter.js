
import { auth } from "../firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import express from 'express';
import db from '../DBConnect.js';
import jwt from "jsonwebtoken";

const userRouter = express.Router();

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
            if (req.body.admin || req.body.instructor || req.body.reviewer) {
                db.query("INSERT INTO user VALUES (?, ?, ?, ?, ?);", [req.body.email.split("@")[0], req.body.email, req.body.administrator, req.body.instructor, req.body.reviewer], (err, data) => {
                    if (err) {
                        res.status(500).json(err);
                        return;
                    }
                    else {
                        res.status(200).json("The email " + req.body.email + " has succesfully been registered");
                        return;
                    }
                });
            }
            else {
                res.status(401).json("User must have a role");
                return;
            }

        })
        .catch((err) => {
            res.status(500).json(err);
        })
});

userRouter.post("/login", (req, res) => {
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
        .then(() => {
            res.status(200).json(jwt.sign({ email: req.body.email, instructor: req.body.instructor, administrator: req.body.administrator, reviewer: req.body.reviewer }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' }));
        })
        .catch(err => {
            res.status(401).json(err);
        })
});

export default userRouter;