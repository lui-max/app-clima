import { useState } from "react";
import "./App.css";
import Buscador from "./components/Buscador";
import ClimaCard from "./components/ClimaCard";
import Pronostico from "./components/Pronostico";
import Historial from "./components/Historial";

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [ciudad, setCiudad] = useState("");
  const [clima, setClima] = useState(null);
  const [pronostico, setPronostico] = useState(null);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [unidad, setUnidad] = useState("metric");
  const [historial, setHistorial] = useState([]);

  const buscarClima = async (ciudadBuscada = ciudad) => {
    if (!ciudadBuscada.trim()) return;
    setCargando(true);
    setError("");
    try {
      const [resClima, resPronostico] = await Promise.all([
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudadBuscada}&appid=${API_KEY}&units=${unidad}&lang=es`),
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${ciudadBuscada}&appid=${API_KEY}&units=${unidad}&lang=es`)
]);

      const dataClima = await resClima.json();
      const dataPronostico = await resPronostico.json();

      if (dataClima.cod === "404" || dataClima.cod === 404) {
        setError("Ciudad no encontrada 🌧️");
        setClima(null);
        setPronostico(null);
      } else {
        setClima(dataClima);
        setPronostico(dataPronostico.list);
        setError("");
        setHistorial((prev) => {
          const nuevo = ciudadBuscada.trim();
          const filtrado = prev.filter((c) => c.toLowerCase() !== nuevo.toLowerCase());
          return [nuevo, ...filtrado].slice(0, 5);
        });
      }
    } catch (e) {
      setError("Error al conectar, intenta de nuevo");
    } finally {
      setCargando(false);
    }
  };

  const seleccionarHistorial = (ciudadHistorial) => {
    setCiudad(ciudadHistorial);
    buscarClima(ciudadHistorial);
  };

  return (
    <div className="app">
      <h1 className="titulo"> Aplicación del Clima</h1>
      <p className="subtitulo">Busca el clima de cualquier ciudad del mundo</p>

      <Buscador
        ciudad={ciudad}
        setCiudad={setCiudad}
        buscarClima={buscarClima}
        unidad={unidad}
        setUnidad={setUnidad}
      />

      {error && <p className="error">{error}</p>}
      {cargando && <p style={{ opacity: 0.6 }}>Buscando...</p>}

      {clima && !cargando && (
  <div className="contenido">
    <ClimaCard clima={clima} unidad={unidad} />
    {pronostico && <Pronostico pronostico={pronostico} unidad={unidad} />}
  </div>
)}

      <Historial historial={historial} onSeleccionar={seleccionarHistorial} />
    </div>
  );
}

export default App;