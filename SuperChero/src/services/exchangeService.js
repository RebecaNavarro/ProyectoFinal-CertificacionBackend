const EXCHANGE_API_URL = "https://open.er-api.com/v6/latest";

export async function getExchangeRate(from, to) {
  const response = await fetch(`${EXCHANGE_API_URL}/${from}`, {
    signal: AbortSignal.timeout(5000) 
  });

  if (!response.ok) {
    const error = Error("No se pudo conectar con el servicio de tipo de cambio.");
    error.statusCode = 502;
    throw error;
  }

  const data = await response.json();

  if (data.result !== "success") {
    const error = Error("El servicio de tipo de cambio devolvió un error.");
    error.statusCode = 502;
    throw error;
  }

  const rate = data.rates[to];
  if (!rate) {
    const error = Error(`La moneda '${to}' no es válida o no está soportada.`);
    error.statusCode = 400;
    throw error;
  }

  return { rate, updatedAt: data.time_last_update_utc };
}