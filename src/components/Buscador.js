function Buscador({ ciudad, setCiudad, buscarClima, unidad, setUnidad }) {
  return (
    <div>
      <div className="buscador">
        <input
          type="text"
          placeholder="Escribe una ciudad..."
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && buscarClima()}
        />

        <button type="button" onClick={() => buscarClima()}>Buscar</button>
      </div>

      
      <div style={{ textAlign: "center" }}>
        <button
          className="toggle-unidad"
          onClick={() => setUnidad(unidad === "metric" ? "imperial" : "metric")}
        >
          Cambiar a {unidad === "metric" ? "°F" : "°C"}
        </button>
      </div>
    </div>
  );
}

export default Buscador;