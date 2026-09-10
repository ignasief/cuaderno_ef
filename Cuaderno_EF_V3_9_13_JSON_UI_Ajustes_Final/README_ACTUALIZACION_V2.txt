CUADERNO EF · ACTUALIZACIÓN V2
==============================

IMPORTANTE: esta V2 mantiene la misma clave de almacenamiento local que la V1.
Por tanto, al actualizar los archivos del repositorio NO deberías perder los grupos,
alumnado ni calificaciones ya guardados en ese mismo dispositivo/navegador.
Aun así, antes de actualizar, exporta una copia JSON desde Ajustes.

NOVEDADES V2
- Vista «Sesión» para el uso diario en gimnasio/pista.
- Fecha de sesión y asistencia P/A/J (solo registro; no entra en la nota).
- Observación rápida por alumno y día.
- Evidencias ● de la UP accesibles desde la sesión.
- Evaluación táctil mejorada.
- Dos modos de puntuación: numérico y 4 niveles (4/6/8/10).
- Contador de alumnado ya evaluado por evidencia.
- Historial de evidencias en el detalle individual.
- Seguimiento ○ integrado en la vista Sesión.
- Copias JSON y CSV mantenidas.
- Auditoría del 40 % mantenida.

ACTUALIZAR EN GITHUB
1. Haz antes una copia JSON de seguridad en la V1.
2. En GitHub > repositorio cuaderno_ef > Add file > Upload files.
3. Sube los archivos de ESTA carpeta directamente a la raíz del repositorio.
4. GitHub avisará de que index.html, app.js, styles.css, manifest.webmanifest y sw.js ya existen.
   Es correcto: deben sustituirse por los de la V2.
5. Conserva la carpeta icons o sube también sus dos archivos.
6. Commit changes.
7. Espera 1-2 minutos a GitHub Pages.
8. Cierra completamente Cuaderno EF y vuelve a abrirlo. Si sigue mostrando la versión anterior,
   ciérrala y recarga una vez desde el navegador; el nuevo service worker renovará la caché.

PRUEBA RECOMENDADA
- Comprueba que sigue el grupo de prueba.
- Ve a Sesión.
- Marca P/A/J a un alumno y escribe una observación breve.
- Abre una evidencia ● desde la propia sesión y califica.
- Cierra/reabre y confirma persistencia.
