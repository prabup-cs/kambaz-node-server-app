import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const findQuizzesForCourse = (courseId) =>
  model.find({ course: courseId });
export const createQuiz = (quiz) => model.create({ ...quiz, _id: uuidv4() });
export const updateQuiz = (quizId, quizUpdates) =>
  model.updateOne({ _id: quizId }, { $set: quizUpdates });
export const deleteQuiz = (quizId) => model.deleteOne({ _id: quizId });
export const findQuizById = (quizId) => model.findById(quizId);
