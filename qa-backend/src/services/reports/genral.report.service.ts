import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { getMyRepository } from "../../data-source";
import { EvaluationFormEntity, RESPONSES } from "../../entities";

export class Report {
  async Report(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;

    const formModel = getMyRepository(EvaluationFormEntity);
    let evlForms: string | any[];

    evlForms = await formModel.find({
      where: {
        year: +body.year,
        semester_type: body.semester_type,
      },
      relations: ["answers", "department", "faculty"],
    });

    if (evlForms.length === 0) {
      return res.status(404).json({ data: null, message: "no form" });
    }
    let totalSubscribers = evlForms.map((form) => form.answers).flat().length;

    const reportsByForm = reportOfEachDepartment(evlForms);
    const groupedDeps = groupByFaculty(reportsByForm);
    const purifyFaculty = groupedDeps.map((dep) =>
      reportOfEachDep(dep as any[])
    );
    const toalReports = totalReport(purifyFaculty);
    return res.status(200).json({
      total: toalReports,
      purifyFaculty,
      totalSubscribers,
      year: body.year,
      semester_type: body.semester_type,
    });
  }
}
// Group Departments by faculty
function groupByFaculty(forms: any[]) {
  const groupedDeps = forms.reduce((acc, current) => {
    acc[current.faculty.id] = acc[current.faculty.id] ?? [];
    acc[current.faculty.id].push(current);
    return acc;
  }, {});
  return Object.values(groupedDeps);
}

function reportOfEachDepartment(forms: any[]) {
  const all = [];

  forms.map((form) => {
    let tempSum = 0;
    let tempPercent = 0;
    let numberOfQuestions = 0;
    form.answers.map((response) => {
      const pure = Object.values(response.response);
      let temp = 0;
      pure.forEach((score) => {
        temp += Number(score);
      });

      numberOfQuestions = pure.length;
      tempSum += +getAverage(temp, numberOfQuestions);
      let fromPercent =
        (temp * 100) / (numberOfQuestions * RESPONSES.VERY_HEIGH);
      tempPercent += fromPercent;
    });
    let subs = form.answers?.length;

    if (subs > 0) {
      all.push({
        faculty: form.faculty,
        department: form.department,
        sum: tempSum,
        subscribers: subs,
        average: tempSum / subs,
        percent: tempPercent / subs,
      });
    }
  });
  return all;
}

function reportOfEachDep(data: any[]) {
  const temp = {
    average: 0,
    percent: 0,
    subscribers: 0,
    faculty: {},
  };

  data.map((item) => {
    temp["faculty"] = item.faculty;
    temp["average"] += +(item.average / data.length);
    temp["percent"] += +(item.percent / data.length);
    temp["subscribers"] += +item.subscribers;
  });

  return temp;
}

function totalReport(data: any[]) {
  const temp = { average: 0, percent: 0, subscribers: 0 };

  data.map((item) => {
    temp["average"] += +(item.average / data.length);
    temp["percent"] += +(item.percent / data.length);
    temp["subscribers"] += +item.subscribers;
  });

  return temp;
}

function getAverage(sum: number, numbers: number) {
  return +(sum / numbers).toFixed(2);
}
