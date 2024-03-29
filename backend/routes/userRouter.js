
import { auth } from "../firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import express from 'express';
import 'dotenv/config';
import db from '../DBConnect.js';
import jwt from "jsonwebtoken";

const userRouter = express.Router();

userRouter.get("/instructors", (req, res) => {
    db.query("SELECT * FROM user WHERE instructor=1;", (err, data) => {
        if (err) {
            res.status(400).json(err);
        }
        else if (data.length === 0) {
            res.status(404).json("No instructors found!");
        }
        else {
            res.json(data);
        }
    });
});

userRouter.get("/reviewers", (req, res) => {
    db.query("SELECT * FROM user WHERE reviewer=1;", (err, data) => {
        if (err) {
            res.status(400).json(err);
        }
        else if (data.length === 0) {
            res.status(404).json("No reviewers found!");
        }
        else {
            res.json(data);
        }
    });
});

userRouter.post("/register", (req, res) => {

    if (req.body.email.split("@")[1] != "uwo.ca") {
        res.status(403).json("This email domain is forbidden, you must register with uwo.ca");
        return;
    }

    if (req.body.administrator || req.body.instructor || req.body.reviewer) {
        db.query("INSERT INTO user VALUES (?, ?, ?, ?, ?);", [req.body.email.split("@")[0], req.body.email, req.body.administrator, req.body.instructor, req.body.reviewer], (err, data) => {
            if (err) {
                res.status(400).json(err);
                return;
            }
            else {
                createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
                    .then(() => {
                        res.status(200).json("The email " + req.body.email + " has succesfully been registered");
                        return;
                    })
                    .catch((err) => {
                        db.query("DELETE FROM user WHERE userID=?", [req.body.email.split("@")[0]], (err2) => {
                            if (err2) {
                                res.status(500).json("This account is not functional, contact your administrator");
                            }
                            else {
                                res.status(500).json(err);
                            }
                        });
                    });
            }
        });
    }
    else {
        res.status(401).json("User must have a role");
        return;
    }
});


userRouter.post("/login", (req, res) => {
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
        .then(() => {
            db.query("SELECT * FROM user WHERE userID=?;", [req.body.email.split("@")[0]], (err, data) => {
                if (err) {
                    res.status(500).json(err);
                }
                else if (data.length === 0) {
                    res.status(404).json("userID: " + req.body.email.split("@")[0] + " not found");
                }
                else {
                    res.status(200).json(jwt.sign({ email: req.body.email, instructor: data[0].instructor, administrator: data[0].admin, reviewer: data[0].reviewer }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' }));
                }
            });

        })
        .catch(err => {
            res.status(401).json(err);
        })
});

export default userRouter;