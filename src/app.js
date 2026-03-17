import express from "express";
import cors from "cors";

import passport from "./config/passport.js";


import authRoutes from "./routes/auth.routes.js";
import noticeRoutes from "./routes/notice.routes.js";
import timetableRoutes from "./routes/timetable.routes.js";
import subjectRoutes from "./routes/subject.routes.js";
import facultyRoutes from "./routes/faculty.routes.js";
import materialRoutes from "./routes/material.routes.js";
import internshipRoutes from "./routes/internship.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(cors({
  origin: "http://127.0.0.1:5500", 
  credentials: true
}))
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(errorMiddleware);



app.use(passport.initialize());



export default app;