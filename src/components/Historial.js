function Historial({ historial, onSeleccionar }) {
  if (historial.length === 0) return null;

  return (
    <div className="historial">
      <h3>Búsquedas recientes</h3>
      <div className="historial-items">
        {historial.map((ciudad, i) => (
          <span key={i} onClick={() => onSeleccionar(ciudad)}>
            {ciudad}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Historial;