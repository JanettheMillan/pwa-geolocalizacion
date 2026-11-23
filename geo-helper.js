// geo-helper.js - Funciones reutilizables para pedir la ubicación (sin async/await)

// Convierte el número de error del navegador en un texto entendible
function traducirErrorGeolocalizacion(error) {
  if (error.code === 1) {
    return 'No diste permiso de ubicación. Elige tu campus en la lista.';
  }
  if (error.code === 2) {
    return 'No se pudo encontrar tu ubicación (sin señal GPS ni Wi-Fi).';
  }
  if (error.code === 3) {
    return 'Tardó demasiado en encontrar tu ubicación (TIMEOUT).';
  }
  return 'Error desconocido al pedir la ubicación.';
}

// Pide la ubicación una sola vez y la devuelve como Promesa
function obtenerUbicacionActual(opcionesExtra) {
  const opciones = Object.assign(
    {
      enableHighAccuracy: true, // usar GPS si existe
      timeout: 10000,           // esperar máximo 10 segundos
      maximumAge: 0             // siempre una lectura nueva
    },
    opcionesExtra
  );

  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Tu navegador no tiene Geolocalización.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (posicion) => {
        resolve({
          latitud: posicion.coords.latitude,
          longitud: posicion.coords.longitude,
          precisionMetros: Math.round(posicion.coords.accuracy),
          timestamp: posicion.timestamp
        });
      },
      (error) => {
        reject(new Error(traducirErrorGeolocalizacion(error)));
      },
      opciones
    );
  });
}

// Revisa el permiso: 'granted', 'denied' o 'prompt'
function consultarEstadoPermisoGeo() {
  if (!navigator.permissions) {
    return Promise.resolve('prompt');
  }

  return navigator.permissions.query({ name: 'geolocation' })
    .then((permiso) => permiso.state)
    .catch(() => 'prompt');
}
