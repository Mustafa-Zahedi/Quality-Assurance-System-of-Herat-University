import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { getMyRepository } from "../../data-source";
import { EvaluationFormEntity, RESPONSES } from "../../entities";

export class SubjectReportService {
  async subjectReport(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;

    const formModel = getMyRepository(EvaluationFormEntity);
    let evlForms;

    evlForms = await formModel.findOne({
      where: {
        teacher: { id: +body.teacherId },
        subject: { id: +body.subjectId },
        year: +body.year,
        semester: +body.semester,
        semester_type: body.semester_type,
      },
      relations: ["answers", "department", "teacher", "faculty", "subject"],
    });

    if (!evlForms) {
      return res.status(404).json({ data: null, message: "no form" });
    } else {
      const result = sumResponse(evlForms.answers);
      return res.status(200).json({
        result,
        formId: evlForms.id,
        year: body.year,
        teacher: evlForms.teacher,
        subject: evlForms.subject,
        semester: evlForms.semester,
        semester_type: body.semester_type,
      });
    }
  }
}

function sumResponse(answers: any[]) {
  const temp = {};

  answers.map((form) => {
    for (const [key, value] of Object.entries(form.response)) {
      temp[key]
        ? ((temp[key]["points"] += +value),
          temp[key]["subs"]++,
          (temp[key]["percent"] =
            (temp[key]["points"] * 100) /
            (RESPONSES.VERY_HEIGH * temp[key]["subs"])))
        : (temp[key] = {
            points: +value,
            subs: 1,
            percent: (+value * 100) / RESPONSES.VERY_HEIGH,
          });
    }
  });
  // console.log("temp", temp);

  return temp;
}

// ---------------------------------------------------------------------
// async subjectReport(req: Request, res: Response) {
//   console.log("faculty", req.body);

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   const body = req.body;

//   const formModel = getMyRepository(EvaluationFormEntity);
//   let evlForms: string | any[];

//   evlForms = await formModel.find({
//     where: {
//       faculty: { id: +body.facultyId },
//       year: +body.year,
//       semester_type: body.semester_type,
//     },
//     relations: ["answers", "department", "faculty"],
//   });

//   console.log("eval form", evlForms);

//   if (evlForms.length === 0) {
//     return res.status(404).json({ data: null, message: "no form" });
//   }
// }
