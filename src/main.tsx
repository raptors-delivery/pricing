import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AdminProvider } from "./contexts/AdminContext";
import "./index.css";
import { loadFonts } from "./utils/fontLoader";

// Load Arabic fonts
loadFonts();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AdminProvider>
      <App />
    </AdminProvider>
  </StrictMode>
);
