import axios from "axios";

const API_URL = "http://localhost:8000";

export const consultarRiesgo = async (tipo_evento, parametros) => {
  const res = await axios.post(`${API_URL}/consultar-riesgo`, {
    tipo_evento,
    parametros
  });
  return res.data;
};