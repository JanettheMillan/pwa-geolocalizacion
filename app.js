// Registrar el Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}

const estado = document.getElementById('estado');

// Muestra las coordenadas y la calidad de la señal
function mostrarDatos(ubicacion) {
  document.getElementById('dato-lat').textContent = ubicacion.latitud.toFixed(6);
  document.getElementById('dato-lng').textContent = ubicacion.longitud.toFixed(6);
  document.getElementById('dato-precision').textContent = ubicacion.precisionMetros;

  const calidad = document.getElementById('calidad');
  if (ubicacion.precisionMetros < 30) {
    calidad.textContent = 'Precisión GPS Alta';
    calidad.className = 'etiqueta verde';
  } else {
    calidad.textContent = 'Ubicación Aproximada (Wi-Fi / IP)';
    calidad.className = 'etiqueta naranja';
  }

  document.getElementById('datos').hidden = false;
  document.getElementById('manual').hidden = true;
}

// Plan B: mostrar el registro manual
function mostrarPlanB() {
  document.getElementById('manual').hidden = false;
}

// Pide la ubicación con el helper
function registrarConUbicacion() {
  estado.textContent = 'Buscando tu ubicación...';

  obtenerUbicacionActual()
    .then((ubicacion) => {
      estado.textContent = 'Asistencia registrada con ubicación.';
      mostrarDatos(ubicacion);
    })
    .catch((error) => {
      estado.textContent = error.message;
      mostrarPlanB();
    });
}

// Botón principal: revisar el permiso antes de pedir nada
document.getElementById('btn-ubicacion').addEventListener('click', () => {
  consultarEstadoPermisoGeo().then((permiso) => {
    if (permiso === 'granted') {
      registrarConUbicacion();
    } else if (permiso === 'prompt') {
      document.getElementById('explicacion').hidden = false;
    } else {
      estado.textContent = 'El permiso de ubicación está bloqueado.';
      document.getElementById('como-reactivar').hidden = false;
      mostrarPlanB();
    }
  });
});

// El usuario aceptó la explicación: ahora sí sale el diálogo del navegador
document.getElementById('btn-permitir').addEventListener('click', () => {
  document.getElementById('explicacion').hidden = true;
  registrarConUbicacion();
});

// Registro manual (Plan B)
document.getElementById('btn-manual').addEventListener('click', () => {
  const campus = document.getElementById('lista-campus').value;
  if (!campus) {
    estado.textContent = 'Primero elige un campus.';
    return;
  }
  estado.textContent = 'Asistencia registrada manualmente en: ' + campus;
});
