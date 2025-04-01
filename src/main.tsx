import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { SortContextProvider } from "./context/index.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <SortContextProvider>
            <App />
        </SortContextProvider>
    </StrictMode>
);
