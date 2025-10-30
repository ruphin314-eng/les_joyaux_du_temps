import "./index.css";
import App from "./App.jsx";
import React from "react";
import ShopContextProvider from "./context/ShopContext.jsx";
import { ClerkProvider, RedirectToSignIn } from "@clerk/clerk-react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
     <ShopContextProvider> 
      <BrowserRouter>
          <App />
      </BrowserRouter>
     </ShopContextProvider> 
    </ClerkProvider>
  </React.StrictMode>
);
