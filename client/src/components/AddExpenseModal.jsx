import { useState } from "react";

export default function AddExpenseModal({ onSave, onClose }) {

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  const submit = () => {
    if (!title || !amount || !category || !date) return;

    onSave({
      title,
      amount: Number(amount),
      category,
      date
    });
  };

  return (
    <div className="modal-bg">
      <div className="modal">

        <h2>Add Expense</h2>

        <input
          placeholder="Expense title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
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

        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={submit}>
            Save
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
