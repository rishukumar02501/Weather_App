import axios from "axios";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);

      // simulate delay (3 seconds)
      setTimeout(async () => {
        const res = await axios.post("https://weather-app-fikk.onrender.com/login", {
          email,
          password,
        });

        setLoading(false);

        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          window.location = "/dashboard";
        } else {
          alert(res.data.message);
        }
      }, 3000);

    } catch (err) {
      setLoading(false);
      alert("Login failed");
    }
  };


  return (
    <div style={styles.container}>
      {loading ? (
        <div style={styles.loaderContainer}>
          <div style={styles.spinner}></div>
          <p style={{marginTop:"10px"}}>Logging you in...</p>
        </div>
      ) : (
        <div style={styles.card}>
          <h2 style={{marginBottom:"20px"}}>🔐 Welcome Back</h2>

          <input
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            style={styles.input}
          />

          <button onClick={login} style={styles.button}>
            Login
          </button>

          <p
            onClick={() => (window.location = "/register")}
            style={styles.link}
          >
            Create new account
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
  },

  card: {
    background: "rgba(255, 255, 255, 0.15)",
    padding: "30px",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: "300px",
    animation: "fadeIn 0.8s ease",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    background: "#ff7e5f",
    color: "#fff",
    cursor: "pointer",
    marginTop: "10px",
  },

  link: {
    marginTop: "15px",
    cursor: "pointer",
    fontSize: "14px",
    textDecoration: "underline",
  },

  loaderContainer: {
    textAlign: "center",
  },

  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid rgba(255,255,255,0.3)",
    borderTop: "5px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  }
};

export default Login;