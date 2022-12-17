import { Router } from "express";
import { TeacherService } from "../services";
import { authGuard } from "../middlewares/passport";
import { body, check, query } from "express-validator";

const teacherService = new TeacherService();

const routes = Router();
routes.get("/", authGuard, teacherService.all);
routes.post(
  "/",
  [
    check("fa_name").isString().notEmpty(),
    check("en_name").isString().notEmpty(),
    check("date").isDate(),
    check("departmentId").notEmpty(),
  ],
  authGuard,
  teacherService.create
);

routes.put(
  "/",
  [body("id").notEmpty().withMessage("id is required!")],
  authGuard,
  teacherService.update
);

routes.get(
  "/find-one",
  [query("id").notEmpty().withMessage("id is required!")],
  authGuard,
  teacherService.findOne
);

routes.get(
  "/find-by-faculty",
  [query("facultyId").notEmpty().withMessage("facultyId is required!")],
  authGuard,
  teacherService.findTeacherByFaculty
);

routes.delete(
  "/",
  [body("id").notEmpty().withMessage("id is required!")],
  authGuard,
  teacherService.delete
);

export { routes };
