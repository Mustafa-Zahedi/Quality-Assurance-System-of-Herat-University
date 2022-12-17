import express from "express";
import {
  authRoutes,
  departmentRoutes,
  evaluationRoutes,
  facultyRoutes,
  teacherRoutes,
  questionRoutes,
  AnswerRoutes,
  subjectRoutes,
  ReportRoutes,
} from ".";

const api = express.Router();

api.use("/api/auth", authRoutes);
api.use("/api/faculty", facultyRoutes);
api.use("/api/department", departmentRoutes);
api.use("/api/teacher", teacherRoutes);
api.use("/api/subject", subjectRoutes);
api.use("/api/form", evaluationRoutes);
api.use("/api/question", questionRoutes);
api.use("/api/answer", AnswerRoutes);
api.use("/api/report", ReportRoutes);

export { api };
