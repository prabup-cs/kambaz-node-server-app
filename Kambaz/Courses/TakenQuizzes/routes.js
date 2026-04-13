import * as dao from "./dao.js";

export default function TakenQuizRoutes(app) {
  const saveAttempt = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const attempt = await dao.saveAttempt({
      ...req.body,
      user: currentUser._id,
    });
    res.json(attempt);
  };

  const findAttempt = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const attempt = await dao.findAttempt(req.params.quizId, currentUser._id);
    res.json(attempt);
  };

  app.post("/api/quizzes/:quizId/attempts", saveAttempt);
  app.get("/api/quizzes/:quizId/attempts", findAttempt);
}
