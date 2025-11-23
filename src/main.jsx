import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import router from "./routes/Router";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import "./Main.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./providers/ThemeProvider";

// Query Client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Auth provider */}
    <AuthProvider>
      {/* Query Client Provider */}
      <QueryClientProvider client={queryClient}>
        {/* Theme Provider */}
        <ThemeProvider>
          {/* Application routes goes here */}
          <RouterProvider router={router} />
        </ThemeProvider>
        {/* Toaster */}
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
