// src/utils/auth.js

export function registerUser({ name, email, password }) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  if (users.some((u) => u.email === email)) {
    return { success: false, message: "Email already exists!" };
  }

  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));
  return { success: true, message: "Registered successfully!" };
}

export function loginUser({ email, password }) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const match = users.find((u) => u.email === email && u.password === password);
  if (!match) {
    return { success: false, message: "Invalid email or password" };
  }

  localStorage.setItem("authUser", JSON.stringify(match));
  return { success: true, message: "Login successful!" };
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("authUser") || "null");
}

export function logoutUser() {
  localStorage.removeItem("authUser");
}
