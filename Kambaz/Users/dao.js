import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const createUser = (user) => {
  const { _id, ...userWithoutId } = user;
  const newUser = { ...userWithoutId, _id: uuidv4() };
  return model.create(newUser);
};
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) => model.findOne({ username });
export const findUserByCredentials = (username, password) =>
  model.findOne({ username, password });
export const deleteUser = (userId) => model.findByIdAndDelete(userId);
export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });

export const findUsersByRole = (role) => model.find({ role });

export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i");
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};
