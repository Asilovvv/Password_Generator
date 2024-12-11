import React, { useState } from "react";
import PasswordHistory from "./PasswordHistory";
import StrengthMeter from "./StrengthMeter";

const PasswordGenerator = () => {
  const [length, setLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

    let characterPool = "";
    if (includeUppercase) characterPool += uppercase;
    if (includeLowercase) characterPool += lowercase;
    if (includeNumbers) characterPool += numbers;
    if (includeSymbols) characterPool += symbols;

    if (!characterPool) {
      alert("Please select at least one character type.");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      generatedPassword += characterPool[randomIndex];
    }
    setPassword(generatedPassword);

    // Add to history
    setHistory((prevHistory) => [
      ...prevHistory,
      {
        id: Date.now(),
        password: generatedPassword,
        date: new Date(), // Add current date
      },
    ]);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  const deleteFromHistory = (id) => {
    setHistory((prevHistory) => prevHistory.filter((entry) => entry.id !== id));
  };

  return (
    <div className="password-generator">
      <h2>Password Generator</h2>
      <label>
        Password Length:
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(+e.target.value)}
          min="4"
          max="128"
        />
      </label>
      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          Include Uppercase
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
          Include Lowercase
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          Include Numbers
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          Include Symbols
        </label>
      </div>
      <button onClick={generatePassword}>Generate Password</button>
      <button onClick={copyToClipboard} disabled={!password}>
        Copy to Clipboard
      </button>
      <button onClick={() => setShowHistory(!showHistory)}>
        {showHistory ? "Hide History" : "View History"}
      </button>

      <div className="password-display">
        <strong>Generated Password:</strong>
        <div className="password-container">
          {password || "No password generated yet."}
        </div>
      </div>

      <StrengthMeter password={password} />

      {showHistory && (
        <PasswordHistory history={history} deleteFromHistory={deleteFromHistory} />
      )}
    </div>
  );
};

export default PasswordGenerator;
