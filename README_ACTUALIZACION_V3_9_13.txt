CUADERNO EF · V3.9.13

Corrección mínima sobre V3.9.12:
- Refuerza la descarga de archivos en PWA/móvil insertando temporalmente el enlace de descarga en el DOM antes de activarlo.
- La exportación JSON muestra confirmación al preparar la copia y un aviso explícito si falla la serialización.
- No modifica matriz, ponderaciones, cálculos, cierres CE3 ni claves de almacenamiento.
- Conserva cuadernoEF_v1 y cuadernoEF_photos_v390.

Motivo: en la prueba 51 de V3.9.12 el botón Exportar copia JSON no inició descarga en el dispositivo, aunque la lógica de exportación heredada seguía presente.

AJUSTES ADICIONALES SOLICITADOS ANTES DE INSTALAR V3.9.13
- En Evaluar: CE1 naranja fluorescente, CE2 azul fluorescente, CE3 morado, CE4 amarillo fluorescente y CE5 verde fluorescente.
- Barra inferior: botones, iconos y textos ampliados para mejorar el uso táctil.
- Ajustes > Alumnado y fotos: convertido en desplegable.
- Cada alumno incorpora “Borrar evaluaciones”, con confirmación. Borra calificaciones, seguimientos, cierres CE3, instrumentos de evaluación y anotaciones del profesor; conserva alumno, foto y asistencia.
- No se han modificado ponderaciones, matriz UP/criterios, recencia, cierres CE3 ni reglas de cálculo.
