import { Router } from "express";
import { ReportService } from "../services";
import { body } from "express-validator";
import { authGuard } from "../middlewares/passport";
import { SubjectReportService } from "../services/reports/subject.report..service";
import { Report } from "../services/reports/genral.report.service";

const reportService = new ReportService();
const subjectReportService = new SubjectReportService();
const report = new Report();

const routes = Router();

routes.post(
  "/",
  [body("year").notEmpty(), body("semester_type").notEmpty()],
  authGuard,
  report.Report
);

routes.post(
  "/subject",
  [
    body("semester").notEmpty(),
    body("teacherId").notEmpty(),
    body("subjectId").notEmpty(),
    body("year").notEmpty(),
    body("semester_type").notEmpty(),
  ],
  authGuard,
  subjectReportService.subjectReport
);

routes.post(
  "/department",
  [
    body("departmentId").notEmpty(),
    body("year").notEmpty(),
    body("semester_type").notEmpty(),
  ],
  authGuard,
  reportService.departmentReport
);

routes.post(
  "/each",
  [
    body("teacherId").notEmpty(),
    body("departmentId").notEmpty(),
    body("year").notEmpty(),
    body("semester_type").notEmpty(),
  ],
  authGuard,
  reportService.departmentReport
);

routes.post(
  "/teacher",
  [
    body("teacherId").notEmpty(),
    body("year").notEmpty(),
    body("semester_type").notEmpty(),
  ],
  authGuard,
  reportService.teacherReport
);

routes.post(
  "/each",
  [
    body("teacherId").notEmpty(),
    body("departmentId").notEmpty(),
    body("year").notEmpty(),
    body("type").notEmpty(),
    body("subjectId").notEmpty(),
  ],
  authGuard,
  reportService.reportEach
);

export { routes };
