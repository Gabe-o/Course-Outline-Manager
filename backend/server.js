import express from 'express';
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import outlineRouter from "./routes/outlineRouter.js";
import modificationRouter from "./routes/modificationRouter.js";
import userCourseRouter from "./routes/userCourseRouter.js";
import courseRouter from "./routes/courseRouter.js";
import allUsersRouter from './routes/allUsersRouter.js';

const app = express();

app.use(cors());
app.use(express.json());

// Request Logging
app.use((req, res, next) => {
    console.log('Request: ', req.method, ' \tPath: ', req.url);
    next();
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/outline", outlineRouter);
app.use("/api/modification", modificationRouter);
app.use("/api/userCourse", userCourseRouter);
app.use("/api/course", courseRouter);
app.use("/api/allUsers", allUsersRouter);

app.listen(9000, () => {
    console.log("Listening on port 9000");
});