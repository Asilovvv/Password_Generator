import bcrypt from "bcryptjs";

const savePassword = () => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const history = JSON.parse(localStorage.getItem("passwordHistory")) || [];
  history.push({ hashedPassword, date: new Date().toISOString() });
  localStorage.setItem("passwordHistory", JSON.stringify(history));

  alert("Password saved securely!");
};

// Add a button to save passwords
<button onClick={savePassword} disabled={!password}>
  Save Password
</button>


const getPasswordHistory = () => {
    const history = JSON.parse(localStorage.getItem("passwordHistory")) || [];
    return history.map((entry, index) => (
      <div key={index}>
        <p>
          <strong>Saved on:</strong> {new Date(entry.date).toLocaleString()}
        </p>
        <p>
          <strong>Hashed Password:</strong> {entry.hashedPassword}
        </p>
      </div>
    ));
  };
  