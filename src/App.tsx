import React from "react";
import AppRoutes from "./routes";
import { ThemeProvider } from "./context/themeContext";
import "./App.css";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="App">
        <AppRoutes />
      </div>
    </ThemeProvider>
  );
};

export default App;
