import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const saveAttempt = async (attempt) => {
  const existing = await model.findOne({
    quiz: attempt.quiz,
    user: attempt.user,
  });
  if (existing) {
    return model.findOneAndUpdate(
      { quiz: attempt.quiz, user: attempt.user },
      {
        ...attempt,
        attemptCount: (existing.attemptCount ?? 1) + 1,
        dateTaken: new Date(),
      },
      { new: true },
    );
  }
  return model.create({
    ...attempt,
    _id: attempt._id || uuidv4(),
    attemptCount: 1,
    dateTaken: new Date(),
  });
};

export const findAttempt = (quizId, userId) =>
  model.findOne({ quiz: quizId, user: userId });
