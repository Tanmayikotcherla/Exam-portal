const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastScore: { type: Number, default: null }, // store last exam score
  lastExamDetails: {
    totalQuestions: { type: Number, default: 0 },
    correctAnswers: { type: Number, default: 0 },
    wrongAnswers: { type: Number, default: 0 },
    answers: [{
      questionId: String,
      question: String,
      userAnswer: String,
      correctAnswer: String,
      isCorrect: Boolean
    }]
  }
});

module.exports = mongoose.model("User", UserSchema);
