import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { getMyRepository } from "../data-source";
import { SubjectEntity } from "../entities/subject.entity";
import { logger } from "../lib";

export class SubjectService {
  async all(req: Request, res: Response) {
    const subjectModel = getMyRepository(SubjectEntity);
    let data;
    // check if request wants paginated data
    if (+req.query?.page >= 1) {
      let skip: number = +req?.query?.page * +req?.query?.pageSize;
      skip = skip - +req?.query?.pageSize;
      data = await subjectModel.find({
        skip: skip,
        take: skip === 0 ? +req?.query?.pageSize : skip,
        relations: ["department", "department.faculty"],
      });
    } else {
      data = await subjectModel.find({
        relations: ["department", "department.faculty"],
      });
    }
    return res.status(200).json(data);
  }

  async create(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const inputData = req.body;
    const subjectModel = getMyRepository(SubjectEntity);
    try {
      const create = await subjectModel.save({
        name: inputData.name,
        date: inputData.date,
        departmentId: +inputData.departmentId,
        createdAt: new Date(),
      });
      return res.status(200).json(create);
    } catch (err) {
      logger.error("Error while creating subject", err);
      return res
        .status(500)
        .json({ msg: "Server Error occurred see your log." });
    }
  }

  async findOne(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const subjectModel = getMyRepository(SubjectEntity);
    const find = await subjectModel.find({
      where: {
        id: +req.query.id,
      },
      relations: ["department", "department.faculty"],
    });
    return res.status(200).json(find);
  }
  async delete(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const subjectModel = getMyRepository(SubjectEntity);
    const deleteOne = await subjectModel.delete({
      id: +req.body.id,
    });
    return res.status(200).json({ deleted: deleteOne.affected > 0 });
  }

  async update(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const subjectModel = getMyRepository(SubjectEntity);
      const update = await subjectModel.update(
        {
          id: +req.body.id,
        },
        {
          ...req.body,
          createdAt: new Date(),
        }
      );
      return res.status(200).json({ updated: update.affected > 0 });
    } catch (err) {
      logger.error("Error while creating subject", err);
      return res
        .status(500)
        .json({ msg: "Server Error occurred see your log." });
    }
  }
}
