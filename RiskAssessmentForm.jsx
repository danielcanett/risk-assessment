import React, { useState, useEffect } from "react";

const SCENARIOS = [
  { key: "intrusion_armada", label: "Intrusión armada con objetivo de robo" },
  { key: "bloqueo_social", label: "Bloqueo de movimientos sociales" },
  { key: "vandalismo", label: "Vandalismo" },
  { key: "robo_interno", label: "Robo interno" }
];

const SECURITY_MEASURES = [
  { key: "camaras", label: "Cámaras de seguridad" },
  { key: "guardias", label: "Guardias de seguridad" },
  { key: "sistemas_intrusion", label: "Sistemas de intrusión" },
  { key: "control_acceso", label: "Control de acceso" },
  { key: "iluminacion", label: "Iluminación perimetral" }
];

export default function RiskAssessmentForm({ warehouse, onResults }) {
  const [selectedScenarios, setSelectedScenarios] = useState(SCENARIOS.map(s => s.key));
  const [selectedMeasures, setSelectedMeasures] = useState([]);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setComments("");
    setSelectedMeasures([]);
    setSelectedScenarios(SCENARIOS.map(s => s.key)); // por defecto todos seleccionados
  }, [warehouse]);

  const handleScenarioChange = (key) => {
    setSelectedScenarios(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleMeasureChange = (key) => {
    setSelectedMeasures(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8000/consultar-riesgo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: warehouse.address,
          ambito: warehouse.ambito,
          scenarios: selectedScenarios,
          security_measures: selectedMeasures,
          comments
        })
      });
      if (!response.ok) throw new Error("Error en backend");
      const data = await response.json();
      onResults(data);
    } catch (err) {
      setError("No se pudo calcular el riesgo.");
    } finally {
      setLoading(false);
    }
  };

  if (!warehouse) return <div className="risk-form-disabled">Selecciona un almacén en el mapa/lista.</div>;

  return (
    <form className="risk-form" onSubmit={handleSubmit}>
      <h2>Evaluar riesgo: {warehouse.name}</h2>
      <div><strong>Dirección:</strong> {warehouse.address}</div>
      <div className="form-group">
        <label>Escenarios de riesgo</label>
        <div className="checkbox-group">
          {SCENARIOS.map(s => (
            <label key={s.key}>
              <input
                type="checkbox"
                checked={selectedScenarios.includes(s.key)}
                onChange={() => handleScenarioChange(s.key)}
              />
              {s.label}
            </label>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Medidas de seguridad implementadas</label>
        <div className="checkbox-group">
          {SECURITY_MEASURES.map(m => (
            <label key={m.key}>
              <input
                type="checkbox"
                checked={selectedMeasures.includes(m.key)}
                onChange={() => handleMeasureChange(m.key)}
              />
              {m.label}
            </label>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Comentarios adicionales</label>
        <textarea
          value={comments}
          onChange={e => setComments(e.target.value)}
          placeholder="Información relevante, antecedentes, etc."
          rows={2}
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button className="btn-primary" type="submit" disabled={loading}>
        {loading ? "Calculando..." : "Calcular riesgo"}
      </button>
    </form>
  );
}