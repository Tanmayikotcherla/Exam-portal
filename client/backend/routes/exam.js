const express = require("express");
const Question = require("../models/Question");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * GET /api/exam/questions/:stack
 * Fetch 10 random questions for chosen stack
 */
router.get("/questions/:stack", auth, async (req, res) => {
  try {
    const stack = req.params.stack.toUpperCase();
    if (!stack || !['MERN', 'PYTHON'].includes(stack)) {
      return res.status(400).json({ message: "Invalid stack choice" });
    }

    const questions = await Question.aggregate([
      { $match: { stack } },
      { $sample: { size: 10 } } // Always give 10 questions
    ]);

    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: "No questions found for this stack" });
    }

    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching questions" });
  }
});

/**
 * POST /api/exam/submit
 * Save score & details for only answered questions
 */
router.post("/submit", auth, async (req, res) => {
  try {
    const { answers, stackChoice } = req.body;

    if (!stackChoice) {
      return res.status(400).json({ success: false, message: "Stack choice is required" });
    }

    const questionIds = Object.keys(answers);
    if (questionIds.length === 0) {
      return res.status(400).json({ success: false, message: "No answers provided" });
    }

    const questions = await Question.find({ _id: { $in: questionIds } });

    let examDetails = {
      stackChoice: stackChoice.toUpperCase(),
      totalQuestions: questions.length,
      correctAnswers: 0,
      wrongAnswers: 0,
      answers: []
    };

    questions.forEach(q => {
      const userAnswer = answers[q._id];
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) examDetails.correctAnswers++;
      else examDetails.wrongAnswers++;

      examDetails.answers.push({
        questionId: q._id,
        question: q.question,
        userAnswer: userAnswer || "Not answered",
        correctAnswer: q.correctAnswer,
        isCorrect
      });
    });

    const score = (examDetails.correctAnswers / examDetails.totalQuestions) * 100;

    await User.findByIdAndUpdate(req.user, {
      lastScore: score,
      lastExamDetails: examDetails
    });

    res.json({
      success: true,
      message: "Exam submitted successfully! Check results in the Results section.",
      score,
      examDetails
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * GET /api/exam/result
 * Get latest result for logged-in user
 */
router.get("/result", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.json({
      score: user.lastScore ?? null,
      examDetails: user.lastExamDetails ?? null
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
