import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import router from "./routes/Router";
import AuthProvider from "./providers/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      {/* Application routes goes here */}
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
