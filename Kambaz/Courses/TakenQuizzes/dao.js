import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const saveAttempt = (attempt) =>
  model.findOneAndUpdate(
    { quiz: attempt.quiz, user: attempt.user },
    { ...attempt, _id: attempt._id || uuidv4() },
    { upsert: true, new: true },
  );

export const findAttempt = (quizId, userId) =>
  model.findOne({ quiz: quizId, user: userId });
