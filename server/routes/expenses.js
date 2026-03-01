const router = require("express").Router();
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

// Create expense
router.post("/", auth, async (req, res) => {
  const e = await Expense.create({
    ...req.body,
    userId: req.user.id
  });
  res.json(e);
});

// Get all expenses
router.get("/", auth, async (req, res) => {
  const list = await Expense
    .find({ userId: req.user.id })
    .sort({ date: -1 });

  res.json(list);
});

// Update expense
router.put("/:id", auth, async (req, res) => {
  const updated = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// Delete expense
router.delete("/:id", auth, async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "deleted" });
});

module.exports = router;
