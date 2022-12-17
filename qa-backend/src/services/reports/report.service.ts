import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { getMyRepository } from "../../data-source";
import {
  DepartmentEntity,
  EvaluationFormEntity,
  RESPONSES,
} from "../../entities";

export class ReportService {
  async departmentReport(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // faculty , department , year, semester type
    const body = req.body;
    const formModel = getMyRepository(EvaluationFormEntity);
    let evlForms: string | any[];

    evlForms = await formModel.find({
      where: {
        department: { id: +body.departmentId }, //
        year: +body.year,
        semester_type: body.semester_type,
        // semester: +body.semester,
      },
      relations: ["answers", "teacher", "subject"],
    });

    if (evlForms.length === 0) {
      return res.status(404).json({ data: null, message: "no form" });
    }

    const departmentModel = getMyRepository(DepartmentEntity);
    const department = await departmentModel.findOne({
      where: { id: body.departmentId },
      relations: ["faculty"],
    });

    const purifySubject = reportOfEachSubjectForTeacher(evlForms);

    const groupedSubjectForEachTeacher = Object.values(
      purifySubject.reduce((acc, current) => {
        acc[current.teacherId] = acc[current.teacherId] ?? [];
        acc[current.teacherId].push(current);
        return acc;
      }, {})
    );

    const purifyTeacher = groupedSubjectForEachTeacher.map((teacher) =>
      reportOfEachTeacherForDep(teacher as any[])
    );

    const purifyTeachersOfDep = totalReport(purifyTeacher);
    return res.status(200).json({
      nodata: "department",
      total: purifyTeachersOfDep,
      teachersRep: purifyTeacher,
      department: department,
      year: body.year,
      semester_type: body.semester_type,
      totalSubject: purifySubject.length,
    });
  }

  async teacherReport(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // faculty , department , year, semester type
    const body = req.body;
    const formModel = getMyRepository(EvaluationFormEntity);
    let evlForm;
    evlForm = await formModel.find({
      where: {
        teacher: {
          id: body.teacherId,
        },
        year: +body.year,
        semester_type: body.semester_type,
      },
      relations: ["answers", "teacher", "subject"],
    });

    // for all teachers in department
    if (evlForm.length === 0) {
      return res.status(404).json({ data: null, n: "no data" });
    }

    const departmentModel = getMyRepository(DepartmentEntity);
    const department = await departmentModel.findOne({
      where: { id: body.departmentId },
      relations: ["faculty"],
    });

    // find the maximum score
    const purifySubject = reportOfEachSubjectForTeacher(evlForm);
    const purifyTeachers = reportOfEachTeacherForDep(purifySubject);
    return res.status(200).json({
      nodata: "teacherReport",
      purifyTeachers,
      purifySubject,
      answers: evlForm,
      department,
      year: body.year,
      semester_type: body.semester_type,
    });
  }

  async reportEach(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // faculty , department , year, semester type, teacherId
    const body = req.body;
    const formModel = getMyRepository(EvaluationFormEntity);
    let answers;
    answers = await formModel.find({
      where: {
        teacher: {
          id: body.teacherId,
        },
        department: { id: +body.departmentId }, //
        year: +body.year,
        semester_type: body.type,
      },
      relations: ["answers", "teacher", "subject"],
    });
    // for there were no form
    if (answers.length === 0) {
      return res.status(200).json({ data: null });
    }
    // TODO: get average for each question
    const numberOfForms = answers?.length;
    const sumOfEachAnswerForQuestion = findSumOfAnswersForEachForm(answers);
    const finalResult = getFinalAverageForEachQuestion(
      sumOfEachAnswerForQuestion,
      numberOfForms === 1
        ? sumOfEachAnswerForQuestion?.totalParticipant
        : numberOfForms + sumOfEachAnswerForQuestion?.totalParticipant
    );
    return res.status(200).json(finalResult);
  }
}

function getPureData(forms: any[]) {
  // const => [{teacherId : 1 , subjectId : 2 , sum : 450 , numberOfSibject : 2} ]
  const all = [];
  forms.map((form) => {
    let tempSum = 0;

    let numberOfQuestions;
    form.answers.map((response) => {
      const pure = Object.values(response.response);
      pure.forEach((score) => {
        tempSum += Number(score);
      });
      numberOfQuestions = pure.length;
    });
    let subs = form.answers?.length;
    if (subs > 0) {
      all.push({
        teacherId: form.teacher.id,
        subjectId: form.subject.id,
        sum: tempSum,
        subscribers: subs,
        // maximu: Object.values(form.answers[0]?.response).length * 5,
        average: getAverage(tempSum, subs),
        percent:
          (getAverage(tempSum, subs) * 100) /
          (numberOfQuestions * RESPONSES.VERY_HEIGH),
      });
    }
  });
  return all;
}

function reportOfEachSubjectForTeacher(forms: any[]) {
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
        teacher: form.teacher,
        teacherId: form.teacher.id,
        subject: form.subject,
        subjectId: form.subject.id,
        sum: tempSum,
        subscribers: subs,
        average: tempSum / subs,
        percent: tempPercent / subs,
      });
    }
  });
  return all;
}

function getAverage(sum: number, numbers: number) {
  return +(sum / numbers).toFixed(2);
}

function getLastValue(data: any[]) {
  const temp = {};

  data.map((item) => {
    if (temp[item.teacherId]) {
      temp[item.teacherId] = {
        ...temp[item.teacherId],
        average: temp[item.teacherId]["average"] + item.average,
        subscribers: temp[item.teacherId]["subscribers"] + item.subscribers,
        sum: temp[item.teacherId]["sum"] + item.sum,
        percent: item.average / (100 / item.subscribers / 5),
      };
    } else {
      temp[item.teacherId] = item;
    }
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

function reportOfEachTeacherForDep(data: any[]) {
  const temp = {
    average: 0,
    percent: 0,
    subscribers: 0,
    teacherId: 0,
    teacher: {},
  };

  data.map((item) => {
    temp["teacher"] = item.teacher;
    temp["teacherId"] = item.teacherId;
    temp["average"] += +(item.average / data.length);
    temp["percent"] += +(item.percent / data.length);
    temp["subscribers"] += +item.subscribers;
  });

  return temp;
}
//* Helpers for each questions
function findSumOfAnswersForEachForm(data: any[]) {
  const stack = { totalParticipant: 0 };
  data.map((form) => {
    //! each form block-01
    form.answers.map((response, index) => {
      // all answers of each participant
      const temp = response.response;
      for (const questionNumber in temp) {
        if (stack[questionNumber]) {
          stack[questionNumber] += temp[questionNumber];
        } else {
          stack[questionNumber] = temp[questionNumber];
        }
      }
      stack["totalParticipant"] += 1;
    });
    //! endblock 01
  });
  /**
   * returns
   * { questionId1 : 10 , questionId2 : 4 , questionId3 : 9 , ... totalFormParticipant : 14}
   */
  return stack;
}

function getFinalAverageForEachQuestion(
  data: Record<string, any>,
  sumOfFormsAndParticipant: number
) {
  delete data["totalParticipant"];
  const temp = {};
  for (const questionId in data) {
    temp[questionId] = Math.round(data[questionId] / sumOfFormsAndParticipant);
  }
  return temp;
}
