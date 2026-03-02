import {useState} from "react";
import axios from "axios";

export default function Login(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const login = async()=>{
    const r = await axios.post("http://localhost:5000/api/auth/login",{email,password});
    localStorage.setItem("token", r.data.token);
    location.href="/dash";
  };

  return (
    <div className="card">
      <h2>Expense Tracker</h2>
      <input placeholder="email" onChange={e=>setEmail(e.target.value)}/>
      <input placeholder="password" type="password" onChange={e=>setPassword(e.target.value)}/>
      <button onClick={login}>Login</button>
    </div>
  );
}
