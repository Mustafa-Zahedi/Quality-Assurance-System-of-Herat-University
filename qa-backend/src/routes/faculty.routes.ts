import { Router } from "express";
import { FacultyService } from "../services";
import { authGuard } from "../middlewares/passport";
import { check, query } from "express-validator";

const facultyService = new FacultyService();

const routes = Router();

routes.get("/", authGuard, facultyService.all);

routes.post(
  "/",
  [
    check("fa_name").isString().not().isEmpty(),
    check("en_name").isString().not().isEmpty(),
    check("date").isDate(),
  ],
  authGuard,
  facultyService.create
);

routes.put(
  "/",
  authGuard,
  [check("id").notEmpty().withMessage("id is required!")],
  facultyService.updateFaculty
);

routes.delete(
  "/",
  authGuard,
  [check("id").notEmpty().withMessage("id is required!")],
  facultyService.deleteFaculty
);

routes.get(
  "/find-one",
  authGuard,
  [query("id").notEmpty().withMessage("id is required!")],
  facultyService.findOne
);

export { routes };
/**
 *🛒 /api/faculty
 * GET [protected] => returns all faculty
 *
 * GET [protected]
 *    query {page : number , pageSize : number}
 *    returns paginated data.
 *
 * POST [protected]
 *   body {fa_name : string , en_name : string , date : date}
 *
 * PUT [protected]
 *   body {id : number , fa_name : string , en_name : string , date : date}
 *   returns {updated : boolean}
 *
 * DELETE [protected]
 *   body {id : number}
 *   returns { deleted : boolean }
 *
 * 🛒/api/faculty/find-one
 *    query {id : number}
 *    returns one faculty.
 */
