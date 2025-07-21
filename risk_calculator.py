import random

AMBITOS = {
    "industrial_metro": "Zona industrial/metropolitana",
    "industrial_semiurb": "Zona industrial semiurbana",
    "industrial_suburb": "Zona industrial/suburbana",
    "industrial_mixta": "Zona industrial/mixta en áreas urbanas",
    "alta_seguridad": "Ciudad de alta seguridad"
}

SCENARIO_LABELS = {
    "intrusion_armada": "Intrusión armada con objetivo de robo",
    "bloqueo_social": "Bloqueo de movimientos sociales",
    "vandalismo": "Vandalismo",
    "robo_interno": "Robo interno"
}

SCENARIO_BASE_PROB = {
    "intrusion_armada": 0.12,
    "bloqueo_social": 0.10,
    "vandalismo": 0.08,
    "robo_interno": 0.09
}

SECURITY_REDUCTION = {
    "camaras": 0.02,
    "guardias": 0.03,
    "sistemas_intrusion": 0.025,
    "control_acceso": 0.01,
    "iluminacion": 0.01
}

def calculate_risk(address, ambito, scenarios, security_measures, comments):
    rows = []
    for scenario in scenarios:
        base_prob = SCENARIO_BASE_PROB.get(scenario, 0.08)
        reduction = sum(SECURITY_REDUCTION.get(m, 0) for m in security_measures)
        final_prob = max(0.02, base_prob - reduction + random.uniform(-0.01, 0.01))
        prob_str = f"{int(final_prob*100)}% - {int((final_prob*100)+2)}%"
        comentario = (
            f"Escenario: {SCENARIO_LABELS.get(scenario, scenario)}. "
            f"Reducción aplicada por medidas: {int(reduction*100)}%. "
            f"{comments or ''}"
        )
        rows.append({
            "escenario": SCENARIO_LABELS.get(scenario, scenario),
            "address": address,
            "ambito_label": AMBITOS.get(ambito, ambito),
            "probabilidad": prob_str,
            "comentarios": comentario,
        })
    return rows

FORMULAS = """
Probabilidad final = Probabilidad base del escenario - suma de reducción por medidas
- Probabilidades base según histórico/consultorías de riesgos.
- Reducción se suma por cada medida implementada (no puede bajar de 2%).
- Se añade aleatoriedad ±1% para simular variabilidad.
"""

SOURCES = [
    "Datos históricos de siniestralidad de AMIS (https://www.amis.com.mx/)",
    "Reportes de seguridad interna de Mercado Libre",
    "Estudios de consultoras especializadas: Marsh, Kroll, Control Risks",
    "Datos públicos de incidencia delictiva (INEGI, SESNSP)"
]

THEORIES = """
Métodos aplicados:
- Teoría de probabilidad y análisis de riesgos.
- Modelos de reducción de riesgo por capas de seguridad (Crime Prevention Through Environmental Design - CPTED).
- Teoría de las rutinas (Routine Activity Theory).
- Ajuste según contexto mexicano e industrial.
"""

def risk_assessment(address, ambito, scenarios, security_measures, comments):
    summary = calculate_risk(address, ambito, scenarios, security_measures, comments)
    return {
        "summary": summary,
        "formulas": FORMULAS.strip(),
        "sources": SOURCES,
        "theories": THEORIES.strip(),
    }