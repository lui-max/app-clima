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

const dias = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

function Pronostico({ pronostico, unidad }) {
  const simbolo = unidad === "metric" ? "°C" : "°F";

  const porDia = pronostico.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  return (
    <div className="pronostico">
      {porDia.map((item, i) => {
        const fecha = new Date(item.dt * 1000);
        const dia = dias[fecha.getDay()];
        const icono = iconos[item.weather[0].main] || "🌡️";
        return (
          <div className="pronostico-dia" key={i}>
            <p className="dia">{dia}</p>
            <p className="icono">{icono}</p>
            <p className="temp">
              {Math.round(item.main.temp)}{simbolo}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Pronostico;