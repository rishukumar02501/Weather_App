import axios from "axios";
import { useState, useEffect } from "react";

function Dashboard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location = "/";
    }
  }, []);

  const getWeather = async () => {
    try {
      const API_KEY = "77f92130efc0657f1d3b1bcb06af0b47";

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      setWeather(res.data);
    } catch (err) {
      alert("City not found or API issue");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌤 Weather Dashboard</h1>

      <div style={styles.searchBox}>
        <input
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        />
        <button onClick={getWeather} style={styles.button}>
          Search
        </button>
      </div>

      {weather && (
        <div style={styles.card}>
          <h2>{weather.name}</h2>

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />

          <h1 style={{ fontSize: "48px" }}>
            {weather.main.temp}°C
          </h1>

          <p>{weather.weather[0].main}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    textAlign: "center",
    paddingTop: "50px",
    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
    color: "#fff",
  },

  title: {
    marginBottom: "30px",
    fontSize: "32px",
  },

  searchBox: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "30px",
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    width: "200px",
  },

  button: {
    padding: "12px 20px",
    borderRadius: "10px",
    border: "none",
    background: "#ff7e5f",
    color: "#fff",
    cursor: "pointer",
  },

  card: {
    margin: "auto",
    width: "250px",
    padding: "30px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.2)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    animation: "fadeIn 0.8s ease",
  },
};

export default Dashboard;