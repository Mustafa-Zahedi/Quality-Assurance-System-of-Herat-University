import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { getMyRepository } from "../data-source";
import { DepartmentEntity } from "../entities";
import { logger } from "../lib";

export class DepartmentService {
  async all(req: Request, res: Response) {
    const departmentModel = getMyRepository(DepartmentEntity);
    let data;
    // check if request wants paginated data
    if (+req.query?.page >= 1) {
      let skip: number = +req?.query?.page * +req?.query?.pageSize;
      skip = skip - +req?.query?.pageSize;
      data = await departmentModel.find({
        skip: skip,
        take: skip === 0 ? +req?.query?.pageSize : skip,
        relations: ["faculty"],
      });
    } else {
      data = await departmentModel.find({
        relations: ["faculty"],
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
    const departmentModel = getMyRepository(DepartmentEntity);
    try {
      // find
      const findOne = await departmentModel.find({
        where: [{ en_name: inputData.en_name }, { fa_name: inputData.fa_name }],
      });
      if (findOne.length > 0) {
        return res
          .status(400)
          .json({ msg: `Duplicate name for department ${inputData.en_name}` });
      }
      const create: DepartmentEntity = await departmentModel.save({
        fa_name: inputData.fa_name,
        en_name: inputData.en_name,
        date: inputData.date,
        facultyId: +inputData.facultyId,
        createdAt: new Date(),
      });
      return res.status(200).json(create);
    } catch (err) {
      logger.error("Error while creating department", err);
      return res
        .status(500)
        .json({ msg: "Server Error occurred see your log." });
    }
  }

  async update(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const departmentModel = getMyRepository(DepartmentEntity);
    const findOne = await departmentModel.update(
      {
        id: +req.body.id,
      },
      {
        ...req.body,
        createdAt: new Date(),
      }
    );

    return res
      .status(findOne.affected > 0 ? 200 : 500)
      .json({ updated: findOne.affected > 0 });
  }

  async delete(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const departmentModel = getMyRepository(DepartmentEntity);
    const deleteOne = await departmentModel.delete({
      id: +req.body.id,
    });
    return res
      .status(deleteOne.affected > 0 ? 200 : 400)
      .json({ deleted: deleteOne.affected > 0 });
  }

  async findOne(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const departmentModel = getMyRepository(DepartmentEntity);
    const find = await departmentModel.findOne({
      where: {
        id: +req.query.id,
      },
      relations: ["faculty"],
    });

    return res.status(200).json(find);
  }

  async findByFaculty(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const departmentModel = getMyRepository(DepartmentEntity);
    //! update 002
    const find = await departmentModel.find({
      where: {
        facultyId: {
          id: +req?.query?.id,
        },
      },
    });

    return res.status(200).json(find);
  }
}
