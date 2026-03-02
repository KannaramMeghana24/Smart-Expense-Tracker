import { useState } from "react";

export default function EditExpenseModal({ expense, onSave, onClose }) {

  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);

  const submit = () => {
    if (!title || !amount || !category) return;

    onSave({
      ...expense,
      title,
      amount: Number(amount),
      category
    });
  };

  return (
    <div className="modal-bg">
      <div className="modal">

        <h2>Edit Expense</h2>

        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Bills</option>
          <option>Health</option>
          <option>Education</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={submit}>
            Update
          </button>

          <button
            style={{ background: "#ef4444", color: "white" }}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
