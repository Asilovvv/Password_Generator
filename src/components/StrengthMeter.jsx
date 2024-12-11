import React from "react";

const StrengthMeter = ({ password }) => {
  const calculateStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[\W_]/.test(password)) score += 1;

    if (score <= 2) return { label: "Weak", color: "#e74c3c" };
    if (score <= 4) return { label: "Moderate", color: "#f1c40f" };
    return { label: "Strong", color: "#2ecc71" };
  };

  const { label, color } = calculateStrength(password);

  return (
    <div className="strength-meter">
      <div
        className="strength-bar"
        style={{
          backgroundColor: color,
          width: `${(label === "Weak" ? 33 : label === "Moderate" ? 66 : 100)}%`,
          height: "10px",
          borderRadius: "5px",
        }}
      ></div>
      <p style={{ color, marginTop: "10px", fontWeight: "bold" }}>{label}</p>
    </div>
  );
};

export default StrengthMeter;
