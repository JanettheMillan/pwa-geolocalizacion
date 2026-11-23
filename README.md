# Check-in de Asistencia (PWA Geolocalización)

Práctica del Tema 6.3: geolocalización modular con `geo-helper.js`, Pre-Permiso y Plan B.

## Archivos

- `index.html`: botón "Adjuntar mi ubicación", explicación previa, datos y registro manual por campus.
- `geo-helper.js`: `obtenerUbicacionActual`, `consultarEstadoPermisoGeo` y `traducirErrorGeolocalizacion` con Promesas.
- `app.js`: usa el helper con `.then()` / `.catch()` y controla la pantalla.
- `sw.js`: Service Worker Cache First (incluye `./geo-helper.js`).
- `manifest.json`: rutas relativas.
- `styles.css`: estilos.

## Cómo probar

1. Abrir la página en laptop y celular.
2. Pulsar **Adjuntar mi ubicación** → leer la explicación → **Sí, usar mi ubicación**.
3. Comparar el margen de error: menos de 30 m = GPS, más = Wi-Fi / IP.
4. Si se bloquea el permiso aparece el registro manual por campus.
