import jwt from "jsonwebtoken";

export const generateToken = (id: string, role: string): string => {
  const secret = process.env.JWT_SECRET as string;
  return jwt.sign({ id, role }, secret, { expiresIn: "7d" });
};
