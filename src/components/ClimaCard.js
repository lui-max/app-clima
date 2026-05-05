const iconos = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Drizzle: "🌦️",
  Thunderstorm: "⛈️",
  Snow: "❄️",
  Mist: "🌫️",
  Fog: "🌫️",
  Haze: "🌫️",
};

function ClimaCard({ clima, unidad }) {
  const icono = iconos[clima.weather[0].main] || "🌡️";
  const simbolo = unidad === "metric" ? "°C" : "°F";

  return (
    <div className="clima-card">
      <div className="icono">{icono}</div>
      <p className="ciudad">📍 {clima.name}, {clima.sys.country}</p>
      <h1 className="temp">{Math.round(clima.main.temp)}{simbolo}</h1>
      <p className="descripcion">{clima.weather[0].description}</p>
      <div className="detalles">
        <div>
          <p>Temperatura</p>
          <p>{Math.round(clima.main.feels_like)}{simbolo}</p>
        </div>
        <div>
          <p>Humedad</p>
          <p>{clima.main.humidity}%</p>
        </div>
        <div>
          <p>Viento</p>
          <p>{clima.wind.speed} {unidad === "metric" ? "m/s" : "mph"}</p>
        </div>
      </div>
    </div>
  );
}

export default ClimaCard;