import express from 'express';
import jwt from "jsonwebtoken";
import 'dotenv/config';

const allUsersRouter = express.Router();

allUsersRouter.use((req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return next();
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

allUsersRouter.get("/role", (req, res) => {
    res.status(200).json(req.user);
});

export default allUsersRouter;