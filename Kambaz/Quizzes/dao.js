import { v4 as uuidv4 } from "uuid";
export default function QuizzesDao(db) {
  const findQuizzesForCourse = (courseId) =>
    db.quizzes.filter((q) => q.course === courseId);
  const createQuiz = (quiz) => {
    const newQuiz = { ...quiz, _id: uuidv4() };
    db.quizzes = [...db.quizzes, newQuiz];
    return newQuiz;
  };
  const updateQuiz = (quizId, quizUpdates) => {
    const quiz = db.quizzes.find((q) => q._id === quizId);
    Object.assign(quiz, quizUpdates);
    return quiz;
  };
  const deleteQuiz = (quizId) => {
    db.quizzes = db.quizzes.filter((q) => q._id !== quizId);
  };
  const findQuizById = (quizId) => db.quizzes.find((q) => q._id === quizId);
  return {
    findQuizzesForCourse,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    findQuizById,
  };
}
