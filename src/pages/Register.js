import axios from "axios";
import { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await axios.post("https://weather-app-fikk.onrender.com/register", {
        username,
        email,
        password,
      });

      alert("Registered Successfully");
      window.location = "/";
    } catch (err) {
      alert("Error registering user");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>✨ Create Account</h2>

        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>

        <button onClick={register} style={styles.button}>
          Register 🚀
        </button>

        <p
          onClick={() => (window.location = "/")}
          style={styles.link}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1f4037, #99f2c8)",
    animation: "fadeIn 1s ease-in",
  },

  card: {
    background: "rgba(255, 255, 255, 0.15)",
    padding: "40px",
    borderRadius: "20px",
    backdropFilter: "blur(15px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    textAlign: "center",
    color: "#fff",
    width: "320px",
    animation: "slideUp 0.8s ease",
  },

  title: {
    marginBottom: "25px",
    fontSize: "26px",
    letterSpacing: "1px",
  },

  inputGroup: {
    marginBottom: "15px",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    transition: "0.3s",
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(45deg, #ff7e5f, #feb47b)",
    color: "#fff",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: "bold",
    transition: "0.3s",
  },

  link: {
    marginTop: "15px",
    cursor: "pointer",
    fontSize: "14px",
    textDecoration: "underline",
  },
};

export default Register;