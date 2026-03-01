const router = require("express").Router();
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

router.get("/summary", auth, async (req,res)=>{
  const data = await Expense.aggregate([
    {$match:{userId:req.user.id}},
    {$group:{_id:"$category", total:{$sum:"$amount"}}}
  ]);
  res.json(data);
});

module.exports = router;
