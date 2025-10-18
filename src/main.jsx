import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import router from "./routes/Router";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      {/* Application routes goes here */}
      <RouterProvider router={router} />
      {/* Toaster */}
      <Toaster />
    </AuthProvider>
  </StrictMode>
);
