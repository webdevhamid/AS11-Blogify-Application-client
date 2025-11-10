import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import router from "./routes/Router";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import "./Main.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Query Client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Auth provider */}
    <AuthProvider>
      {/* Query Client Provider */}
      <QueryClientProvider client={queryClient}>
        {/* Application routes goes here */}
        <RouterProvider router={router} />
        {/* Toaster */}
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
