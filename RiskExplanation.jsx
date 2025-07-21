import React from "react";

export default function RiskResultsTable({ results }) {
  if (!results || !results.summary || results.summary.length === 0) return null;

  return (
    <div className="risk-table-container">
      <h3>Resumen en Tabla</h3>
      <table className="risk-table">
        <thead>
          <tr>
            <th>Ubicación / Región</th>
            <th>Ámbito</th>
            <th>Probabilidad estimada</th>
            <th>Comentarios</th>
          </tr>
        </thead>
        <tbody>
          {results.summary.map((row, idx) => (
            <tr key={idx}>
              <td>{row.address}</td>
              <td>{row.ambito_label}</td>
              <td>{row.probabilidad}</td>
              <td>{row.comentarios}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}