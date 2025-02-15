import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";  // ✅ Import App without wrapping it in BrowserRouter
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);  // ✅ Render App directly
