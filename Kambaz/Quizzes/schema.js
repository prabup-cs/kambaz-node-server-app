import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  _id: String,
  title: String,
  type: {
    type: String,
    enum: ["multiple_choice", "true_false", "fill_in_blank"],
    default: "multiple_choice",
  },
  points: { type: Number, default: 0 },
  question: String,
  choices: [{ _id: String, text: String, isCorrect: Boolean }],
  correctAnswer: String,
  possibleAnswers: [String],
  blanks: [
    {
      _id: String,
      correctAnswers: [String],
    },
  ],
});

const questionGroupSchema = new mongoose.Schema({
  _id: String,
  name: String,
  pickCount: { type: Number, default: 1 },
  pointsPerQuestion: { type: Number, default: 1 },
  questionIds: [String],
});

const quizSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: String,
    description: String,
    published: { type: Boolean, default: false },
    points: { type: Number, default: 0 },
    dueDate: String,
    availableFrom: String,
    availableUntil: String,
    questions: [questionSchema],
    quizType: { type: String, default: "Graded Quiz" },
    assignmentGroup: { type: String, default: "Quizzes" },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    howManyAttempts: { type: Number, default: 1 },
    showCorrectAnswers: String,
    accessCode: String,
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    groups: [questionGroupSchema],
  },
  { collection: "quizzes" },
);

export default quizSchema;
