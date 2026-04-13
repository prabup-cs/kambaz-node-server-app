import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  const findQuizzesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await dao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  };

  const createQuiz = async (req, res) => {
    const { courseId } = req.params;
    const newQuiz = await dao.createQuiz({ ...req.body, course: courseId });
    res.json(newQuiz);
  };

  const updateQuiz = async (req, res) => {
    const { quizId } = req.params;
    await dao.updateQuiz(quizId, req.body);
    const updatedQuiz = await dao.findQuizById(quizId);
    res.json(updatedQuiz);
  };

  const deleteQuiz = async (req, res) => {
    const { quizId } = req.params;
    await dao.deleteQuiz(quizId);
    res.sendStatus(200);
  };

  const findQuizById = async (req, res) => {
    const { quizId } = req.params;
    const quiz = await dao.findQuizById(quizId);
    res.json(quiz);
  };

  app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
  app.post("/api/courses/:courseId/quizzes", createQuiz);
  app.put("/api/quizzes/:quizId", updateQuiz);
  app.delete("/api/quizzes/:quizId", deleteQuiz);
  app.get("/api/quizzes/:quizId", findQuizById);
}
