import mongoose from "mongoose";

const takenQuizSchema = new mongoose.Schema(
  {
    _id: String,
    quiz: { type: String, ref: "QuizModel" },
    user: { type: String, ref: "UserModel" },
    answers: { type: Object },
    score: Number,
    dateTaken: { type: Date, default: Date.now },
  },
  { collection: "takenQuizzes" },
);

export default takenQuizSchema;
