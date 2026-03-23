import QuizzesDao from "./dao.js";
export default function QuizRoutes(app, db) {
  const dao = QuizzesDao(db);
  const findQuizzesForCourse = (req, res) => {
    const { courseId } = req.params;
    const quizzes = dao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  };
  const createQuiz = (req, res) => {
    const { courseId } = req.params;
    const newQuiz = dao.createQuiz({ ...req.body, course: courseId });
    res.json(newQuiz);
  };
  const updateQuiz = (req, res) => {
    const { quizId } = req.params;
    const updatedQuiz = dao.updateQuiz(quizId, req.body);
    res.json(updatedQuiz);
  };
  const deleteQuiz = (req, res) => {
    const { quizId } = req.params;
    dao.deleteQuiz(quizId);
    res.sendStatus(200);
  };
  const findQuizById = (req, res) => {
    const { quizId } = req.params;
    const quiz = dao.findQuizById(quizId);
    res.json(quiz);
  };
  app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
  app.post("/api/courses/:courseId/quizzes", createQuiz);
  app.put("/api/quizzes/:quizId", updateQuiz);
  app.delete("/api/quizzes/:quizId", deleteQuiz);
  app.get("/api/quizzes/:quizId", findQuizById);
}
