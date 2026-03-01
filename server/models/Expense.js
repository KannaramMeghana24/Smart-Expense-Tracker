const mongoose = require("mongoose");

module.exports = mongoose.model("Expense", {
  userId: String,
  title: String,
  amount: Number,
  category: String,
  date: Date
});
