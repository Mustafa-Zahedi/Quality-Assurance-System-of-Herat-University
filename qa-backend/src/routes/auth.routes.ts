import { Router } from "express";
import { UserService } from "../services";
import { authGuard } from "../middlewares/passport";
import { body, check } from "express-validator";

const userService = new UserService();
const routes = Router();
routes.post(
  "/login",
  [check("username").not().isEmpty(), check("password").not().isEmpty()],
  userService.login
);

routes.post(
  "/register",
  [
    body("name").notEmpty(),
    body("username").notEmpty(),
    body("password")
      .notEmpty({ ignore_whitespace: true })
      .isLength({ max: 60, min: 6 })
      .withMessage("Password must be at least 6 characters."),
    body("faculty").notEmpty().withMessage("faculty is required!"),
  ],
  authGuard,
  userService.register
);

routes.get("/users", authGuard, userService.users);

routes.put(
  "/update-user",
  [body("id").notEmpty().withMessage("User id is required")],
  authGuard,
  userService.updateUser
);

routes.delete(
  "/delete",
  [body("id").notEmpty().withMessage("User id is required")],
  authGuard,
  userService.deleteUser
);

export { routes };
