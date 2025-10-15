# React + Firebase + Tailwind (Vite)

What this contains:
- React app (Vite)
- Tailwind CSS setup
- Firebase Auth (email/password)
- Basic Firestore CRUD (notes collection)
- Routing: /login, /register, /home (protected)

**How to use**

1. Install dependencies:
   ```bash
   npm install
   ```
2. Add your Firebase config in `src/firebase.js` (replace placeholders).
3. Run dev server:
   ```bash
   npm run dev
   ```

Files of interest:
- `src/firebase.js` — initialize Firebase, replace with your config
- `src/pages/Login.jsx`, `src/pages/Register.jsx`, `src/pages/Home.jsx`
- `src/App.jsx`, `src/main.jsx`
