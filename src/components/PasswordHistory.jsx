import React from "react";

// Проверка, истёк ли срок действия пароля
const calculateDaysRemaining = (date, days = 90) => {
  const currentDate = new Date();
  const passwordDate = new Date(date);
  const diffInMilliseconds = passwordDate - currentDate + days * 24 * 60 * 60 * 1000;
  const remainingDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
  return remainingDays;
};

const PasswordHistory = ({ history, deleteFromHistory }) => {
  return (
    <div className="history">
      <h3>Password History</h3>
      {history.length === 0 ? (
        <p>No history available.</p>
      ) : (
        history
          .slice()
          .reverse()
          .map((entry) => {
            const remainingDays = calculateDaysRemaining(entry.date);
            const isExpired = remainingDays <= 0;

            return (
              <div key={entry.id} className="history-entry">
                <p>
                  <strong>Date Created:</strong> {new Date(entry.date).toLocaleString()}
                </p>
                <div className="history-password-container">
                  <strong>Password:</strong>
                  <div className="history-password">
                    {entry.password}
                  </div>
                </div>
                {isExpired ? (
                  <p style={{ color: "red", fontWeight: "bold" }}>
                    Password expired! Please generate a new one.
                  </p>
                ) : (
                  <p style={{ color: "green", fontWeight: "bold" }}>
                    Days remaining: {remainingDays}
                  </p>
                )}
                <button
                  className="delete-btn"
                  onClick={() => deleteFromHistory(entry.id)}
                >
                  Delete
                </button>
              </div>
            );
          })
      )}
    </div>
  );
};

export default PasswordHistory;
