import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

import AddExpenseModal from "../components/AddExpenseModal";
import EditExpenseModal from "../components/EditExpenseModal";

export default function Dashboard() {

  const token = localStorage.getItem("token");
  const headers = { headers: { authorization: token } };

  const [list, setList] = useState([]);
  const [summary, setSummary] = useState([]);

  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // -------- LOAD DATA --------

  const load = async () => {
    const r = await axios.get(
      "http://localhost:5000/api/expenses",
      headers
    );
    setList(r.data);

    const s = await axios.get(
      "http://localhost:5000/api/reports/summary",
      headers
    );
    setSummary(s.data);
  };

  useEffect(() => { load(); }, []);

  // -------- ADD (MODAL) --------

  const addExpense = async (data) => {
    await axios.post(
      "http://localhost:5000/api/expenses",
      data,
      headers
    );
    setShowAdd(false);
    load();
  };

  // -------- UPDATE (MODAL) --------

  const updateExpense = async (e) => {
    await axios.put(
      `http://localhost:5000/api/expenses/${e._id}`,
      e,
      headers
    );
    setEditItem(null);
    load();
  };

  // -------- DELETE --------

  const del = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/expenses/${id}`,
      headers
    );
    load();
  };

  const total = list.reduce((s, x) => s + x.amount, 0);

  return (
    <div className="page">

      <div className="container">

        <h1>Expense Dashboard</h1>

        <button
          className="primary-btn"
          onClick={() => setShowAdd(true)}
        >
          Add Expense
        </button>

        {/* ---------- TABLE ---------- */}

        <table className="expense-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {list.map(e => (
              <tr key={e._id}>
                <td>{e.title}</td>
                <td>₹ {e.amount}</td>
                <td>{e.category}</td>
                <td className="action-cell">

                  <button
                    className="edit-btn"
                    onClick={() => setEditItem(e)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => del(e._id)}
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 style={{ marginTop: 20 }}>
          Total Spend: ₹ {total}
        </h2>

        {/* ---------- CHARTS ---------- */}

        <div className="charts-grid">

          <div className="chart-card">
            <h3>Category Split</h3>
            <PieChart width={320} height={260}>
              <Pie
                data={summary}
                dataKey="total"
                nameKey="_id"
                outerRadius={100}
              >
                {summary.map((_, i) => <Cell key={i} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          <div className="chart-card">
            <h3>Category Totals</h3>
            <BarChart width={360} height={260} data={summary}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" />
            </BarChart>
          </div>

        </div>

      </div>

      {/* ---------- MODALS ---------- */}

      {showAdd && (
        <AddExpenseModal
          onSave={addExpense}
          onClose={() => setShowAdd(false)}
        />
      )}

      {editItem && (
        <EditExpenseModal
          expense={editItem}
          onSave={updateExpense}
          onClose={() => setEditItem(null)}
        />
      )}

    </div>
  );
}
