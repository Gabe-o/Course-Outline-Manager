import express from 'express';
import jwt from "jsonwebtoken";

const allUsersRouter = express.Router();

allUsersRouter.use((req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decoded);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json("Invalid token");
    }
});

allUsersRouter.get("/role", (req, res) => {
    console.log(req.user);
    res.status(200).json(req.user);
});

export default allUsersRouter;