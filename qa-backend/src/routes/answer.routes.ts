import { Router } from "express";
import { AnswerService } from "../services";
import { body } from "express-validator";
import { authGuard } from "../middlewares/passport";

const answerService = new AnswerService();

const routes = Router();
routes.post("/add", [body("formId").notEmpty()], answerService.addAnswers);
routes.get("/", authGuard, answerService.all);
export { routes };
