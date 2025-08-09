const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  stack: { type: String, required: true, enum: ['MERN', 'PYTHON'] },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

module.exports = mongoose.model("Question", QuestionSchema);
