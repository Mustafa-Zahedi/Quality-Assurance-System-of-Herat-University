import { Request, Response } from "express";
import { UserEntity } from "../entities";
import { getMyRepository } from "../data-source";
import { isHashValid, generateToken, hashData } from "../helpers";
import { logger } from "../lib";
const { validationResult } = require("express-validator");

export class UserService {
  async login(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    // find the user from db
    const userModel = getMyRepository(UserEntity);
    const findUser: UserEntity = await userModel.findOne({
      where: {
        userName: username,
      },
      relations: ["faculty"],
    });
    // if not found throw an error 400
    if (!findUser) {
      return res.status(400).json({ msg: "Wrong Email or Password!" });
    }
    // compare password
    const passwordCompared = await isHashValid(password, findUser.password);

    if (!passwordCompared) {
      return res.status(400).json({ msg: "Wrong Email or Password!" });
    }

    // if user is block

    if (findUser.status === "block") {
      return res.status(400).json({ msg: "This user has been blocked!" });
    }
    const token = generateToken({
      id: findUser.id,
      level: findUser.is_super_admin,
      username: findUser.userName,
      faculty: findUser.faculty,
    });
    delete findUser.password;
    return res.status(200).json({ ...findUser, accessToken: token });
  }

  async register(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;
    // find the user from db
    const userModel = getMyRepository(UserEntity);
    const findUser = await userModel.findOneBy({
      userName: body.username,
    });
    // if not found throw an error 400
    if (findUser) {
      return res.status(400).json({ msg: "This username already taken!" });
    }
    const passwordHashed = await hashData(body.password);
    try {
      const create = await userModel.save({
        name: body.name,
        userName: body.username,
        createdAt: new Date(),
        password: passwordHashed,
        faculty: +body.faculty,
        date: body.date || new Date(),
        gender: body.gender,
        phone: body.phone,
      });
      const token = generateToken({
        id: create.id,
        level: create.is_super_admin,
        username: create.userName,
      });
      delete create.password;
      return res.status(200).json({ ...create, accessToken: token });
    } catch (err) {
      logger.error("Error happened while registering user.", err);
      return res.status(500).json({ msg: "This faculty already had a user." });
    }
  }

  async users(req: Request, res: Response) {
    const userModel = getMyRepository(UserEntity);
    const all = await userModel.find({
      relations: ["faculty"],
      select: [
        "id",
        "name",
        "userName",
        "is_super_admin",
        "phone",
        "status",
        "gender",
        "createdAt",
      ],
    });
    return res.status(200).json(all);
  }

  async updateUser(req: RequestWithUser, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const isSuperAdmin = req.user?.user?.level;
    const body = req.body;
    if (!isSuperAdmin) {
      return res.status(401).json({ msg: "A super admin can update a user." });
    }
    delete body?.password; // if password has been included
    const userModel = getMyRepository(UserEntity);
    try {
      const result = await userModel.update(
        {
          id: +body.id,
        },
        {
          ...body,
        }
      );
      return res.status(200).json({ updated: result.affected > 0 });
    } catch (err) {
      console.error("Error while updating user", err);
      return res.status(500).json({ msg: "Error while updating user" });
    }
  }

  async deleteUser(req: RequestWithUser, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const isSuperAdmin = req.user?.user?.level;
    const body = req.body;
    if (!isSuperAdmin) {
      return res.status(401).json({ msg: "A super admin can update a user." });
    }
    if (+req?.body?.id === req?.user?.user?.id) {
      return res.status(401).json({ msg: "You can not delete yourself." });
    }
    const userModel = getMyRepository(UserEntity);
    try {
      const result = await userModel.delete({
        id: +req.body?.id,
      });
      return res.status(200).json({ deleted: result.affected > 0 });
    } catch (err) {
      console.error("Error while deleting user", err);
      return res.status(500).json({ msg: "Error while deleting user" });
    }
  }
  async get(req: Request, res: Response) {}
}

interface RequestWithUser extends Request {
  user?: Record<string, any>;
}
