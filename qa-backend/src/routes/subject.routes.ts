import { Router } from "express";
import { SubjectService } from "../services";
import { authGuard } from "../middlewares/passport";
import { check, body, query } from "express-validator";

const subjectService = new SubjectService();

const routes = Router();

routes.get("/", authGuard, subjectService.all);
routes.post(
  "/",
  [check("name").isString().notEmpty(), check("departmentId").notEmpty()],
  authGuard,
  subjectService.create
);

routes.put(
  "/",
  [body("id").notEmpty().withMessage("id is required!")],
  authGuard,
  subjectService.update
);

routes.get(
  "/find-one",
  [query("id").notEmpty().withMessage("id is required!")],
  authGuard,
  subjectService.findOne
);
routes.delete(
  "/",
  [body("id").notEmpty().withMessage("id is required!")],
  authGuard,
  subjectService.delete
);

export { routes };
