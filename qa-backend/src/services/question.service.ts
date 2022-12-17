import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { getMyRepository } from "../data-source";
import { QuestionEntity } from "../entities";

export class QuestionService {
  async addQuestion(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const questionModel = getMyRepository(QuestionEntity);

    const status = req.body?.status;
    await questionModel.upsert(
      {
        text: req.body.text,
        status: status !== "undefined" ? status : true,
      },
      ["id"]
    );
    return res.status(200).json({ add: true });
  }

  async delete(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const questionModel = getMyRepository(QuestionEntity);
    const del = await questionModel.delete({
      id: +req.query?.id,
    });
    return res.status(200).json({ deleted: del.affected > 0 });
  }

  async update(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const questionModel = getMyRepository(QuestionEntity);
    const up = await questionModel.update(
      {
        id: req.body?.id,
      },
      {
        ...req?.body,
      }
    );
    return res.status(200).json({ updated: up.affected > 0 });
  }

  async get(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const questionModel = getMyRepository(QuestionEntity);
    //* get all active question
    const result = await questionModel.find({});
    return res.status(200).json(result);
  }

  async getActive(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const questionModel = getMyRepository(QuestionEntity);
    //* get all active question
    const result = await questionModel.find({
      where: {
        status: true,
      },
    });
    return res.status(200).json(result);
  }
}
