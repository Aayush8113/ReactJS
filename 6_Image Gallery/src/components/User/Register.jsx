import React, { useState } from "react";
import { registerUser } from "../../utils/auth";
import { notify } from "../../utils/notifications";
import "../../style/Auth.css";

export default function Register({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const res = registerUser(form);

    if (!res.success) return notify("error", res.message);

    notify("success", res.message);
    onSuccess();
  };

  return (
    <form className="auth-card" onSubmit={handleSubmit}>
      <h2>Create Account</h2>

      <input
        type="text"
        placeholder="Full Name"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="email"
        placeholder="Email"
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        required
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button className="auth-btn">Register</button>
    </form>
  );
}
