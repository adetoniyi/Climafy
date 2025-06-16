import User, { IUser } from "../models/user.model";
import bcrypt from "bcryptjs";

export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<IUser> => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  return await user.save();
};

export const loginUser = async (
  email: string,
  password: string
): Promise<IUser> => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return user;
};

export const getUserPreferences = async (userId: string) => {
  const user = await User.findById(userId).select("preferences");
  if (!user) throw new Error("User not found");
  return user.preferences;
};

export const updateUserPreferences = async (
  userId: string,
  preferences: any
) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.preferences = { ...user.preferences, ...preferences };
  await user.save();
  return user.preferences;
};
