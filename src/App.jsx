import React, { useState } from "react";
import PasswordGenerator from "./components/PasswordGenerator";
import "./App.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <header>
        <h1>Password Generator</h1>
        <button className="toggle-mode" onClick={toggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>
      <main>
        <PasswordGenerator />
      </main>
    </div>
  );
};

export default App;
