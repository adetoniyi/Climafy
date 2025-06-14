import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/user.service";
import { generateToken } from "../utils/token.util";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;
    const user = await registerUser(username, email, password);
    const token = generateToken(user._id.toString(), user.role);
    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    const token = generateToken(user._id.toString(), user.role);
    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};
