import { Response, Request } from "express";
import { TeacherEntity } from "../entities";
import { getMyRepository } from "../data-source";
import { validationResult } from "express-validator";
import { logger } from "../lib";
import { In } from "typeorm";
import { DepartmentEntity } from "../entities/department.entity";

export class TeacherService {
  async all(req: Request, res: Response) {
    const teacherModel = getMyRepository(TeacherEntity);
    let data;
    // check if request wants paginated data
    if (+req.query?.page >= 1) {
      let skip: number = +req?.query?.page * +req?.query?.pageSize;
      skip = skip - +req?.query?.pageSize;
      data = await teacherModel.find({
        skip: skip,
        take: skip === 0 ? +req?.query?.pageSize : skip,
        relations: ["department", "department.faculty"],
      });
    } else {
      data = await teacherModel.find({
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
    const teacherModel = getMyRepository(TeacherEntity);
    try {
      const create = await teacherModel.save({
        fa_name: inputData.fa_name,
        en_name: inputData.en_name,
        date: inputData.date,
        departmentId: +inputData.departmentId,
        gender: inputData.gender,
        state: inputData.state,
        type: inputData.type,
        des: inputData.des,
        createdAt: new Date(),
      });
      return res.status(200).json(create);
    } catch (err) {
      logger.error("Error while creating teacher", err);
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
    const teacherModel = getMyRepository(TeacherEntity);
    const find = await teacherModel.find({
      where: {
        id: +req.query.id,
      },
      relations: ["department", "department.faculty"],
    });
    return res.status(200).json(find);
  }

  async findTeacherByFaculty(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const departmentModel = getMyRepository(DepartmentEntity);
    //! updated 001
    const departments = await departmentModel.find({
      where: {
        facultyId: {
          id: req.query?.facultyId,
        },
      },
      select: ["id"],
    });
    const departmentsArray = departments.map((item) => item?.id);
    const teacherModel = getMyRepository(TeacherEntity);
    const find = await teacherModel.find({
      where: {
        departmentId: {
          id: In(departmentsArray), //! Updated 002
        },
      },
    });
    return res.status(200).json(find);
  }

  async delete(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const teacherModel = getMyRepository(TeacherEntity);
    const deleteOne = await teacherModel.delete({
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
      const teacherModel = getMyRepository(TeacherEntity);
      const update = await teacherModel.update(
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
      logger.error("Error while creating teacher", err);
      return res
        .status(500)
        .json({ msg: "Server Error occurred see your log." });
    }
  }
}
