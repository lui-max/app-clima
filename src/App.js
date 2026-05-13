import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import Buscador from "./components/Buscador";
import ClimaCard from "./components/ClimaCard";
import Pronostico from "./components/Pronostico";
import Historial from "./components/Historial";

const API_KEY = process.env.REACT_APP_API_KEY;

const API = "https://mi-backend-production-dfcf.up.railway.app";

// ================= LOGIN =================

function Login({ onLogin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [modo, setModo] = useState("login");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    if (loading) return;

    if (!email || !password) {
      setMensaje("Completa todos los campos");
      return;
    }

    setLoading(true);
    setMensaje("");

    try {

      // LOGIN
      if (modo === "login") {

        const res = await axios.post(`${API}/login`, {
          email,
          password
        });

        console.log("LOGIN:", res.data);

        if (res.data.token) {

          localStorage.setItem("token", res.data.token);

          onLogin();

        } else {

          setMensaje("No se recibió token");
        }

      }

      // REGISTRO
      else {

        await axios.post(`${API}/registro`, {
          email,
          password
        });

        setMensaje("✅ Usuario registrado");

        setModo("login");
      }

    } catch (err) {

      console.log(err);

      if (err.response) {

        setMensaje(
          err.response.data?.error ||
          "Error del servidor"
        );

      } else {

        setMensaje("Error de conexión");
      }

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="login-page">

      <div className="login-card">

        <h1 className="login-title">
          Clima App
        </h1>

        <p className="login-subtitle">
          {
            modo === "login"
              ? "Inicia sesión para continuar"
              : "Crea una cuenta"
          }
        </p>

        <div className="login-box">

          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if(e.key === "Enter"){
                handleSubmit();
            }
          }}
            className="login-input"
          />

          <button
            onClick={handleSubmit}
            className="login-btn"
          >
            {
              loading
                ? "Cargando..."
                : modo === "login"
                  ? "Entrar"
                  : "Registrarse"
            }
          </button>

          {mensaje && (
            <p className="login-error">
              {mensaje}
            </p>
          )}

          <p className="switch-text">

            {
              modo === "login"
                ? "¿No tienes cuenta?"
                : "¿Ya tienes cuenta?"
            }

            <button
              className="switch-btn"
              onClick={() => {

                setModo(
                  modo === "login"
                    ? "registro"
                    : "login"
                );

                setMensaje("");

              }}
            >
              {
                modo === "login"
                  ? "Regístrate"
                  : "Inicia sesión"
              }
            </button>

          </p>

        </div>

      </div>

    </div>
  );
}

// ================= APP PRINCIPAL =================

function App() {

  // LOGIN
  const [logueado, setLogueado] = useState(false);

  // CLIMA
  const [ciudad, setCiudad] = useState("");
  const [clima, setClima] = useState(null);
  const [pronostico, setPronostico] = useState(null);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [unidad, setUnidad] = useState("metric");
  const [historial, setHistorial] = useState([]);

  // VERIFICAR TOKEN
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      setLogueado(true);
    }

  }, []);

  // CERRAR SESIÓN
  const cerrarSesion = () => {

    localStorage.removeItem("token");

    setLogueado(false);
  };

  // BUSCAR CLIMA
  const buscarClima = async (ciudadBuscada = ciudad) => {

    if (!ciudadBuscada.trim()) return;

    setCargando(true);

    setError("");

    try {

      const [resClima, resPronostico] = await Promise.all([

        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${ciudadBuscada}&appid=${API_KEY}&units=${unidad}&lang=es`
        ),

        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${ciudadBuscada}&appid=${API_KEY}&units=${unidad}&lang=es`
        )

      ]);

      const dataClima = await resClima.json();

      const dataPronostico = await resPronostico.json();

      if (
        dataClima.cod === "404" ||
        dataClima.cod === 404
      ) {

        setError("Ciudad no encontrada 🌧️");

        setClima(null);

        setPronostico(null);

      } else {

        setClima(dataClima);

        setPronostico(dataPronostico.list);

        setError("");

        setHistorial((prev) => {

          const nuevo = ciudadBuscada.trim();

          const filtrado = prev.filter(
            (c) =>
              c.toLowerCase() !== nuevo.toLowerCase()
          );

          return [nuevo, ...filtrado].slice(0, 5);
        });
      }

    } catch (e) {

      setError("Error al conectar, intenta de nuevo");

    } finally {

      setCargando(false);
    }
  };

  // HISTORIAL
  const seleccionarHistorial = (ciudadHistorial) => {

    setCiudad(ciudadHistorial);

    buscarClima(ciudadHistorial);
  };

  // LOGIN SCREEN
  if (!logueado) {

    return (
      <Login
        onLogin={() => setLogueado(true)}
      />
    );
  }

  // APP DEL CLIMA
  return (

    <div className="app">

      <button
        onClick={cerrarSesion}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px"
        }}
      >
        Cerrar sesión
      </button>

      <h1 className="titulo">
        Aplicación del Clima
      </h1>

      <p className="subtitulo">
        Busca el clima de cualquier ciudad del mundo
      </p>

      <Buscador
        ciudad={ciudad}
        setCiudad={setCiudad}
        buscarClima={buscarClima}
        unidad={unidad}
        setUnidad={setUnidad}
      />

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {cargando && (
        <p style={{ opacity: 0.6 }}>
          Buscando...
        </p>
      )}

      {clima && !cargando && (

        <div className="contenido">

          <ClimaCard
            clima={clima}
            unidad={unidad}
          />

          {
            pronostico && (
              <Pronostico
                pronostico={pronostico}
                unidad={unidad}
              />
            )
          }

        </div>
      )}

      <Historial
        historial={historial}
        onSeleccionar={seleccionarHistorial}
      />

    </div>
  );
}

export default App;