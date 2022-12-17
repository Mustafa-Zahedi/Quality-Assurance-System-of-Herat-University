import { Response, Request } from "express";
import { getMyRepository } from "../data-source";
import { AnswerEntity } from "../entities";
import { validationResult } from "express-validator";

export class AnswerService {
  async addAnswers(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;
    // formId
    // json {qId : 1 , qId2 : 4}
    const answerModel = getMyRepository(AnswerEntity);
    try {
      const result = await answerModel.save({
        evaluationFormId: body.formId,
        response: body.response,
      });
      return res.status(200).json({ answerId: result.id });
    } catch (err) {
      console.error("ERR while saving answers", err);
    }
  }

  async all(req: Request, res: Response) {
    const answerModel = getMyRepository(AnswerEntity);
    const all = await answerModel.find({
      relations: ["evaluationForm", "evaluationForm.teacher"],
    });
    return res.status(200).json(all);
  }
}
