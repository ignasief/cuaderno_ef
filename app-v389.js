const APP_KEY='cuadernoEF_v1';
const criteria=[
 ['1.1','CE1',5],['1.2','CE1',5],['1.3','CE1',4],['1.4','CE1',3],['1.5','CE1',3],['1.6','CE1',5],
 ['2.1','CE2',5],['2.2','CE2',6],['2.3','CE2',8],['2.4','CE2',6],
 ['3.1','CE3',7],['3.2','CE3',7],['3.3','CE3',6],
 ['4.1','CE4',6],['4.2','CE4',5],['4.3','CE4',4],
 ['5.1','CE5',5],['5.2','CE5',5],['5.3','CE5',5]
];
const ceWeights={CE1:25,CE2:25,CE3:20,CE4:15,CE5:15};
const criterionShort={
 '1.1':'Actividad física y salud','1.2':'Preparación de la práctica física','1.3':'Hábitos saludables y bienestar','1.4':'Prevención y seguridad corporal','1.5':'Higiene y hábitos posturales','1.6':'Regulación responsable del esfuerzo',
 '2.1':'Planificación de retos motores','2.2':'Decisiones en situaciones motrices','2.3':'Resolución eficaz de problemas motores','2.4':'Autoevaluación del proceso motor',
 '3.1':'Participación y deportividad','3.2':'Cooperación y responsabilidad grupal','3.3':'Respeto y convivencia motriz',
 '4.1':'Cultura motriz y expresión','4.2':'Deporte, género e igualdad','4.3':'Expresión corporal y comunicación',
 '5.1':'Actividad física en el entorno','5.2':'Seguridad en el medio natural','5.3':'Cuidado del entorno durante práctica'
};
function criterionLabel(c){return `${c} · ${criterionShort[c]||''}`}

const quickEvalContext={
 'UP1':{title:'Pasaporte de la condición física',what:'Qué observo: interpretación de los resultados y regulación responsable del esfuerzo.',focus:{'1.1':'Interpreta sus pruebas para valorar su condición física.','1.6':'Reconoce y regula su esfuerzo mediante sensaciones, RPE y ritmo.'}},
 'UP2':{title:'Diseño y dirección de calentamiento',what:'Qué observo: preparación adecuada, progresiva y segura de la práctica física.',focus:{'1.2':'Diseña y dirige un calentamiento adecuado, progresivo y seguro.'}},
 'UP3':{title:'Capacidades físicas básicas',what:'Qué observo: comprensión de las CFB, selección de tareas y autorregulación del esfuerzo.',focus:{'1.1':'Relaciona las tareas de CFB con sus efectos sobre condición física y salud.','1.2':'Selecciona y organiza tareas adecuadas, progresivas y seguras.','1.6':'Anticipa, contrasta y ajusta el esfuerzo previsto y real.'}},
 'UP4':{title:'Juego real/modificado · Bádminton',what:'Qué observo: decisiones, resolución técnico-táctica, reglas, deportividad y convivencia. No se evalúa el resultado del partido.',focus:{'2.2':'Se coloca, anticipa y elige respuestas adecuadas durante el juego.','2.3':'Resuelve las situaciones técnico-tácticas con eficacia y continuidad.','2.4':'Aplica reglas y principios del juego y valora su propia actuación.','3.1':'Participa activamente, se autorregula y mantiene deportividad.','3.3':'Respeta al oponente, a los compañeros y las normas de convivencia.'}},
 'UP5':{title:'Circuito/reto coordinativo',what:'Qué observo: resolución eficaz de retos de coordinación y equilibrio.',focus:{'2.3':'Ajusta y combina sus acciones para resolver el reto coordinativo con eficacia.'}},
 'UP6':{title:'Hábitos saludables',what:'Qué observo: aplicación razonada de hábitos saludables, prevención, higiene y bienestar.',focus:{'1.1':'Relaciona actividad física y salud en situaciones concretas.','1.3':'Aplica hábitos saludables vinculados al bienestar.','1.4':'Reconoce riesgos y aplica medidas de prevención y seguridad.','1.5':'Analiza hábitos de higiene y postura y propone mejoras.'}},
 'UP7':{title:'Composición gimnástica',what:'Qué observo: resolución motriz, cooperación y respeto durante la composición.',focus:{'2.3':'Resuelve con eficacia los elementos y enlaces de la composición.','3.2':'Coopera, asume responsabilidades y contribuye al resultado grupal.','3.3':'Respeta, ayuda y favorece un clima seguro durante la práctica.'}},
 'UP8':{title:'Secuencia cooperativa de combas',what:'Qué observo: resolución eficaz y coordinada de una secuencia colectiva.',focus:{'2.3':'Resuelve y enlaza acciones de comba con eficacia dentro de la secuencia cooperativa.'}},
 'UP9':{title:'Juego reducido 3×3 · Minibásquet',what:'Qué observo: decisiones, resolución técnico-táctica, reglas, participación, deportividad e igualdad.',focus:{'2.2':'Lee la situación de juego y toma decisiones adecuadas.','2.3':'Resuelve con eficacia las acciones técnico-tácticas del 3×3.','2.4':'Aplica reglas y principios y revisa su propia actuación.','3.1':'Participa, se autorregula y mantiene deportividad.','3.3':'Respeta a compañeros, oponentes y decisiones durante el juego.','4.2':'Reconoce y cuestiona estereotipos, valorando referentes diversos en baloncesto.'}},
 'UP10':{title:'Creación y representación colectiva',what:'Qué observo: resolución motriz, cooperación, cultura motriz y comunicación corporal.',focus:{'2.3':'Resuelve con eficacia las demandas motrices de la creación.','3.2':'Coopera y asume responsabilidades dentro del proceso creativo.','3.3':'Respeta aportaciones y favorece la convivencia en el grupo.','4.1':'Integra recursos de la cultura motriz en la representación.','4.3':'Utiliza el cuerpo de forma expresiva y comunicativa.'}},
 'UP11':{title:'Juegos y deportes alternativos',what:'Qué observo: planificación, participación, cooperación y convivencia en situaciones motrices nuevas.',focus:{'2.1':'Planifica y ajusta estrategias para resolver situaciones motrices.','3.1':'Participa con autonomía y deportividad.','3.2':'Coopera y asume responsabilidades en el juego.','3.3':'Respeta normas, compañeros y adversarios.'}},
 'UP12':{title:'Baúl de los juegos del instituto · ApS',what:'Qué observo: cooperación, cultura motriz, igualdad y transmisión del patrimonio lúdico.',focus:{'3.2':'Coopera y asume responsabilidades en el proyecto ApS.','4.1':'Reconoce, practica y transmite manifestaciones de la cultura motriz.','4.2':'Analiza estereotipos y valora la diversidad en la memoria lúdica.'}},
 'UP13':{title:'Recorrido/reto de orientación',what:'Qué observo: autonomía, cooperación, seguridad y cuidado del entorno durante la práctica.',focus:{'3.1':'Participa y se autorregula con autonomía en el entorno real.','3.2':'Coopera y asume responsabilidades durante orientación y senderismo.','5.1':'Se orienta y resuelve el recorrido utilizando los recursos del entorno.','5.2':'Identifica riesgos y aplica medidas de seguridad adecuadas.','5.3':'Actúa de forma responsable y sostenible durante la práctica.'}}
};
function quickFocus(up,c,desc){return quickEvalContext[up]?.focus?.[c]||desc}
const ups=[
 ['UP1','Valoración de la condición física'],['UP2','Calentamiento'],['UP3','Capacidades físicas básicas'],['UP4','Bádminton'],['UP5','Coordinación y equilibrio'],['UP6','Salud'],['UP7','Habilidades gimnásticas'],['UP8','Combas'],['UP9','Minibásquet'],['UP10','Expresión corporal'],['UP11','Juegos y deportes alternativos'],['UP12','Juegos y deportes tradicionales'],['UP13','Senderismo y orientación']
];
const evidence={
'1.1':[['UP1','Revisión de portfolio','Pasaporte de condición física'],['UP3','Revisión de portfolio','Seguimiento y regulación de CFB'],['UP6','Presentación de producto','Producto aplicado sobre hábitos saludables']],
'1.2':[['UP2','Presentación de producto','Diseño y dirección de calentamiento'],['UP3','Prueba de ejecución','Reto de regulación del esfuerzo']],
'1.3':[['UP6','Prueba objetiva','Aplicación de hábitos saludables']],
'1.4':[['UP6','Prueba objetiva','Prevención y actuación ante situaciones de riesgo']],
'1.5':[['UP6','Presentación de producto','Análisis crítico de prácticas y hábitos']],
'1.6':[['UP1','Observación sistemática','Participación responsable y regulación del esfuerzo'],['UP3','Observación sistemática','Participación responsable y autorregulación']],
'2.1':[['UP11','Prueba de ejecución','Resolución autónoma de situaciones motrices']],
'2.2':[['UP4','Prueba de ejecución','Juego real/modificado de bádminton'],['UP9','Prueba de ejecución','Juego reducido 3×3 de minibásquet']],
'2.3':[['UP4','Prueba de ejecución','Juego real/modificado de bádminton'],['UP5','Prueba de ejecución','Circuito/reto coordinativo'],['UP7','Prueba de ejecución','Composición gimnástica'],['UP8','Presentación de producto','Secuencia cooperativa de combas'],['UP9','Prueba de ejecución','Juego reducido 3×3 de minibásquet'],['UP10','Presentación de producto','Creación y representación colectiva']],
'2.4':[['UP4','Prueba de ejecución','Aplicación de principios y reglas en bádminton'],['UP9','Prueba de ejecución','Aplicación de principios y reglas en minibásquet']],
'3.1':[['UP4','Observación sistemática','Autorregulación y participación en juego'],['UP9','Observación sistemática','Autorregulación en 3×3'],['UP11','Observación sistemática','Participación y autonomía'],['UP13','Observación sistemática','Autorregulación en entorno real']],
'3.2':[['UP7','Observación sistemática','Cooperación en composición gimnástica'],['UP10','Observación sistemática','Cooperación en creación colectiva'],['UP11','Observación sistemática','Cooperación en deportes alternativos'],['UP12','Observación sistemática','Cooperación en el proyecto ApS'],['UP13','Observación sistemática','Cooperación en orientación/senderismo']],
'3.3':[['UP4','Observación sistemática','Respeto y deportividad'],['UP7','Observación sistemática','Respeto y ayuda entre iguales'],['UP9','Observación sistemática','Deportividad e interacción'],['UP10','Observación sistemática','Respeto en creación colectiva'],['UP11','Observación sistemática','Respeto y convivencia']],
'4.1':[['UP10','Presentación de producto','Representación expresiva colectiva'],['UP12','Revisión de portfolio','Baúl de los juegos del instituto']],
'4.2':[['UP9','Diálogo/debate','Baloncesto, igualdad y referentes'],['UP12','Trabajo de investigación','Estereotipos y memoria lúdica']],
'4.3':[['UP10','Presentación de producto','Uso expresivo y comunicativo del cuerpo']],
'5.1':[['UP13','Prueba de ejecución','Recorrido/reto de orientación']],
'5.2':[['UP13','Observación sistemática','Seguridad y gestión del riesgo']],
'5.3':[['UP13','Revisión de portfolio','Uso responsable y sostenible del entorno']]
};

const rubricOverrides={
 'UP1|1.1':[
  {label:'Muy inicial',score:2,desc:'No realiza la tarea o su participación es tan limitada que apenas permite evidenciar el criterio, pese a disponer de la oportunidad y las condiciones para realizarla.'},
  {label:'Inicio',score:4,desc:'Realiza las pruebas, pero registra de forma incompleta sus resultados y necesita ayuda frecuente para identificar qué capacidad física está valorando y para interpretar la información obtenida.'},
  {label:'Básico',score:6,desc:'Realiza y registra las pruebas e identifica las capacidades físicas valoradas, aunque interpreta sus resultados de manera elemental y necesita alguna orientación para relacionarlos con su condición física.'},
  {label:'Adecuado',score:8,desc:'Realiza y registra correctamente las pruebas, identifica las capacidades físicas implicadas e interpreta sus resultados para obtener una valoración razonada de su propia condición física.'},
  {label:'Avanzado',score:10,desc:'Además de lo anterior, analiza de forma autónoma sus resultados, identifica fortalezas y aspectos de mejora y formula decisiones realistas y saludables para mejorar su condición física.'}
 ],
 'UP1|1.6':[
  {label:'Muy inicial',score:2,desc:'No realiza la tarea o su participación es tan limitada que apenas permite evidenciar el criterio, pese a disponer de la oportunidad y las condiciones para realizarla.'},
  {label:'Inicio',score:4,desc:'Participa en la tarea, pero le cuesta reconocer la intensidad de su esfuerzo y ajustar el ritmo; registra RPE o paradas de forma poco consistente y necesita recordatorios frecuentes para regularse.'},
  {label:'Básico',score:6,desc:'Reconoce de forma básica su nivel de esfuerzo y registra RPE y paradas; realiza algunos ajustes de ritmo, aunque de manera irregular o con orientación puntual.'},
  {label:'Adecuado',score:8,desc:'Regula de forma autónoma la intensidad durante la tarea, utiliza su RPE y sus sensaciones para ajustar el ritmo y explica de manera razonada las decisiones tomadas sobre paradas, continuidad y esfuerzo.'},
  {label:'Avanzado',score:10,desc:'Anticipa y ajusta eficazmente su esfuerzo durante toda la tarea, interpreta la evolución de su RPE y sus sensaciones, toma decisiones pertinentes para sostener el esfuerzo y valora críticamente su estrategia proponiendo mejoras realistas.'}
 ],
 'UP3|1.1':[
  {label:'Muy inicial',score:2,desc:'No realiza la tarea o su participación es tan limitada que apenas permite evidenciar el criterio, pese a disponer de la oportunidad y las condiciones para realizarla.'},
  {label:'Inicio',score:4,desc:'Identifica de forma parcial las capacidades físicas básicas y necesita ayuda frecuente para relacionar las tareas realizadas con sus efectos sobre la salud y la condición física.'},
  {label:'Básico',score:6,desc:'Reconoce las capacidades físicas trabajadas y relaciona de forma sencilla algunas tareas con sus efectos, aunque necesita orientación para interpretar y ajustar la práctica.'},
  {label:'Adecuado',score:8,desc:'Identifica y explica las capacidades físicas trabajadas, relaciona las tareas con sus efectos y utiliza esa información para orientar de forma razonada su práctica.'},
  {label:'Avanzado',score:10,desc:'Analiza con autonomía las capacidades físicas, compara respuestas y efectos de distintas tareas y utiliza esa información para proponer ajustes realistas y saludables.'}
 ],
 'UP3|1.2':[
  {label:'Muy inicial',score:2,desc:'No realiza la tarea o su participación es tan limitada que apenas permite evidenciar el criterio, pese a disponer de la oportunidad y las condiciones para realizarla.'},
  {label:'Inicio',score:4,desc:'Realiza las tareas propuestas, pero necesita ayuda frecuente para seleccionar, organizar o ejecutar ejercicios adecuados y seguros para el objetivo previsto.'},
  {label:'Básico',score:6,desc:'Selecciona y realiza tareas sencillas adecuadas al objetivo, aunque presenta algunas carencias de organización, progresión o seguridad.'},
  {label:'Adecuado',score:8,desc:'Selecciona, organiza y realiza con autonomía tareas adecuadas, progresivas y seguras para trabajar las capacidades físicas planteadas.'},
  {label:'Avanzado',score:10,desc:'Además de seleccionar y organizar tareas adecuadas y seguras, las adapta con criterio a sus necesidades y justifica los ajustes realizados.'}
 ],
 'UP3|1.6':[
  {label:'Muy inicial',score:2,desc:'No realiza la tarea o su participación es tan limitada que apenas permite evidenciar el criterio, pese a disponer de la oportunidad y las condiciones para realizarla.'},
  {label:'Inicio',score:4,desc:'Le cuesta anticipar la intensidad de la tarea y reconocer la diferencia entre el esfuerzo previsto y el real; necesita ayuda frecuente para ajustar el ritmo.'},
  {label:'Básico',score:6,desc:'Estima de forma aproximada el RPE previsto y reconoce el RPE real, realizando algunos ajustes de ritmo aunque de manera irregular o con orientación puntual.'},
  {label:'Adecuado',score:8,desc:'Anticipa de forma razonable el RPE, compara el esfuerzo previsto con el real y regula autónomamente ritmo, pausas y recuperación para aproximarse al objetivo.'},
  {label:'Avanzado',score:10,desc:'Anticipa, contrasta y ajusta con precisión su esfuerzo a lo largo de varias tareas, explica las decisiones tomadas y utiliza la experiencia previa para mejorar su autorregulación.'}
 ],
 'UP4|2.2':[
  {label:'Muy inicial',score:2,desc:'No realiza la tarea o su participación es tan limitada que apenas permite evidenciar el criterio, pese a disponer de la oportunidad y las condiciones para realizarla.'},
  {label:'Inicio',score:4,desc:'Toma decisiones tardías o poco adecuadas durante el juego y necesita ayuda frecuente para colocarse, anticipar la trayectoria o elegir una respuesta motriz pertinente.'},
  {label:'Básico',score:6,desc:'Toma decisiones adecuadas en situaciones sencillas, aunque su colocación, anticipación o elección del golpeo todavía es irregular.'},
  {label:'Adecuado',score:8,desc:'Se coloca, anticipa la trayectoria y elige respuestas adecuadas con autonomía en las situaciones habituales de juego.'},
  {label:'Avanzado',score:10,desc:'Lee el juego con anticipación, adapta su colocación y selecciona respuestas eficaces según el espacio, la trayectoria y la actuación del oponente.'}
 ],
 'UP4|2.3':[
  {label:'Muy inicial',score:2,desc:'No realiza la tarea o su participación es tan limitada que apenas permite evidenciar el criterio, pese a disponer de la oportunidad y las condiciones para realizarla.'},
  {label:'Inicio',score:4,desc:'Presenta dificultades para mantener el intercambio y resolver situaciones básicas de juego; necesita ayuda frecuente para controlar móvil, espacio y ejecución.'},
  {label:'Básico',score:6,desc:'Mantiene intercambios sencillos y resuelve algunas situaciones de juego, aunque con errores de control, continuidad o eficacia.'},
  {label:'Adecuado',score:8,desc:'Mantiene el intercambio y resuelve con control y eficacia las situaciones habituales, adaptando los golpeos a las necesidades del juego.'},
  {label:'Avanzado',score:10,desc:'Resuelve con eficacia situaciones variadas, combina recursos técnicos y tácticos y adapta su respuesta con autonomía a contextos más complejos.'}
 ],
 'UP4|2.4':[
  {label:'Muy inicial',score:2,desc:'No realiza la tarea o su participación es tan limitada que apenas permite evidenciar el criterio, pese a disponer de la oportunidad y las condiciones para realizarla.'},
  {label:'Inicio',score:4,desc:'Conoce parcialmente las reglas y principios básicos y necesita recordatorios frecuentes para aplicarlos o para reconocer errores en su propia actuación.'},
  {label:'Básico',score:6,desc:'Aplica las reglas básicas en situaciones habituales y reconoce algunos errores propios, aunque necesita apoyos puntuales para ajustar su actuación.'},
  {label:'Adecuado',score:8,desc:'Aplica con autonomía las reglas y principios básicos, identifica errores relevantes y realiza ajustes adecuados durante el juego.'},
  {label:'Avanzado',score:10,desc:'Aplica y explica con precisión reglas y principios, analiza su actuación y realiza ajustes eficaces y fundamentados durante el juego.'}
 ],
 'UP4|3.1':[
  {label:'Muy inicial',score:2,desc:'No realiza la tarea o su participación es tan limitada que apenas permite evidenciar el criterio, pese a disponer de la oportunidad y las condiciones para realizarla.'},
  {label:'Inicio',score:4,desc:'Participa de forma irregular y necesita recordatorios frecuentes para mantener una actitud deportiva, aceptar el resultado y regular su conducta.'},
  {label:'Básico',score:6,desc:'Participa y mantiene una actitud generalmente adecuada, aunque presenta alguna dificultad puntual para aceptar errores, resultados o decisiones.'},
  {label:'Adecuado',score:8,desc:'Participa activamente, acepta resultados y decisiones, regula su conducta y mantiene una actitud deportiva de forma autónoma.'},
  {label:'Avanzado',score:10,desc:'Participa con constancia, muestra deportividad ejemplar, se autorregula ante situaciones adversas y favorece un clima positivo de juego.'}
 ],
 'UP4|3.3':[
  {label:'Muy inicial',score:2,desc:'No realiza la tarea o su participación es tan limitada que apenas permite evidenciar el criterio, pese a disponer de la oportunidad y las condiciones para realizarla.'},
  {label:'Inicio',score:4,desc:'Necesita recordatorios frecuentes para respetar a compañeros, oponentes, material, normas y acuerdos durante la práctica.'},
  {label:'Básico',score:6,desc:'Mantiene un trato respetuoso en la mayoría de situaciones, aunque presenta alguna conducta puntual que requiere corrección.'},
  {label:'Adecuado',score:8,desc:'Respeta de forma constante a compañeros y oponentes, cuida el material y cumple normas y acuerdos durante la práctica.'},
  {label:'Avanzado',score:10,desc:'Además de mantener un respeto constante, contribuye activamente a resolver conflictos, cuidar el clima de convivencia y facilitar la participación de los demás.'}
 ],
 'UP2|1.2':[
  {label:'Muy inicial',score:2,desc:'No realiza la tarea o su participación es tan limitada que apenas permite evidenciar el criterio, pese a disponer de la oportunidad y las condiciones para realizarla.'},
  {label:'Inicio',score:4,desc:'Realiza un calentamiento incompleto o desorganizado y necesita ayuda frecuente para seleccionar, ordenar y dirigir los ejercicios.'},
  {label:'Básico',score:6,desc:'Diseña y dirige un calentamiento sencillo, aunque presenta algunas carencias en la estructura, la progresión o la adecuación de los ejercicios.'},
  {label:'Adecuado',score:8,desc:'Diseña y dirige de forma autónoma un calentamiento general estructurado, progresivo y adecuado a la actividad posterior.'},
  {label:'Avanzado',score:10,desc:'Además de estructurarlo y dirigirlo con autonomía, adapta los ejercicios con criterio, controla tiempos e intensidad y conduce al grupo con seguridad.'}
 ]
};
function makeRubric(proc,focus){
 const f=focus.charAt(0).toLowerCase()+focus.slice(1);
 const templates={
  'Prueba de ejecución':[
   `Resuelve ${f} con muchas dificultades, necesita ayuda frecuente y todavía no aplica de forma estable los elementos esenciales de la tarea.`,
   `Resuelve ${f} en situaciones sencillas, con cierta autonomía, aunque mantiene errores o necesita apoyos puntuales.`,
   `Resuelve ${f} con autonomía y eficacia en las situaciones habituales, aplicando de forma consistente los elementos esenciales.`,
   `Resuelve ${f} con autonomía, eficacia y adaptación, toma decisiones pertinentes y transfiere lo aprendido a situaciones más complejas.`
  ],
  'Observación sistemática':[
   `Manifiesta de forma esporádica las conductas esperadas en ${f} y requiere recordatorios o apoyo frecuente.`,
   `Manifiesta las conductas esperadas en ${f} en situaciones habituales, aunque de forma irregular o con apoyos puntuales.`,
   `Manifiesta de forma autónoma, estable y adecuada las conductas esperadas en ${f} durante la práctica.`,
   `Manifiesta de forma autónoma y constante las conductas esperadas en ${f}, las adapta al contexto y contribuye positivamente al aprendizaje del grupo.`
  ],
  'Presentación de producto':[
   `El producto o actuación vinculada a ${f} es incompleto, poco organizado o requiere ayuda frecuente para alcanzar los elementos esenciales.`,
   `El producto o actuación vinculada a ${f} incluye los elementos básicos, aunque presenta carencias de organización, precisión o autonomía.`,
   `El producto o actuación vinculada a ${f} es completo, coherente, adecuado y elaborado con autonomía.`,
   `El producto o actuación vinculada a ${f} es completo y riguroso, muestra autonomía, capacidad de adaptación y una elaboración especialmente consistente.`
  ],
  'Revisión de portfolio':[
   `El registro sobre ${f} es escaso o poco comprensible y muestra dificultades para interpretar la propia experiencia o progreso.`,
   `El registro sobre ${f} recoge información básica y permite una interpretación sencilla, aunque todavía poco profunda o irregular.`,
   `El registro sobre ${f} es completo y permite interpretar con autonomía el propio desempeño, esfuerzo o progreso.`,
   `El registro sobre ${f} es sistemático, preciso y reflexivo; relaciona evidencias, interpreta el progreso y plantea ajustes pertinentes.`
  ],
  'Prueba objetiva':[
   `Reconoce parcialmente los contenidos necesarios para ${f} y presenta errores relevantes al aplicarlos.`,
   `Reconoce y aplica los contenidos básicos relacionados con ${f}, aunque mantiene algunas imprecisiones.`,
   `Comprende y aplica correctamente los contenidos relacionados con ${f} en las situaciones planteadas.`,
   `Comprende, aplica y justifica con precisión los contenidos relacionados con ${f}, estableciendo relaciones y tomando decisiones fundamentadas.`
  ],
  'Diálogo/debate':[
   `Participa poco en ${f} o aporta ideas poco fundamentadas, necesitando apoyo para escuchar, argumentar y respetar otras perspectivas.`,
   `Participa en ${f} con aportaciones comprensibles y respetuosas, aunque la argumentación es todavía sencilla.`,
   `Participa activamente en ${f}, argumenta con claridad, escucha otras perspectivas y relaciona sus ideas con situaciones concretas.`,
   `Participa con rigor en ${f}, contrasta perspectivas, argumenta de forma fundamentada y contribuye a una reflexión crítica y respetuosa del grupo.`
  ],
  'Trabajo de investigación':[
   `La investigación sobre ${f} es incompleta, utiliza información poco seleccionada o necesita ayuda frecuente para organizar conclusiones.`,
   `La investigación sobre ${f} recoge información suficiente y formula conclusiones básicas, aunque con selección o análisis limitado.`,
   `La investigación sobre ${f} selecciona y organiza información pertinente, la analiza y formula conclusiones coherentes con autonomía.`,
   `La investigación sobre ${f} contrasta información, analiza críticamente los hallazgos y presenta conclusiones bien fundamentadas y conectadas con el contexto.`
  ]
 };
 const ds=templates[proc]||templates['Prueba de ejecución'];
 return [{label:'Muy inicial',score:2,desc:`No realiza ${f} o su participación es tan limitada que apenas permite evidenciar el criterio, pese a disponer de la oportunidad y las condiciones para realizar la tarea.`},...['Inicio','Básico','Adecuado','Avanzado'].map((label,i)=>({label,score:[4,6,8,10][i],desc:ds[i]}))];
}
function rubricFor(ev){return rubricOverrides[`${ev.up}|${ev.c}`]||makeRubric(ev.proc,ev.desc)}
function rubricReferenceHTML(ev){
 const r=rubricFor(ev);
 return `<details class="rubric-ref"><summary><span class="rubric-summary-label">Ver rúbrica</span><span class="rubric-summary-title">${esc(ev.desc)}</span></summary><div class="rubric-grid">${r.map(x=>`<div class="rubric-level"><div class="rubric-level-head"><b>${x.label}</b><span>${x.score}</span></div><p>${esc(x.desc)}</p></div>`).join('')}</div><p class="tiny rubric-note">Seleccionar un nivel registra su valor numérico como evidencia principal del criterio. El descriptor queda asociado a la valoración en el historial.</p></details>`;
}

const compMatrix={'1.5':['UP2'],'1.6':['UP2','UP6'],'2.1':['UP4'],'2.2':['UP11'],'3.1':['UP3','UP5','UP7','UP8'],'3.2':['UP2','UP3','UP4'],'3.3':['UP1','UP2','UP3'],'4.1':['UP8']};
let deferredPrompt=null;
let currentView='inicio';
function todayISO(){const d=new Date();return new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10)}
function defaultUpPeriods(){const out={};ups.forEach(([u],i)=>out[u]=i<4?'eval1':i<10?'eval2':'eval3');return out}
function defaultState(){return {groups:[],scores:{},rubricMarks:{},qual:{},attendance:{},notes:{},teacherNotes:{},fitness:{},reflections:{},warmups:{},up3RPE:{},up3Tasks:{},up4Game:{},photos:{},selectedGroup:null,selectedUP:'UP1',selectedDate:todayISO(),evalConfig:{upPeriods:defaultUpPeriods()},ui:{scoreMode:'numeric',evaluationPeriod:'eval1',openWarmup:null,openUp3RPE:null,openUp3Task:null,openUp4Game:null,openSummaryStudent:null,openEvaluateStudent:null}}}
function migrate(raw){const d=defaultState(),s=Object.assign(d,raw||{});s.attendance=s.attendance||{};s.notes=s.notes||{};s.teacherNotes=s.teacherNotes||{};s.rubricMarks=s.rubricMarks||{};s.fitness=s.fitness||{};s.reflections=s.reflections||{};s.warmups=s.warmups||{};s.up3RPE=s.up3RPE||{};s.up3Tasks=s.up3Tasks||{};s.up4Game=s.up4Game||{};s.photos=s.photos||{};s.qual=s.qual||{};Object.keys(s.qual).forEach(k=>{const v=s.qual[k];if(v==='En proceso')s.qual[k]=4;else if(v==='Adecuado')s.qual[k]=8;else if(v==='Consolidado')s.qual[k]=10});s.selectedDate=s.selectedDate||todayISO();const old=s.evalConfig||{},periods=Object.assign({},defaultUpPeriods(),old.upPeriods||{});if(!old.upPeriods&&(old.firstCut||old.secondCut)){const a=upIndex(old.firstCut||'UP4'),b=upIndex(old.secondCut||'UP10');ups.forEach(([u],i)=>periods[u]=i<=a?'eval1':i<=b?'eval2':'eval3')}s.evalConfig={upPeriods:periods};s.ui=Object.assign({scoreMode:'numeric',evaluationPeriod:'eval1',openWarmup:null,openUp3RPE:null,openUp3Task:null,openUp4Game:null,openSummaryStudent:null,openEvaluateStudent:null},s.ui||{});return s}
function load(){try{return migrate(JSON.parse(localStorage.getItem(APP_KEY)||'{}'))}catch{return defaultState()}}
let state=load();
function save(){localStorage.setItem(APP_KEY,JSON.stringify(state))}
function id(){return Math.random().toString(36).slice(2,10)}
function esc(s=''){return String(s).replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]))}
function toast(msg){let t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),1500)}
function fullGroup(){return state.groups.find(g=>g.id===state.selectedGroup)||state.groups[0]||null}
function group(){return fullGroup()}
function scoreKey(gid,sid,c,seq){return `${gid}|${sid}|${c}|${seq}`}
function qualKey(gid,sid,c,up){return `${gid}|${sid}|${c}|${up}`}
function attendanceKey(gid,sid,date){return `${gid}|${sid}|${date}`}
function noteKey(gid,sid,date){return `${gid}|${sid}|${date}`}
function teacherNoteKey(gid,sid,up){return `${gid}|${sid}|${up}`}
function fitnessKey(gid,sid){return `${gid}|${sid}`}
function reflectionKey(gid,sid){return `${gid}|${sid}`}
function warmupKey(gid,sid){return `${gid}|${sid}`}
function up3RPEKey(gid,sid){return `${gid}|${sid}`}
function up3TaskKey(gid,sid){return `${gid}|${sid}`}
function up4GameKey(gid,sid){return `${gid}|${sid}`}
function photoKey(gid,sid){return `${gid}|${sid}`}
function initials(name=''){return String(name).trim().split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]?.toUpperCase()||'').join('')||'?' }
function avatarHTML(gid,st,size='md'){const src=state.photos[photoKey(gid,st.id)];return src?`<span class="student-avatar ${size}"><img src="${src}" alt="Foto de ${esc(st.name)}"></span>`:`<span class="student-avatar ${size} placeholder">${esc(initials(st.name))}</span>`}
async function compressPhoto(file){return new Promise((resolve,reject)=>{const img=new Image(),url=URL.createObjectURL(file);img.onload=()=>{try{const side=180,c=document.createElement('canvas');c.width=side;c.height=side;const ctx=c.getContext('2d'),scale=Math.max(side/img.width,side/img.height),w=img.width*scale,h=img.height*scale,x=(side-w)/2,y=(side-h)/2;ctx.drawImage(img,x,y,w,h);const out=c.toDataURL('image/jpeg',0.72);URL.revokeObjectURL(url);resolve(out)}catch(e){URL.revokeObjectURL(url);reject(e)}};img.onerror=()=>{URL.revokeObjectURL(url);reject(new Error('No se pudo leer la imagen'))};img.src=url})}

function attendanceStats(g){const vals=g.students.map(s=>state.attendance[attendanceKey(g.id,s.id,state.selectedDate)]||'');return {total:g.students.length,done:vals.filter(Boolean).length,present:vals.filter(v=>v==='P').length,absent:vals.filter(v=>v==='A').length,justified:vals.filter(v=>v==='J').length}}
function allPresent(g){g.students.forEach(s=>state.attendance[attendanceKey(g.id,s.id,state.selectedDate)]='P');save()}
function weightedEvidenceValue(vals,c){if(!vals.length)return null;if(isContinuousCriterion(c)){const recent=vals.slice(-3);const weights=recent.length===1?[1]:recent.length===2?[.2941176471,.7058823529]:[.15,.25,.60];return recent.reduce((a,v,i)=>a+v*weights[i],0)}let num=0,den=0;vals.forEach((v,i)=>{const w=i+1;num+=v*w;den+=w});return num/den}
function criterionValue(gid,sid,c){const vals=[];(evidence[c]||[]).forEach((_,i)=>{const v=state.scores[scoreKey(gid,sid,c,i+1)];if(v!==undefined&&v!==null&&v!=='')vals.push(Number(v))});return weightedEvidenceValue(vals,c)}
function ceValue(gid,sid,ce){let num=0,den=0;criteria.filter(x=>x[1]===ce).forEach(([c,,w])=>{const v=criterionValue(gid,sid,c);if(v!==null){num+=v*w;den+=w}});return den?num/den:null}
function coverage(gid,sid){return criteria.reduce((a,[c,,w])=>a+(criterionValue(gid,sid,c)!==null?w:0),0)}
function finalGrade(gid,sid){let num=0,den=0;criteria.forEach(([c,,w])=>{const v=criterionValue(gid,sid,c);if(v!==null){num+=v*w;den+=w}});return den?num/den:null}

function upIndex(up){return ups.findIndex(x=>x[0]===up)}
function criterionValueRange(gid,sid,c,startUp,endUp){const start=startUp?upIndex(startUp):0,end=endUp?upIndex(endUp):Infinity,es=evidence[c]||[],vals=[];es.forEach((e,i)=>{const ui=upIndex(e[0]);if(ui<start||ui>end)return;const v=state.scores[scoreKey(gid,sid,c,i+1)];if(v!==undefined&&v!==null&&v!=='')vals.push(Number(v))});return weightedEvidenceValue(vals,c)}
function ceValueRange(gid,sid,ce,startUp,endUp){let num=0,den=0;criteria.filter(x=>x[1]===ce).forEach(([c,,w])=>{const v=criterionValueRange(gid,sid,c,startUp,endUp);if(v!==null){num+=v*w;den+=w}});return den?num/den:null}
function coverageRange(gid,sid,startUp,endUp){return criteria.reduce((a,[c,,w])=>a+(criterionValueRange(gid,sid,c,startUp,endUp)!==null?w:0),0)}
function gradeRange(gid,sid,startUp,endUp){let num=0,den=0;criteria.forEach(([c,,w])=>{const v=criterionValueRange(gid,sid,c,startUp,endUp);if(v!==null){num+=v*w;den+=w}});return den?num/den:null}
function assessedCountRange(gid,sid,startUp,endUp){return criteria.filter(([c])=>criterionValueRange(gid,sid,c,startUp,endUp)!==null).length}
function upPeriod(up){return state.evalConfig?.upPeriods?.[up]||defaultUpPeriods()[up]}
function periodUps(period){return ups.filter(([u])=>upPeriod(u)===period).map(([u])=>u)}
function evalRange(period){return {start:null,end:null,ups:period==='final'?ups.map(x=>x[0]):periodUps(period)}}
function evalCut(period){return null}
function evalLabel(period){return period==='eval1'?'1.ª evaluación':period==='eval2'?'2.ª evaluación':period==='eval3'?'3.ª evaluación':'Evaluación final'}
function isContinuousCriterion(c){return c==='3.1'||c==='3.2'||c==='3.3'}
function evidenceInPeriod(c,up,period){if(period==='final')return true;const p=upPeriod(up);if(period==='eval2'&&isContinuousCriterion(c))return p==='eval1'||p==='eval2';if(period==='eval3'&&isContinuousCriterion(c))return p==='eval1'||p==='eval2'||p==='eval3';return p===period}
function criterionValueForPeriod(gid,sid,c,period){const vals=[];(evidence[c]||[]).forEach((e,i)=>{if(!evidenceInPeriod(c,e[0],period))return;const v=state.scores[scoreKey(gid,sid,c,i+1)];if(v!==undefined&&v!==null&&v!=='')vals.push(Number(v))});return weightedEvidenceValue(vals,c)}
function ceValueForPeriod(gid,sid,ce,period){let num=0,den=0;criteria.filter(x=>x[1]===ce).forEach(([c,,w])=>{const v=criterionValueForPeriod(gid,sid,c,period);if(v!==null){num+=v*w;den+=w}});return den?num/den:null}
function coverageForPeriod(gid,sid,period){return criteria.reduce((a,[c,,w])=>a+(criterionValueForPeriod(gid,sid,c,period)!==null?w:0),0)}
function assessedCountForPeriod(gid,sid,period){return criteria.filter(([c])=>criterionValueForPeriod(gid,sid,c,period)!==null).length}
function gradeForPeriod(gid,sid,period){let num=0,den=0;criteria.forEach(([c,,w])=>{const v=criterionValueForPeriod(gid,sid,c,period);if(v!==null){num+=v*w;den+=w}});return den?num/den:null}
function evalRangeText(period){if(period==='final')return 'Acumulativa: todas las evidencias del curso, independientemente del orden real de las UP.';const list=periodUps(period);const names=list.map(u=>`${u} · ${upName(u)}`).join(' · ');if(period==='eval2')return `${names||'Sin UP asignadas'} · CE3 (3.1, 3.2 y 3.3) mantiene trayectoria continua desde la 1.ª evaluación.`;return names||'Sin UP asignadas a este periodo'}
function upHasPrincipalScores(up){for(const g of state.groups){for(const st of g.students){for(const [c] of criteria){for(let i=0;i<(evidence[c]||[]).length;i++){const e=evidence[c][i];if(e[0]!==up)continue;const v=state.scores[scoreKey(g.id,st.id,c,i+1)];if(v!==undefined&&v!==null&&v!=='')return true}}}}return false}
function principalForUP(up){let arr=[];criteria.forEach(([c])=>(evidence[c]||[]).forEach((e,i)=>{if(e[0]===up)arr.push({c,seq:i+1,up:e[0],proc:e[1],desc:e[2]})}));return arr}
function compsForUP(up){let out=[];Object.entries(compMatrix).forEach(([c,arr])=>arr.forEach(u=>{if(u===up)out.push({c,up:u})}));return out}
function upName(up){return ups.find(x=>x[0]===up)?.[1]||up}
function groupSelectors(){return `<div class="row"><div><label>Grupo</label><select id="groupSel">${state.groups.map(g=>`<option value="${g.id}" ${g.id===state.selectedGroup?'selected':''}>${esc(g.name)}</option>`).join('')}</select></div><div><label>Unidad</label><select id="upSel">${ups.map(([u,n])=>`<option value="${u}" ${u===state.selectedUP?'selected':''}>${u} · ${esc(n)}</option>`).join('')}</select></div></div>`}
function render(){document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.toggle('active',b.dataset.view===currentView));const fn={inicio:viewInicio,sesion:viewSesion,evaluar:viewEvaluar,resumen:viewResumen,ajustes:viewAjustes}[currentView];document.getElementById('app').innerHTML=fn();bind()}
function viewInicio(){const g=group(),n=g?g.students.length:0;return `<div class="card"><h2>Panel del curso</h2><div class="grid"><div class="metric"><span>Grupo</span><strong>${g?esc(g.name):'—'}</strong></div><div class="metric"><span>Alumnado</span><strong>${n}</strong></div><div class="metric"><span>UP actual</span><strong>${state.selectedUP}</strong></div><div class="metric"><span>Hoy</span><strong>${state.selectedDate.slice(8,10)}/${state.selectedDate.slice(5,7)}</strong></div></div></div>
<div class="card"><h3>Acción rápida</h3>${g?`<div class="toolbar"><button class="btn" data-go="sesion">Abrir sesión de hoy</button><button class="btn secondary" data-go="evaluar">Evaluar ●</button><button class="btn secondary" data-go="resumen">Ver progreso</button></div>`:`<div class="empty">Crea tu primer grupo en Ajustes para empezar.</div>`}</div>
<div class="card"><h3>Regla del cuaderno</h3><p>No acumula “notas de tareas”: acumula <b>evidencias sobre criterios</b>. La asistencia y las observaciones de sesión se registran, pero <b>no entran automáticamente en la calificación</b>.</p></div>`}
function viewSesion(){const g=group();if(!g)return `<div class="card empty">Primero crea un grupo en Ajustes.</div>`;const evs=principalForUP(state.selectedUP),comps=compsForUP(state.selectedUP),st=attendanceStats(g);return `${groupSelectors()}<div class="card session-summary-card"><div class="session-head"><div><label>Fecha de sesión</label><input class="session-date" type="date" id="dateSel" value="${state.selectedDate}"></div><div><h2>Sesión · ${state.selectedUP}</h2><div class="muted">${esc(upName(state.selectedUP))}</div></div></div></div>
<div class="card attendance-card"><div class="attendance-head"><div><h3>Asistencia y observación rápida</h3><p class="muted">P = presente · A = ausente · J = ausencia justificada. Este registro no genera nota.</p></div><div class="attendance-tools"><div class="session-counter"><b id="attDone">${st.done}/${st.total}</b><span>registrados</span></div><button class="btn small secondary" id="allPresentBtn">Todos presentes</button></div></div><div id="attendanceList">${attendanceHTML(g)}</div></div>
<div class="card"><h3>Evidencias principales ●</h3>${evs.length?evs.map((e,i)=>`<div class="evidence-card"><div><span class="pill main">● ${e.c}</span> <b>${esc(e.desc)}</b><div class="tiny">${esc(e.proc)} · ${scoredCount(g,e)}/${g.students.length} registrados</div></div><button class="btn small" data-open-evidence="${i}">Evaluar</button></div>`).join(''):`<div class="empty">No hay evidencias principales previstas en esta UP.</div>`}</div>
<div class="card"><h3>Evaluación continua ○</h3>${comps.length?`<p class="muted">Los criterios de seguimiento continuo de esta UP se registran directamente en <b>Evaluar</b> con la escala 2 · 4 · 6 · 8 · 10.</p><button class="btn secondary" data-go="evaluar">Abrir Evaluación continua</button>`:`<div class="empty">No hay criterios de evaluación continua previstos en esta UP.</div>`}</div><div id="sessionOverlay"></div>`}
function attendanceHTML(g){return g.students.map((s,idx)=>{const k=attendanceKey(g.id,s.id,state.selectedDate),v=state.attendance[k]||'';const note=state.notes[noteKey(g.id,s.id,state.selectedDate)]||'';return `<div class="student-row attendance-row"><div class="student-name student-with-avatar">${avatarHTML(g.id,s,'sm')}<span class="student-index">${idx+1}</span><div class="student-name-text"><b>${esc(s.name)}</b>${note?`<div class="tiny note-preview">📝 ${esc(note).slice(0,54)}${note.length>54?'…':''}</div>`:''}</div></div><div class="attendance-actions"><div class="attendance">${[['P','present'],['A','absent'],['J','justified']].map(([x,cl])=>`<button class="${cl} ${v===x?'active':''}" data-att="${x}" data-att-key="${k}" aria-label="${x==='P'?'Presente':x==='A'?'Ausente':'Ausencia justificada'} ${esc(s.name)}">${x}</button>`).join('')}</div><button class="note-btn" data-note-student="${s.id}" title="Observación">📝</button></div></div>`}).join('')}
function scoredCount(g,ev){return g.students.filter(s=>{const v=state.scores[scoreKey(g.id,s.id,ev.c,ev.seq)];return v!==undefined&&v!==null&&v!==''}).length}

function fitnessPassportHTML(){
 const g=group();if(!g||state.selectedUP!=='UP1')return '';
 return `<div class="card fitness-passport"><div class="fitness-title"><div><h2>Pasaporte de la condición física</h2><p class="muted">Registro diagnóstico. Las marcas físicas <b>no generan nota automática</b>; sirven para conocer, interpretar y regular el propio esfuerzo.</p></div><span class="pill main">UP1</span></div>
 ${g.students.map((st,idx)=>{const k=fitnessKey(g.id,st.id),v=state.fitness[k]||{};return `<details class="fitness-student" ${idx===0?'open':''}><summary><div class="student-with-avatar">${avatarHTML(g.id,st,'sm')}<div class="student-name-text"><b>${esc(st.name)}</b></div></div><span>${Object.values(v).filter(x=>x!==''&&x!=null).length}/7 datos</span></summary><div class="fitness-grid">
 <label><span>10 min · distancia</span><div class="unit-input"><input inputmode="decimal" data-fit-key="${k}" data-fit-field="run10distance" value="${esc(v.run10distance??'')}" placeholder="0"><em>m</em></div></label>
 <label><span>10 min · paradas</span><div class="unit-input"><input inputmode="numeric" data-fit-key="${k}" data-fit-field="run10stops" value="${esc(v.run10stops??'')}" placeholder="0"><em>n.º</em></div></label>
 <label><span>10 min · RPE</span><div class="unit-input"><input inputmode="decimal" data-fit-key="${k}" data-fit-field="rpe" value="${esc(v.rpe??'')}" placeholder="0–10"><em>/10</em></div></label>
 <label><span>Balón medicinal</span><div class="unit-input"><input inputmode="decimal" data-fit-key="${k}" data-fit-field="medicine" value="${esc(v.medicine??'')}" placeholder="0,00"><em>m</em></div></label>
 <label><span>Agilidad 10×5</span><div class="unit-input"><input inputmode="decimal" data-fit-key="${k}" data-fit-field="agility" value="${esc(v.agility??'')}" placeholder="0,00"><em>s</em></div></label>
 <label><span>Regla de Galton</span><div class="unit-input"><input inputmode="decimal" data-fit-key="${k}" data-fit-field="galton" value="${esc(v.galton??'')}" placeholder="0,0"><em>cm</em></div></label>
 <label><span>Velocidad 20 m</span><div class="unit-input"><input inputmode="decimal" data-fit-key="${k}" data-fit-field="speed20" value="${esc(v.speed20??'')}" placeholder="0,00"><em>s</em></div></label>
 </div></details>`}).join('')}</div>`
}

function up1ReflectionHTML(){
 const g=group();if(!g||state.selectedUP!=='UP1')return '';
 const caps=['Resistencia','Fuerza','Agilidad','Velocidad de reacción','Velocidad'];
 const effort=['Muy suave (RPE 1–2)','Suave (RPE 3–4)','Moderado (RPE 5–6)','Intenso (RPE 7–8)','Muy intenso (RPE 9–10)'];
 const autonomy=['Necesité ayuda frecuente','Necesité alguna ayuda','Me regulé de forma autónoma','Me regulé y ajusté mi estrategia de forma autónoma'];
 return `<div class="card reflection-card"><div class="fitness-title"><div><h2>Reflexión y autoevaluación</h2><p class="muted">El alumnado interpreta su Pasaporte y explica sus decisiones. <b>No genera nota automática</b>; aporta evidencia para justificar 1.1 y 1.6.</p></div><span class="pill main">UP1</span></div>
 ${g.students.map((st,idx)=>{const k=reflectionKey(g.id,st.id),v=state.reflections[k]||{};const fields=['effort','strength','improve','evidence','decision','autonomy'];const done=fields.filter(f=>v[f]!==undefined&&String(v[f]).trim()!=='').length;return `<details class="reflection-student" ${idx===0?'open':''}><summary><div class="student-with-avatar">${avatarHTML(g.id,st,'sm')}<div class="student-name-text"><b>${esc(st.name)}</b></div></div><span class="reflection-count">${done}/6 respuestas</span></summary><div class="reflection-grid">
 <label><span>¿Cómo percibiste tu esfuerzo en los 10 minutos?</span><select data-ref-key="${k}" data-ref-field="effort"><option value="">— Selecciona —</option>${effort.map(x=>`<option value="${esc(x)}" ${v.effort===x?'selected':''}>${esc(x)}</option>`).join('')}</select></label>
 <label><span>Capacidad que considero más desarrollada</span><select data-ref-key="${k}" data-ref-field="strength"><option value="">— Selecciona —</option>${caps.map(x=>`<option value="${esc(x)}" ${v.strength===x?'selected':''}>${esc(x)}</option>`).join('')}</select></label>
 <label><span>Capacidad que necesito mejorar</span><select data-ref-key="${k}" data-ref-field="improve"><option value="">— Selecciona —</option>${caps.map(x=>`<option value="${esc(x)}" ${v.improve===x?'selected':''}>${esc(x)}</option>`).join('')}</select></label>
 <label><span>¿Cómo regulaste el esfuerzo?</span><select data-ref-key="${k}" data-ref-field="autonomy"><option value="">— Selecciona —</option>${autonomy.map(x=>`<option value="${esc(x)}" ${v.autonomy===x?'selected':''}>${esc(x)}</option>`).join('')}</select></label>
 <label class="reflection-wide"><span>¿Qué dato o sensación del Pasaporte apoya tu valoración?</span><textarea rows="2" data-ref-key="${k}" data-ref-field="evidence" placeholder="Ej.: mantuve un RPE 7, hice dos paradas y pude recuperar el ritmo...">${esc(v.evidence??'')}</textarea></label>
 <label class="reflection-wide"><span>Una decisión concreta y realista para mejorar</span><textarea rows="2" data-ref-key="${k}" data-ref-field="decision" placeholder="Ej.: correré 15 minutos dos días por semana a ritmo continuo...">${esc(v.decision??'')}</textarea></label>
 </div></details>`}).join('')}</div>`;
}


function up2WarmupInstrumentHTML(){
 const g=group();if(!g||state.selectedUP!=='UP2')return '';
 const indicators=[
  ['structure','Estructura','Incluye activación, movilidad y tareas específicas en un orden coherente.'],
  ['progression','Progresión','Aumenta gradualmente la intensidad y prepara al grupo para la actividad posterior.'],
  ['exercises','Selección de ejercicios','Escoge ejercicios pertinentes, variados y seguros.'],
  ['adaptation','Adecuación','Relaciona el calentamiento con la actividad que se realizará después.'],
  ['direction','Dirección','Explica, demuestra y conduce al grupo con claridad y autonomía.'],
  ['management','Gestión','Organiza adecuadamente tiempo, espacio, material y transiciones.']
 ];
 const labels=['—','Inicio','Básico','Adecuado','Avanzado'];
 const ev=(evidence['1.2']||[]).map((e,i)=>({e,seq:i+1})).find(x=>x.e[0]==='UP2');
 return `<div class="card warmup-card"><div class="fitness-title"><div><h2>Instrumento · Diseño y dirección del calentamiento</h2><p class="muted">Toca un alumno para abrir únicamente su ficha. Al registrar el nivel, se pliega y pasa al siguiente. Los seis indicadores <b>no son seis notas</b>: orientan una única evidencia del criterio 1.2.</p></div><span class="pill main">UP2 · 1.2</span></div>
 ${g.students.map((st,idx)=>{const k=warmupKey(g.id,st.id),v=state.warmups[k]||{};const vals=indicators.map(([f])=>Number(v[f])||0).filter(Boolean);const done=vals.length;const avg=done===indicators.length?vals.reduce((a,b)=>a+b,0)/vals.length:null;const suggested=avg===null?null:(avg<1.75?4:avg<2.75?6:avg<3.75?8:10);const level=suggested===4?'Inicio':suggested===6?'Básico':suggested===8?'Adecuado':suggested===10?'Avanzado':'';const scoreKeyUP2=ev?scoreKey(g.id,st.id,'1.2',ev.seq):'';const registered=scoreKeyUP2&&state.scores[scoreKeyUP2]!==undefined&&state.scores[scoreKeyUP2]!=='';const open=state.ui.openWarmup===st.id;return `<details id="warm-${st.id}" data-warm-student="${st.id}" class="warmup-student compact-instrument" ${open?'open':''}><summary><div class="warmup-summary-left">${avatarHTML(g.id,st,'sm')}<div><b>${esc(st.name)}</b><span class="warmup-count">${done}/6 indicadores</span></div></div><div class="warmup-summary-right">${suggested?`<span class="instrument-result ${registered?'registered':''}">${level} · ${suggested}${registered?' ✓':''}</span>`:`<span class="instrument-pending">Sin valorar</span>`}<span class="chev">›</span></div></summary><div class="warmup-body">
 ${indicators.map(([f,name,help])=>`<div class="warmup-indicator"><div><b>${name}</b><small>${help}</small></div><div class="indicator-buttons">${[1,2,3,4].map(n=>`<button type="button" data-warm-key="${k}" data-warm-field="${f}" data-warm-value="${n}" class="${Number(v[f])===n?'selected':''}">${labels[n]}</button>`).join('')}</div></div>`).join('')}
 <div class="warmup-suggestion">${suggested?`<div><span>Sugerencia del instrumento</span><strong>${level} · ${suggested}</strong><small>La decisión final sigue siendo docente y puede modificarse después.</small></div><button class="btn small" data-apply-warmup="${k}" data-warm-score="${suggested}" data-warm-level="${level}">${registered?'Actualizar':'Registrar'} ${suggested} en 1.2</button>`:`<div><span>Sugerencia del instrumento</span><strong>Completa los 6 indicadores</strong><small>No se propone nivel hasta completar la observación.</small></div>`}</div>
 </div></details>`}).join('')}</div>`;
}


function up3RPEHTML(){
 const g=group();if(!g||state.selectedUP!=='UP3')return '';
 return `<div class="card up3-rpe-card"><div class="fitness-title"><div><h2>Regulación del esfuerzo · RPE</h2><p class="muted">Conecta el RPE diagnóstico de UP1 con la previsión y la respuesta real en UP3. <b>No genera nota automática</b>; aporta evidencia para 1.6.</p></div><span class="pill main">UP3 · 1.6</span></div>
 <div class="rpe-legend"><span><b>Referencia UP1</b> = RPE del Pasaporte</span><span><b>Diferencia</b> = real − previsto</span></div>
 ${g.students.map((st,idx)=>{const k=up3RPEKey(g.id,st.id),records=Array.isArray(state.up3RPE[k])?state.up3RPE[k]:[],fit=state.fitness[fitnessKey(g.id,st.id)]||{},ref=fit.rpe??'';const open=state.ui.openUp3RPE===st.id;const trend=records.slice(-4).map(r=>`${r.planned}→${r.actual}`).join(' · ');return `<details id="rpe-${st.id}" data-rpe-student="${st.id}" class="up3-rpe-student" ${open?'open':''}><summary><div class="student-with-avatar">${avatarHTML(g.id,st,'sm')}<div class="student-name-text"><b>${esc(st.name)}</b><div class="tiny">Referencia UP1: ${ref!==''?`RPE ${esc(ref)}`:'sin RPE'}${trend?` · Evolución ${esc(trend)}`:''}</div></div></div><span>${records.length} registros</span></summary><div class="up3-rpe-body">
 <div class="rpe-reference"><div><span>RPE referencia UP1</span><strong>${ref!==''?esc(ref):'—'}</strong></div><small>Se recupera automáticamente del Pasaporte de condición física.</small></div>
 <div class="rpe-entry-grid">
  <label><span>RPE previsto</span><input inputmode="decimal" min="0" max="10" data-rpe-planned="${k}" placeholder="0–10"></label>
  <label><span>RPE real</span><input inputmode="decimal" min="0" max="10" data-rpe-actual="${k}" placeholder="0–10"></label>
  <label><span>Regulación observada</span><select data-rpe-regulation="${k}"><option value="">— Selecciona —</option><option>Ajustó el ritmo correctamente</option><option>Ajustó parcialmente</option><option>No necesitó ajuste</option><option>No ajustó el esfuerzo</option></select></label>
  <label class="rpe-wide"><span>Reflexión breve</span><input data-rpe-note="${k}" placeholder="Ej.: salí demasiado rápido y reduje el ritmo"></label>
 </div>
 <button class="btn rpe-save" data-save-rpe="${k}" data-rpe-sid="${st.id}">Guardar intento</button>
 ${records.length?`<div class="rpe-history"><h3>Intentos registrados</h3>${records.slice().reverse().map((r,ri)=>{const diff=(Number(r.actual)-Number(r.planned));const sign=diff>0?'+':'';return `<div class="rpe-history-row"><div><b>${esc(r.date||'')}</b><span>Previsto ${esc(r.planned)} → Real ${esc(r.actual)} · Δ ${sign}${Number.isFinite(diff)?diff.toFixed(1):'—'}</span><small>${esc(r.regulation||'')}${r.note?` · ${esc(r.note)}`:''}</small></div><button class="rpe-delete" data-del-rpe="${k}" data-del-rpe-index="${records.length-1-ri}" aria-label="Borrar intento">×</button></div>`}).join('')}</div>`:''}
 </div></details>`}).join('')}</div>`;
}


function up3TaskInstrumentHTML(){
 const g=group();if(!g||state.selectedUP!=='UP3')return '';
 const indicators=[
  ['identify','1.1','Identifica capacidad y objetivo','Reconoce qué capacidad física trabaja y explica el objetivo básico de la tarea.'],
  ['health','1.1','Relaciona tarea y salud','Relaciona la tarea con efectos razonables sobre condición física, bienestar o salud.'],
  ['selection','1.2','Selecciona y ejecuta tareas','Realiza o selecciona ejercicios adecuados al objetivo y a su nivel.'],
  ['safety','1.2','Progresión y seguridad','Ajusta progresión, técnica, pausas y seguridad de forma adecuada.']
 ];
 const levels=[['Inicio',1],['Básico',2],['Adecuado',3],['Avanzado',4]];
 const ev11=(evidence['1.1']||[]).map((e,i)=>({e,seq:i+1})).find(x=>x.e[0]==='UP3');
 const ev12=(evidence['1.2']||[]).map((e,i)=>({e,seq:i+1})).find(x=>x.e[0]==='UP3');
 function suggestion(v,criterion){const vals=indicators.filter(x=>x[1]===criterion).map(([f])=>Number(v[f])||0).filter(Boolean);if(vals.length!==2)return null;const avg=vals.reduce((a,b)=>a+b,0)/2;const score=avg<1.5?4:avg<2.5?6:avg<3.5?8:10;return {score,label:score===4?'Inicio':score===6?'Básico':score===8?'Adecuado':'Avanzado'}}
 return `<div class="card up3-task-card"><div class="fitness-title"><div><h2>Reto CFB · instrumento analítico</h2><p class="muted">Cuatro indicadores orientan dos evidencias principales: <b>1.1</b> comprensión y aplicación saludable de las CFB, y <b>1.2</b> selección, ejecución, progresión y seguridad. <b>No son cuatro notas.</b></p></div><span class="pill main">UP3 · 1.1 + 1.2</span></div>
 ${g.students.map(st=>{const k=up3TaskKey(g.id,st.id),v=state.up3Tasks[k]||{},done=indicators.filter(([f])=>Number(v[f])).length,s11=suggestion(v,'1.1'),s12=suggestion(v,'1.2'),open=state.ui.openUp3Task===st.id;const k11=ev11?scoreKey(g.id,st.id,'1.1',ev11.seq):'',k12=ev12?scoreKey(g.id,st.id,'1.2',ev12.seq):'',r11=k11&&state.scores[k11]!==undefined&&state.scores[k11]!=='',r12=k12&&state.scores[k12]!==undefined&&state.scores[k12]!=='';return `<details id="cfb-${st.id}" data-up3-task-student="${st.id}" class="warmup-student compact-instrument up3-task-student" ${open?'open':''}><summary><div class="warmup-summary-left">${avatarHTML(g.id,st,'sm')}<div><b>${esc(st.name)}</b><span class="warmup-count">${done}/4 indicadores</span></div></div><div class="warmup-summary-right">${s11&&s12?`<span class="instrument-result ${(r11&&r12)?'registered':''}">1.1 ${s11.score} · 1.2 ${s12.score}${(r11&&r12)?' ✓':''}</span>`:`<span class="instrument-pending">Sin completar</span>`}<span class="chev">›</span></div></summary><div class="warmup-body">
 ${indicators.map(([f,c,name,help])=>`<div class="warmup-indicator up3-indicator"><div><span class="pill ${c==='1.1'?'main':'comp'}">${criterionLabel(c)}</span><b>${name}</b><small>${help}</small></div><div class="indicator-buttons">${levels.map(([label,n])=>`<button type="button" data-up3-task-key="${k}" data-up3-task-field="${f}" data-up3-task-value="${n}" class="${Number(v[f])===n?'selected':''}">${label}</button>`).join('')}</div></div>`).join('')}
 <div class="up3-task-suggestions"><div class="warmup-suggestion"><div><span>Sugerencia 1.1</span><strong>${s11?`${s11.label} · ${s11.score}`:'Completa sus 2 indicadores'}</strong><small>Juicio docente final.</small></div>${s11?(r11&&Number(state.scores[k11])===s11.score?`<span class="registered-confirm">✓ Registrado · ${s11.score} en 1.1</span>`:`<button class="btn small" data-apply-up3-task="${k}" data-up3-task-sid="${st.id}" data-up3-task-criterion="1.1" data-up3-task-score="${s11.score}" data-up3-task-level="${s11.label}">${r11?'Actualizar a':'Registrar'} ${s11.score}</button>`):''}</div>
 <div class="warmup-suggestion"><div><span>Sugerencia 1.2</span><strong>${s12?`${s12.label} · ${s12.score}`:'Completa sus 2 indicadores'}</strong><small>Juicio docente final.</small></div>${s12?(r12&&Number(state.scores[k12])===s12.score?`<span class="registered-confirm">✓ Registrado · ${s12.score} en 1.2</span>`:`<button class="btn small" data-apply-up3-task="${k}" data-up3-task-sid="${st.id}" data-up3-task-criterion="1.2" data-up3-task-score="${s12.score}" data-up3-task-level="${s12.label}">${r12?'Actualizar a':'Registrar'} ${s12.score}</button>`):''}</div></div>
 <div class="up3-rpe-link"><b>1.6 · Regulación responsable del esfuerzo</b><span>Se fundamenta con los intentos RPE previsto → real del bloque superior y se registra como evidencia principal desde “Evidencias principales ●”.</span></div>
 </div></details>`}).join('')}</div>`;
}

function up4GameInstrumentHTML(){
 if(state.selectedUP!=='UP4')return '';
 const g=group();if(!g)return '';
 const levels=[['Muy inicial',2],['Inicio',4],['Básico',6],['Adecuado',8],['Avanzado',10]];
 const indicators=[
  ['2.2','Toma de decisiones','Se coloca, anticipa la trayectoria y elige el golpeo o respuesta más adecuada a la situación.'],
  ['2.3','Resolución técnico-táctica','Mantiene el intercambio y resuelve situaciones de juego con control, continuidad y eficacia.'],
  ['2.4','Reglas y autoevaluación','Aplica las reglas básicas, reconoce errores propios y ajusta su actuación durante el juego.'],
  ['3.1','Participación y deportividad','Participa activamente, acepta resultados y decisiones y regula su conducta en el juego.'],
  ['3.3','Respeto y convivencia','Respeta a compañeros y oponentes, cuida el material y cumple normas y acuerdos.']
 ];
 const evMap={};
 indicators.forEach(([c])=>{evMap[c]=(evidence[c]||[]).map((e,i)=>({e,seq:i+1})).find(x=>x.e[0]==='UP4')});
 return `<div class="card up4-game-card"><div class="fitness-title"><div><h2>Juego real/modificado · Bádminton</h2><p class="muted">Instrumento de observación en situación de juego. Cinco focos permiten registrar una única evidencia principal por criterio. <b>No evalúa el resultado del partido</b>, sino las decisiones, la resolución motriz y las conductas observables.</p></div><span class="pill main">UP4 · juego real</span></div>
 ${g.students.map(st=>{const k=up4GameKey(g.id,st.id),v=state.up4Game[k]||{},done=indicators.filter(([c])=>Number(v[c])).length,open=state.ui.openUp4Game===st.id;return `<details id="bad-${st.id}" data-up4-game-student="${st.id}" class="warmup-student compact-instrument up4-game-student" ${open?'open':''}><summary><div class="warmup-summary-left">${avatarHTML(g.id,st,'sm')}<div><b>${esc(st.name)}</b><span class="warmup-count">${done}/5 criterios observados</span></div></div><div class="warmup-summary-right">${done===5?`<span class="instrument-result registered">Completo ✓</span>`:`<span class="instrument-pending">${done?`${done}/5`:'Sin completar'}</span>`}<span class="chev">›</span></div></summary><div class="warmup-body">
 ${indicators.map(([c,name,help])=>{const val=Number(v[c])||0,ev=evMap[c],sk=ev?scoreKey(g.id,st.id,c,ev.seq):'',registered=sk&&state.scores[sk]!==undefined&&state.scores[sk]!=='',same=registered&&Number(state.scores[sk])===val,lab=levels.find(x=>x[1]===val)?.[0]||'';return `<div class="warmup-indicator up4-indicator"><div class="up4-indicator-head"><div class="up4-criterion-row"><span class="pill main">${criterionLabel(c)}</span></div><div class="up4-focus-title">${name}</div><small>${help}</small></div><div class="indicator-buttons">${levels.map(([label,n])=>`<button type="button" data-up4-game-key="${k}" data-up4-game-sid="${st.id}" data-up4-game-criterion="${c}" data-up4-game-value="${n}" class="${val===n?'selected':''}">${label}</button>`).join('')}</div>${val?`<div class="criterion-register-row"><span><b>${lab} · ${val}</b><small>Juicio docente final.</small></span>${same?`<span class="registered-confirm">✓ Registrado · ${val} en ${c}</span>`:`<button class="btn small" data-apply-up4-game="${k}" data-up4-game-sid="${st.id}" data-up4-game-criterion="${c}" data-up4-game-score="${val}" data-up4-game-level="${lab}">${registered?'Actualizar a':'Registrar'} ${val}</button>`}</div>`:''}</div>`}).join('')}
 </div></details>`}).join('')}
 </div>`;
}


function activeEvalSid(){
 const g=fullGroup();if(!g||!g.students.length)return null;
 const sid=state.ui.openEvaluateStudent;
 return g.students.some(st=>st.id===sid)?sid:g.students[0].id;
}
function activeEvalStudent(){const g=fullGroup(),sid=activeEvalSid();return g?.students.find(st=>st.id===sid)||null}
function evaluateStudentNavHTML(){
 const g=fullGroup(),sid=activeEvalSid();if(!g||!sid)return '';
 const i=g.students.findIndex(x=>x.id===sid),st=g.students[i],prev=g.students[i-1],next=g.students[i+1];
 return `<div class="eval-fast-nav stable-nav"><button type="button" class="btn secondary eval-nav-btn" data-eval-jump="${prev?.id||''}" ${prev?'':'disabled'}>‹ Anterior</button><div class="eval-fast-position">${avatarHTML(g.id,st,'sm')}<div class="eval-student-name-block"><b>${esc(st.name)}</b><span>${i+1}/${g.students.length}</span></div></div><button type="button" class="btn eval-nav-btn" data-eval-jump="${next?.id||''}" ${next?'':'disabled'}>Siguiente ›</button></div>`
}
function quickEvaluationHTML(evs){
 const g=fullGroup(),sid=activeEvalSid();if(!g||!sid)return '';
 const st=g.students.find(x=>x.id===sid);if(!st)return '';
 const scored=evs.filter(ev=>{const v=state.scores[scoreKey(g.id,sid,ev.c,ev.seq)];return v!==undefined&&v!==null&&v!==''}).length;
 const levels=[2,4,6,8,10],ctx=quickEvalContext[state.selectedUP];
 const rows=evs.map((ev,i)=>{const k=scoreKey(g.id,sid,ev.c,ev.seq),v=state.scores[k],done=v!==undefined&&v!==null&&v!=='',rubric=rubricFor(ev),mark=state.rubricMarks[k],focus=quickFocus(ev.up,ev.c,ev.desc);
  return `<div class="quick-eval-row ${done?'done':''}">
   <div class="quick-eval-head"><div><span class="pill main">${criterionLabel(ev.c)}</span><b class="quick-focus">${esc(focus)}</b></div><span class="quick-status">${done?`✓ ${mark?.label?esc(mark.label)+' · ':''}${v}`:'Pendiente'}</span></div>
   <div class="quick-evidence-label">Evidencia: ${esc(ev.desc)}</div>
   <div class="quick-score-buttons">${levels.map(n=>{const r=rubric.find(x=>Number(x.score)===n);return `<button type="button" data-quick-score="${n}" data-quick-key="${k}" data-quick-c="${ev.c}" data-quick-seq="${ev.seq}" data-quick-up="${ev.up}" data-quick-desc="${esc(ev.desc)}" data-quick-level="${esc(r?.label||'')}" data-quick-rubric-desc="${esc(r?.desc||'')}" class="${Number(v)===n?'selected':''}"><strong>${n}</strong><small>${esc(r?.label||'')}</small></button>`}).join('')}</div>
   <details class="quick-native-details"><summary>Ver qué significa cada nivel</summary><div class="quick-rubric-grid">${rubric.map(r=>`<div><b>${r.score} · ${esc(r.label)}</b><span>${esc(r.desc)}</span></div>`).join('')}</div></details>
   ${done?`<button type="button" class="quick-clear" data-quick-clear="${k}">Borrar</button>`:''}
  </div>`}).join('');
 return `<div class="card quick-eval-card"><div class="quick-eval-title"><div><h2>Evaluación rápida</h2><p>${scored}/${evs.length} criterios registrados · guardado automático</p></div><span class="quick-progress ${scored===evs.length&&evs.length?'complete':''}">${scored}/${evs.length}</span></div>
 ${ctx?`<div class="quick-context"><b>${esc(ctx.title)}</b><span>${esc(ctx.what)}</span></div>`:''}
 ${evs.length?rows:`<div class="empty">No hay evidencias principales ● en esta UP.</div>`}</div>`;
}
function continuousEvaluationHTML(comps){
 const g=fullGroup(),sid=activeEvalSid();if(!g||!sid)return '';
 const levels=[2,4,6,8,10],labels={2:'No adquirido',4:'En proceso',6:'Básico',8:'Adecuado',10:'Consolidado'};
 const scored=comps.filter(ev=>{const v=state.qual[qualKey(g.id,sid,ev.c,ev.up)];return v!==undefined&&v!==null&&v!==''}).length;
 const rows=comps.map(ev=>{const k=qualKey(g.id,sid,ev.c,ev.up),v=state.qual[k],done=v!==undefined&&v!==null&&v!=='';
  return `<div class="quick-eval-row continuous-row ${done?'done':''}">
   <div class="quick-eval-head"><div><span class="pill continuous">○ ${criterionLabel(ev.c)}</span><b class="quick-focus">${esc(quickFocus(ev.up,ev.c,criterionDescriptors?.[ev.c]||''))}</b></div><span class="quick-status continuous-status">${done?`✓ ${labels[Number(v)]||''} · ${v}`:'Pendiente'}</span></div>
   <div class="quick-evidence-label continuous-label">Evaluación continua · observación y seguimiento del criterio</div>
   <div class="quick-score-buttons continuous-score-buttons">${levels.map(n=>`<button type="button" data-cont-score="${n}" data-cont-key="${k}" class="${Number(v)===n?'selected':''}"><strong>${n}</strong><small>${labels[n]}</small></button>`).join('')}</div>
   ${done?`<button type="button" class="quick-clear" data-cont-clear="${k}">Borrar</button>`:''}
  </div>`}).join('');
 return `<div class="card quick-eval-card continuous-eval-card"><div class="quick-eval-title"><div><h2>Evaluación continua</h2><p>${scored}/${comps.length} seguimientos registrados · guardado automático</p></div><span class="quick-progress continuous-progress ${scored===comps.length&&comps.length?'complete':''}">${scored}/${comps.length}</span></div>
 <div class="quick-context continuous-context"><b>○ Evaluación continua</b><span>Escala 2 · 4 · 6 · 8 · 10. Registro continuo diferenciado de las evidencias principales ●.</span></div>
 ${comps.length?rows:`<div class="empty">No hay criterios de evaluación continua previstos en esta UP.</div>`}</div>`;
}
function teacherAnnotationsHTML(){
 const g=fullGroup(),sid=activeEvalSid();if(!g||!sid)return '';
 const k=teacherNoteKey(g.id,sid,state.selectedUP),note=state.teacherNotes[k]||'';
 return `<div class="card teacher-annotations"><div class="teacher-annotations-head"><div><h3>Anotaciones profesor</h3><p class="muted">Anotación personal de este alumno en ${state.selectedUP}.</p></div><span class="teacher-note-count" data-teacher-count="${k}">${note.length}/500</span></div><textarea rows="4" maxlength="500" data-teacher-note="${k}" placeholder="Escribe aquí tus anotaciones sobre este alumno en esta unidad…">${esc(note)}</textarea><p class="tiny">Guardado automático. No modifica por sí sola la calificación.</p></div>`;
}
function viewEvaluar(){
 const g=fullGroup();if(!g)return `<div class="card empty">Primero crea un grupo en Ajustes.</div>`;
 if(!g.students.length)return `${groupSelectors()}<div class="card empty">Añade alumnado al grupo para poder evaluar.</div>`;
 const sid=activeEvalSid(),evs=principalForUP(state.selectedUP),comps=compsForUP(state.selectedUP);
 return `${groupSelectors()}<div class="card eval-student-picker"><div class="eval-picker-head"><div><h2>Evaluar</h2><p class="muted">Un alumno cada vez. Cambia de alumno sin salir de la unidad.</p></div><span class="pill main">${state.selectedUP}</span></div><label>Alumno</label><select id="evalStudentSel">${g.students.map(st=>`<option value="${st.id}" ${st.id===sid?'selected':''}>${esc(st.name)}</option>`).join('')}</select>${evaluateStudentNavHTML()}</div>${quickEvaluationHTML(evs)}${continuousEvaluationHTML(comps)}${teacherAnnotationsHTML()}${evaluateStudentNavHTML()}`;
}
function scoreListHTML(ev){const g=group();if(!g)return '';const mode=state.ui.scoreMode,rubric=rubricFor(ev);return g.students.map(s=>{const k=scoreKey(g.id,s.id,ev.c,ev.seq),v=state.scores[k],mark=state.rubricMarks[k];let controls='';if(mode==='levels'){controls=`<div class="level-buttons rubric-buttons">${rubric.map(x=>`<button data-score="${x.score}" data-key="${k}" data-level="${x.label}" data-desc="${esc(x.desc)}" class="${mark?.label===x.label||(!mark&&String(v)===String(x.score))?'selected':''}">${x.label}<small>${x.score}</small></button>`).join('')}</div>${v!==undefined&&v!==''?`<button class="clear-score-text" data-clear="${k}">Borrar valoración</button>`:''}`}else{controls=`<div class="score-buttons">${[2,4,5,6,7,8,9,10].map(x=>`<button data-score="${x}" data-key="${k}" class="${String(v)===String(x)?'selected':''}">${x}</button>`).join('')}${v!==undefined&&v!==''?`<button class="clear-score-inline" data-clear="${k}" title="Borrar valoración">×</button>`:''}</div>`}return `<div class="student-row compact-score-row"><div class="student-name student-with-avatar">${avatarHTML(g.id,s,'sm')}<div class="student-name-text"><b>${esc(s.name)}</b><div class="tiny">Criterio ${ev.c}${v!==undefined&&v!==''?` · ${mark?esc(mark.label)+' · ':''}${v}`:''}</div></div>${controls}</div>`}).join('')}
function qualListHTML(c,up){const g=group();return g.students.map(s=>{const k=qualKey(g.id,s.id,c,up),v=state.qual[k]||'';return `<div class="student-row"><div class="student-name student-with-avatar">${avatarHTML(g.id,s,'sm')}<div class="student-name-text"><b>${esc(s.name)}</b><div class="tiny">${criterionLabel(c)} · ${up}</div></div></div><select data-qual-key="${k}"><option value="">—</option>${['En proceso','Adecuado','Consolidado'].map(x=>`<option ${v===x?'selected':''}>${x}</option>`).join('')}</select></div>`}).join('')}
function summaryStudentHTML(g,st,period,idx){
 const grade=gradeForPeriod(g.id,st.id,period),cov=coverageForPeriod(g.id,st.id,period),count=assessedCountForPeriod(g.id,st.id,period),current=finalGrade(g.id,st.id);
 const ces=['CE1','CE2','CE3','CE4','CE5'].map(ce=>ceValueForPeriod(g.id,st.id,ce,period));
 const open=state.ui.openSummaryStudent===st.id;
 const history=[];
 criteria.forEach(([c])=>(evidence[c]||[]).forEach((e,i)=>{if(!evidenceInPeriod(c,e[0],period))return;const v=state.scores[scoreKey(g.id,st.id,c,i+1)];if(v!==undefined&&v!==null&&v!==''){const k=scoreKey(g.id,st.id,c,i+1),mark=state.rubricMarks[k];history.push({c,up:e[0],desc:e[2],v,mark})}}));
 return `<details class="summary-accordion" data-summary-student="${st.id}" ${open?'open':''}><summary><div class="summary-accordion-left">${avatarHTML(g.id,st,'sm')}<div class="student-name-text"><b>${esc(st.name)}</b><small>${grade===null&&period!=='final'?'Sin evidencias en este periodo':`Peso ${cov.toFixed(0)}% · ${count}/19 criterios`}</small></div></div><div class="summary-accordion-right"><span class="grade-chip ${grade===null?'':grade<5?'bad':grade<7?'warn':'ok'}">${grade===null?'—':grade.toFixed(2)}</span><span class="chev">›</span></div></summary><div class="summary-accordion-body">
 <div class="evaluation-student-metrics"><div><span>Nota ${evalLabel(period)}</span><b>${grade===null?'—':grade.toFixed(2)}</b>${grade===null&&period!=='final'?`<small>Sin evidencias en esta evaluación</small>`:''}</div><div><span>Peso evaluado</span><b>${cov.toFixed(0)}%</b></div><div><span>Criterios evaluados</span><b>${count}/19</b></div><div class="accumulated-metric"><span>Nivel criterial acumulado</span><b>${current===null?'—':current.toFixed(2)}</b></div></div>
 <div class="summary-ce-grid">${ces.map((v,i)=>`<div><span>CE${i+1}${i===2&&period==='eval2'?'<small>continua</small>':''}</span><b>${v===null?'—':v.toFixed(2)}</b></div>`).join('')}</div>
 <details class="criteria-detail"><summary>Ver detalle de criterios</summary><div class="table-wrap"><table><thead><tr><th>Criterio</th><th>Peso</th><th>Nivel</th></tr></thead><tbody>${criteria.map(([c,,w])=>{const v=criterionValueForPeriod(g.id,st.id,c,period);return `<tr><td>${criterionLabel(c)}</td><td>${w}%</td><td>${v===null?'—':v.toFixed(2)}</td></tr>`}).join('')}</tbody></table></div></details>
 <details class="criteria-detail"><summary>Evidencias consideradas ● (${history.length})</summary>${history.length?history.map(h=>`<div class="history-item"><b>${criterionLabel(h.c)} · ${h.up} · ${h.mark?esc(h.mark.label)+' · ':''}${h.v}</b><br>${esc(h.desc)}${h.mark?`<div class="history-rubric">${esc(h.mark.desc)}</div>`:''}</div>`).join(''):`<div class="muted summary-empty">Sin evidencias principales registradas en esta evaluación.</div>`}</details>
 </div></details>`
}
function viewResumen(){
 const g=group();if(!g)return `<div class="card empty">Primero crea un grupo en Ajustes.</div>`;
 const period=state.ui.evaluationPeriod||'eval1',label=evalLabel(period);
 return `${groupSelectors()}
 <div class="card evaluation-panel"><div class="evaluation-head"><div><h2>Evaluaciones</h2><p class="muted">La 1.ª y 2.ª evaluación muestran las evidencias de su periodo; CE3 (3.1, 3.2 y 3.3) mantiene seguimiento continuo con prioridad de las evidencias recientes (15% · 25% · 60%). La evaluación final integra todo el curso.</p></div></div>
 <div class="evaluation-tabs"><button data-eval-period="eval1" class="${period==='eval1'?'active':''}">1.ª evaluación</button><button data-eval-period="eval2" class="${period==='eval2'?'active':''}">2.ª evaluación</button><button data-eval-period="final" class="${period==='final'?'active':''}">Final</button></div>
 <div class="evaluation-cut"><b>${label}</b><span>${esc(evalRangeText(period))}</span></div><div class="report-actions"><button class="btn" id="generateEvalReport">Generar informe de ${label}</button><button class="btn secondary" id="downloadEvalCsv">Descargar CSV</button></div></div>
 <div class="card summary-class-card"><div class="summary-class-head"><div><h2>${label}</h2><p class="muted">Pulsa un alumno para desplegar toda su información. Solo se mantiene una ficha abierta cada vez.</p></div><span class="summary-count">${g.students.length} alumnos</span></div><div class="summary-accordion-list">${g.students.map((st,i)=>summaryStudentHTML(g,st,period,i)).join('')}</div></div>`
}

function auditData(){const sums={};criteria.forEach(([c,,w])=>{const es=evidence[c]||[],n=es.length;es.forEach((e,i)=>{const share=w*(i+1)/(n*(n+1)/2);sums[e[1]]=(sums[e[1]]||0)+share})});return sums}
function viewAjustes(){
 const a=auditData(), active=group();
 const groupsHTML=state.groups.map(g=>`<div class="card group-admin" style="margin-top:10px"><div class="row"><div><b>${esc(g.name)}</b><div class="tiny">${g.students.length} alumnos</div></div>${state.selectedGroup===g.id?`<span class="btn small secondary active-group-label" aria-label="Grupo activo">✓ Grupo activo</span>`:`<button class="btn small secondary" data-select-group="${g.id}">Seleccionar grupo</button>`}<button class="btn small danger" data-delete-group="${g.id}">Eliminar grupo</button></div><div class="row" style="margin-top:8px"><textarea id="bulk-${g.id}" rows="3" placeholder="Pega un alumno por línea"></textarea><button class="btn small" data-add-students="${g.id}">Añadir</button></div></div>`).join('');
 const photosHTML=active?`<div class="card"><h2>Alumnado y fotos</h2><p class="muted">Grupo activo: <b>${esc(active.name)}</b>. Las fotos se guardan solo en este dispositivo y se incluyen en la copia JSON.</p>${active.students.length?`<div class="student-photo-list always-visible">${active.students.map(st=>{const has=!!state.photos[photoKey(active.id,st.id)];return `<div class="student-photo-row">${avatarHTML(active.id,st,'lg')}<div class="student-photo-name"><b>${esc(st.name)}</b><span>${has?'Foto guardada':'Sin foto'}</span></div><div class="photo-actions"><label class="btn small secondary photo-upload-btn">${has?'Cambiar':'Elegir foto'}<input type="file" accept="image/*" data-photo-upload="${active.id}|${st.id}" hidden></label><label class="btn small secondary photo-upload-btn camera-btn">Cámara<input type="file" accept="image/*" capture="user" data-photo-upload="${active.id}|${st.id}" hidden></label>${has?`<button class="btn small secondary" data-remove-photo="${active.id}|${st.id}">Quitar foto</button>`:''}<button class="btn small danger" data-delete-student="${active.id}|${st.id}" data-student-name="${esc(st.name)}">Eliminar alumno</button></div></div>`}).join('')}</div>`:`<div class="muted">Añade alumnado al grupo para poder asignar fotografías.</div>`}</div>`:'';
 return `<div class="card"><h2>Grupos y alumnado</h2><div class="row"><input id="newGroup" placeholder="Ej. 1.º ESO A"><button class="btn" id="addGroup">Crear grupo</button></div>${groupsHTML}</div>
 ${photosHTML}
 <div class="card"><h2>Organización flexible de evaluaciones</h2><p class="muted">Asigna cada UP al periodo en el que realmente la impartas. La numeración de la UP no cambia: por ejemplo, puedes realizar UP13 en octubre y asignarla a la 1.ª evaluación. La evaluación final seguirá siendo acumulativa con todo el curso.</p><div class="up-period-list">${ups.map(([u,n])=>`<div class="up-period-row"><div><b>${u}</b><span>${esc(n)}</span></div><select data-up-period="${u}" aria-label="Evaluación de ${u}"><option value="eval1" ${upPeriod(u)==='eval1'?'selected':''}>1.ª evaluación</option><option value="eval2" ${upPeriod(u)==='eval2'?'selected':''}>2.ª evaluación</option><option value="eval3" ${upPeriod(u)==='eval3'?'selected':''}>3.ª / tramo final</option></select></div>`).join('')}</div><p class="tiny"><b>CE3 continua:</b> integra la trayectoria disponible y prioriza las tres evidencias más recientes: 15% · 25% · 60%. Con dos evidencias se normaliza a 29,4% · 70,6%; con una, 100%. Puede reflejar mejora o descenso. La evaluación final integra todas las UP.</p></div>
 <div class="card"><h2>Auditoría 40 %</h2>${Object.entries(a).map(([p,v])=>`<div style="margin-bottom:9px"><div class="row"><span>${esc(p)}</span><b>${v.toFixed(2)}%</b></div><div class="progress"><span style="width:${Math.min(v,100)}%"></span></div></div>`).join('')}<p class="muted">Todos los procedimientos deben permanecer ≤ 40 %.</p></div>
 <div class="card"><h2>Copias de seguridad</h2><div class="toolbar"><button class="btn" id="exportJson">Exportar copia JSON</button><label class="btn secondary" style="display:inline-block">Importar JSON<input type="file" id="importJson" accept="application/json" hidden></label><button class="btn secondary" id="exportCsv">Exportar resumen CSV</button></div><p class="muted">Los datos, incluidas las fotos, se guardan solo en este dispositivo/navegador. Las fotos se comprimen y se incluyen en la copia JSON; conserva esas copias en un lugar seguro y no las subas al repositorio público de GitHub.</p></div>`
}

function bind(){document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{currentView=b.dataset.go;render()});document.querySelectorAll('.bottom-nav button').forEach(b=>b.onclick=()=>{currentView=b.dataset.view;render()});
 const gs=document.getElementById('groupSel');if(gs)gs.onchange=e=>{state.selectedGroup=e.target.value;state.ui.openEvaluateStudent=null;save();render()};const us=document.getElementById('upSel');if(us)us.onchange=e=>{state.selectedUP=e.target.value;state.ui.openEvaluateStudent=null;save();render()};
 const es=document.getElementById('evalStudentSel');if(es)es.onchange=e=>{state.ui.openEvaluateStudent=e.target.value;save();render()};
 const ds=document.getElementById('dateSel');if(ds)ds.onchange=e=>{state.selectedDate=e.target.value||todayISO();save();render()};
 document.querySelectorAll('[data-eval-jump]').forEach(b=>b.onclick=()=>{if(!b.dataset.evalJump)return;state.ui.openEvaluateStudent=b.dataset.evalJump;save();render();setTimeout(()=>document.querySelector(`[data-evaluate-student=\"${CSS.escape(state.ui.openEvaluateStudent)}\"]`)?.scrollIntoView({block:'start'}),30)});
 document.querySelectorAll('[data-quick-score]').forEach(b=>b.onclick=()=>{const g=fullGroup(),sid=activeEvalSid();if(!g||!sid)return;const y=window.scrollY,k=b.dataset.quickKey,score=Number(b.dataset.quickScore);state.ui.openEvaluateStudent=sid;state.scores[k]=score;state.rubricMarks[k]={label:b.dataset.quickLevel||'',score,desc:b.dataset.quickRubricDesc||'',criterion:b.dataset.quickC,up:b.dataset.quickUp,evidence:b.dataset.quickDesc};save();toast(`${b.dataset.quickC} · ${score}`);render();requestAnimationFrame(()=>window.scrollTo(0,y))});
 document.querySelectorAll('[data-quick-clear]').forEach(b=>b.onclick=()=>{delete state.scores[b.dataset.quickClear];delete state.rubricMarks[b.dataset.quickClear];save();render()});
 document.querySelectorAll('[data-eval-note]').forEach(t=>{const store=()=>{const k=t.dataset.evalNote,v=t.value.trim();if(v)state.notes[k]=v;else delete state.notes[k];save()};t.oninput=store;t.onchange=()=>{store();toast('Observación guardada')}});
 document.querySelectorAll('[data-cont-score]').forEach(b=>b.onclick=()=>{state.qual[b.dataset.contKey]=Number(b.dataset.contScore);save();toast('Evaluación continua guardada');render()});
 document.querySelectorAll('[data-cont-clear]').forEach(b=>b.onclick=()=>{delete state.qual[b.dataset.contClear];save();toast('Seguimiento borrado');render()});
 document.querySelectorAll('[data-qual-key]').forEach(q=>q.onchange=()=>{if(q.value)state.qual[q.dataset.qualKey]=q.value;else delete state.qual[q.dataset.qualKey];save();toast('Seguimiento guardado')});
 document.querySelectorAll('[data-teacher-note]').forEach(t=>t.oninput=()=>{const v=t.value.slice(0,500);if(v)state.teacherNotes[t.dataset.teacherNote]=v;else delete state.teacherNotes[t.dataset.teacherNote];const c=document.querySelector(`[data-teacher-count="${CSS.escape(t.dataset.teacherNote)}"]`);if(c)c.textContent=`${v.length}/500`;save()});
  document.querySelectorAll('[data-eval-period]').forEach(b=>b.onclick=()=>{state.ui.evaluationPeriod=b.dataset.evalPeriod;state.ui.openSummaryStudent=null;save();render()});
 const gr=document.getElementById('generateEvalReport');if(gr)gr.onclick=()=>generateEvaluationReport(state.ui.evaluationPeriod||'eval1');const dc=document.getElementById('downloadEvalCsv');if(dc)dc.onclick=()=>exportCSV();
 document.querySelectorAll('[data-summary-student]').forEach(d=>d.addEventListener('toggle',()=>{if(d.open){state.ui.openSummaryStudent=d.dataset.summaryStudent;document.querySelectorAll('[data-summary-student]').forEach(o=>{if(o!==d)o.open=false})}else if(state.ui.openSummaryStudent===d.dataset.summaryStudent){state.ui.openSummaryStudent=null}save()}));
 document.querySelectorAll('[data-up-period]').forEach(sel=>sel.onchange=()=>{const up=sel.dataset.upPeriod,prev=upPeriod(up),next=sel.value;if(prev===next)return;if(upHasPrincipalScores(up)){const ok=confirm(`${up} ya contiene evidencias de calificación. Cambiarla de evaluación modificará los cálculos del periodo. ¿Quieres continuar?`);if(!ok){sel.value=prev;return}}state.evalConfig.upPeriods[up]=next;save();toast(`${up} asignada a ${evalLabel(next)}`);render()});
 document.querySelectorAll('[data-fit-field]').forEach(inp=>{const store=()=>{const k=inp.dataset.fitKey,f=inp.dataset.fitField;state.fitness[k]=state.fitness[k]||{};const val=inp.value.trim();if(val)state.fitness[k][f]=val;else delete state.fitness[k][f];save();const card=inp.closest('.fitness-student');if(card){const total=card.querySelectorAll('[data-fit-field]').length;const done=[...card.querySelectorAll('[data-fit-field]')].filter(x=>x.value.trim()!=='').length;const c=card.querySelector('.fitness-count');if(c)c.textContent=`${done}/${total} datos`}};inp.oninput=store;inp.onchange=()=>{store();toast('Marca guardada')}});
 document.querySelectorAll('[data-ref-field]').forEach(el=>{const store=()=>{const k=el.dataset.refKey,f=el.dataset.refField;state.reflections[k]=state.reflections[k]||{};const val=el.value.trim();if(val)state.reflections[k][f]=val;else delete state.reflections[k][f];save();const card=el.closest('.reflection-student');if(card){const total=card.querySelectorAll('[data-ref-field]').length;const done=[...card.querySelectorAll('[data-ref-field]')].filter(x=>x.value.trim()!=='').length;const c=card.querySelector('.reflection-count');if(c)c.textContent=`${done}/${total} respuestas`}};el.oninput=store;el.onchange=()=>{store();toast('Autoevaluación guardada')}});
 document.querySelectorAll('[data-rpe-student]').forEach(d=>d.addEventListener('toggle',()=>{if(d.open){state.ui.openUp3RPE=d.dataset.rpeStudent;document.querySelectorAll('[data-rpe-student]').forEach(o=>{if(o!==d)o.open=false});save()}else if(state.ui.openUp3RPE===d.dataset.rpeStudent){state.ui.openUp3RPE=null;save()}}));
 document.querySelectorAll('[data-save-rpe]').forEach(b=>b.onclick=()=>{const k=b.dataset.saveRpe,sid=b.dataset.rpeSid,p=document.querySelector(`[data-rpe-planned="${CSS.escape(k)}"]`),a=document.querySelector(`[data-rpe-actual="${CSS.escape(k)}"]`),reg=document.querySelector(`[data-rpe-regulation="${CSS.escape(k)}"]`),note=document.querySelector(`[data-rpe-note="${CSS.escape(k)}"]`);const planned=Number(String(p?.value||'').replace(',','.')),actual=Number(String(a?.value||'').replace(',','.'));if(!Number.isFinite(planned)||!Number.isFinite(actual)||planned<0||planned>10||actual<0||actual>10){toast('Introduce RPE previsto y real entre 0 y 10');return}state.up3RPE[k]=Array.isArray(state.up3RPE[k])?state.up3RPE[k]:[];state.up3RPE[k].push({id:Date.now(),date:state.selectedDate,planned,actual,regulation:reg?.value||'',note:note?.value?.trim()||''});state.ui.openUp3RPE=sid;save();toast('Intento RPE guardado');render();setTimeout(()=>document.getElementById('rpe-'+sid)?.scrollIntoView({block:'center'}),40)});
 document.querySelectorAll('[data-del-rpe]').forEach(b=>b.onclick=()=>{const k=b.dataset.delRpe,i=Number(b.dataset.delRpeIndex);if(Array.isArray(state.up3RPE[k])){state.up3RPE[k].splice(i,1);if(!state.up3RPE[k].length)delete state.up3RPE[k];save();render();toast('Intento RPE borrado')}});
 document.querySelectorAll('[data-up3-task-value]').forEach(b=>b.onclick=()=>{const k=b.dataset.up3TaskKey,f=b.dataset.up3TaskField;state.up3Tasks[k]=state.up3Tasks[k]||{};state.up3Tasks[k][f]=Number(b.dataset.up3TaskValue);state.ui.openUp3Task=k.split('|')[1];save();render();setTimeout(()=>document.getElementById('cfb-'+state.ui.openUp3Task)?.scrollIntoView({block:'nearest'}),20)});
 document.querySelectorAll('[data-up3-task-student]').forEach(d=>d.addEventListener('toggle',()=>{if(d.open){state.ui.openUp3Task=d.dataset.up3TaskStudent;document.querySelectorAll('[data-up3-task-student]').forEach(o=>{if(o!==d)o.open=false});save()}else if(state.ui.openUp3Task===d.dataset.up3TaskStudent){state.ui.openUp3Task=null;save()}}));
 document.querySelectorAll('[data-apply-up3-task]').forEach(b=>b.onclick=()=>{const g=group(),sid=b.dataset.up3TaskSid,c=b.dataset.up3TaskCriterion,score=Number(b.dataset.up3TaskScore),level=b.dataset.up3TaskLevel,ev=(evidence[c]||[]).map((e,i)=>({e,seq:i+1})).find(x=>x.e[0]==='UP3');if(!g||!ev)return;const k=scoreKey(g.id,sid,c,ev.seq),rub=rubricOverrides[`UP3|${c}`]?.find(x=>x.score===score);state.scores[k]=score;state.rubricMarks[k]={label:level,score,desc:rub?.desc||'',criterion:c,up:'UP3',evidence:ev.e[2]};state.ui.openUp3Task=sid;save();toast(`Nivel registrado en ${c}`);render();setTimeout(()=>document.getElementById('cfb-'+sid)?.scrollIntoView({block:'center'}),60)});
 document.querySelectorAll('[data-up4-game-value]').forEach(b=>b.onclick=()=>{const k=b.dataset.up4GameKey,c=b.dataset.up4GameCriterion,sid=b.dataset.up4GameSid;state.up4Game[k]=state.up4Game[k]||{};state.up4Game[k][c]=Number(b.dataset.up4GameValue);state.ui.openUp4Game=sid;save();render();setTimeout(()=>document.getElementById('bad-'+sid)?.scrollIntoView({block:'nearest'}),20)});
 document.querySelectorAll('[data-up4-game-student]').forEach(d=>d.addEventListener('toggle',()=>{if(d.open){state.ui.openUp4Game=d.dataset.up4GameStudent;document.querySelectorAll('[data-up4-game-student]').forEach(o=>{if(o!==d)o.open=false});save()}else if(state.ui.openUp4Game===d.dataset.up4GameStudent){state.ui.openUp4Game=null;save()}}));
 document.querySelectorAll('[data-apply-up4-game]').forEach(b=>b.onclick=()=>{const g=group(),sid=b.dataset.up4GameSid,c=b.dataset.up4GameCriterion,score=Number(b.dataset.up4GameScore),level=b.dataset.up4GameLevel,ev=(evidence[c]||[]).map((e,i)=>({e,seq:i+1})).find(x=>x.e[0]==='UP4');if(!g||!ev)return;const k=scoreKey(g.id,sid,c,ev.seq),rub=rubricOverrides[`UP4|${c}`]?.find(x=>x.score===score);state.scores[k]=score;state.rubricMarks[k]={label:level,score,desc:rub?.desc||'',criterion:c,up:'UP4',evidence:ev.e[2]};state.ui.openUp4Game=sid;save();toast(`Nivel registrado en ${c}`);render();setTimeout(()=>document.getElementById('bad-'+sid)?.scrollIntoView({block:'center'}),60)});
 document.querySelectorAll('[data-warm-value]').forEach(b=>b.onclick=()=>{const k=b.dataset.warmKey,f=b.dataset.warmField;state.warmups[k]=state.warmups[k]||{};state.warmups[k][f]=Number(b.dataset.warmValue);state.ui.openWarmup=k.split('|')[1];save();render();setTimeout(()=>document.getElementById('warm-'+state.ui.openWarmup)?.scrollIntoView({block:'nearest'}),20)});
 document.querySelectorAll('[data-warm-student]').forEach(d=>d.addEventListener('toggle',()=>{if(d.open){state.ui.openWarmup=d.dataset.warmStudent;document.querySelectorAll('[data-warm-student]').forEach(o=>{if(o!==d)o.open=false});save()}else if(state.ui.openWarmup===d.dataset.warmStudent){state.ui.openWarmup=null;save()}}));
 document.querySelectorAll('[data-apply-warmup]').forEach(b=>b.onclick=()=>{const g=group(),sid=b.dataset.applyWarmup.split('|')[1],ev=(evidence['1.2']||[]).map((e,i)=>({e,seq:i+1})).find(x=>x.e[0]==='UP2');if(!g||!ev)return;const k=scoreKey(g.id,sid,'1.2',ev.seq),score=Number(b.dataset.warmScore),level=b.dataset.warmLevel,r=rubricOverrides['UP2|1.2'].find(x=>x.score===score);state.scores[k]=score;state.rubricMarks[k]={label:level,score,desc:r?.desc||'',criterion:'1.2',up:'UP2',evidence:'Diseño y dirección de calentamiento'};const idx=g.students.findIndex(x=>x.id===sid),next=g.students[idx+1];state.ui.openWarmup=next?.id||null;save();toast('Nivel registrado en 1.2');render();if(next)setTimeout(()=>document.getElementById('warm-'+next.id)?.scrollIntoView({behavior:'smooth',block:'center'}),80)});
 const ap=document.getElementById('allPresentBtn');if(ap)ap.onclick=()=>{const g=group();if(!g)return;allPresent(g);const box=document.getElementById('attendanceList');if(box)box.innerHTML=attendanceHTML(g);const st=attendanceStats(g),done=document.getElementById('attDone');if(done)done.textContent=`${st.done}/${st.total}`;bindAttendanceOnly();document.querySelectorAll('[data-note-student]').forEach(n=>n.onclick=()=>editNote(n.dataset.noteStudent));toast('Asistencia marcada: todos presentes')};
 document.querySelectorAll('[data-att]').forEach(b=>b.onclick=()=>{const k=b.dataset.attKey,x=b.dataset.att;if(state.attendance[k]===x)delete state.attendance[k];else state.attendance[k]=x;save();const box=document.getElementById('attendanceList');if(box)box.innerHTML=attendanceHTML(group());bindAttendanceOnly()});
 bindAttendanceOnly();
 document.querySelectorAll('[data-note-student]').forEach(b=>b.onclick=()=>editNote(b.dataset.noteStudent));
 document.querySelectorAll('[data-open-evidence]').forEach(b=>b.onclick=()=>{currentView='evaluar';state.ui.openEvidence=Number(b.dataset.openEvidence);save();render()});
 document.querySelectorAll('[data-open-comp]').forEach(b=>b.onclick=()=>openComp(Number(b.dataset.openComp)));
 document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{state.ui.scoreMode=b.dataset.mode;save();render()});
 document.querySelectorAll('[data-qual-key]').forEach(q=>q.onchange=()=>{if(q.value)state.qual[q.dataset.qualKey]=q.value;else delete state.qual[q.dataset.qualKey];save();toast('Seguimiento guardado')});
 document.querySelectorAll('[data-teacher-note]').forEach(t=>t.oninput=()=>{const v=t.value.slice(0,500);if(v)state.teacherNotes[t.dataset.teacherNote]=v;else delete state.teacherNotes[t.dataset.teacherNote];const c=document.querySelector(`[data-teacher-count="${CSS.escape(t.dataset.teacherNote)}"]`);if(c)c.textContent=`${v.length}/500`;save()});
 if(currentView==='evaluar'){const evs=principalForUP(state.selectedUP),sel=document.getElementById('evSel'),meta=document.getElementById('evMeta'),box=document.getElementById('studentScores');if(sel&&Number.isInteger(state.ui.openEvidence)&&evs[state.ui.openEvidence]){sel.value=String(state.ui.openEvidence);delete state.ui.openEvidence;save()}const draw=()=>{const ev=evs[Number(sel.value)||0];if(!ev)return;meta.innerHTML=`<div class="row"><div><span class="pill main">● ${ev.c}</span> · ${esc(ev.proc)}<br><b>${esc(ev.desc)}</b></div><div class="counter">${scoredCount(group(),ev)}/${group().students.length} registrados</div></div>${state.ui.scoreMode==='levels'?rubricReferenceHTML(ev):''}`;box.innerHTML=scoreListHTML(ev);box.querySelectorAll('[data-score]').forEach(b=>b.onclick=()=>{state.scores[b.dataset.key]=Number(b.dataset.score);if(state.ui.scoreMode==='levels'&&b.dataset.level){state.rubricMarks[b.dataset.key]={label:b.dataset.level,score:Number(b.dataset.score),desc:b.dataset.desc,criterion:ev.c,up:ev.up,evidence:ev.desc}}else{delete state.rubricMarks[b.dataset.key]}save();draw()});box.querySelectorAll('[data-clear]').forEach(b=>b.onclick=()=>{delete state.scores[b.dataset.clear];delete state.rubricMarks[b.dataset.clear];save();draw()})};if(sel){sel.onchange=draw;draw()}}
 const ag=document.getElementById('addGroup');if(ag)ag.onclick=()=>{const name=document.getElementById('newGroup').value.trim();if(!name)return;const g={id:id(),name,students:[]};state.groups.push(g);state.selectedGroup=g.id;save();render();toast('Grupo creado')};
 document.querySelectorAll('[data-select-group]').forEach(b=>b.onclick=()=>{state.selectedGroup=b.dataset.selectGroup;state.ui.openEvaluateStudent=null;state.ui.openSummaryStudent=null;save();render();toast('Grupo seleccionado')});document.querySelectorAll('[data-delete-group]').forEach(b=>b.onclick=()=>{const gid=b.dataset.deleteGroup,g=state.groups.find(x=>x.id===gid);if(!g)return;const ok=confirm(`Vas a eliminar el grupo “${g.name}” y TODOS sus datos asociados: alumnado, notas, evidencias, asistencia, observaciones, instrumentos y fotos.\n\nEsta acción no se puede deshacer. ¿Eliminar grupo?`);if(ok){state.groups=state.groups.filter(x=>x.id!==gid);[state.scores,state.rubricMarks,state.qual,state.attendance,state.notes,state.teacherNotes,state.fitness,state.reflections,state.warmups,state.up3RPE,state.up3Tasks,state.up4Game,state.photos].forEach(obj=>Object.keys(obj).filter(k=>k.startsWith(gid+'|')).forEach(k=>delete obj[k]));state.selectedGroup=state.groups[0]?.id||null;state.ui.openEvaluateStudent=null;state.ui.openSummaryStudent=null;save();render();toast('Grupo eliminado')}});
 document.querySelectorAll('[data-add-students]').forEach(b=>b.onclick=()=>{const g=state.groups.find(x=>x.id===b.dataset.addStudents),ta=document.getElementById('bulk-'+g.id);ta.value.split(/\n+/).map(x=>x.trim()).filter(Boolean).forEach(name=>g.students.push({id:id(),name}));save();render();toast('Alumnado añadido')});
 document.querySelectorAll('[data-photo-upload]').forEach(inp=>inp.onchange=async()=>{const file=inp.files?.[0];if(!file)return;if(!file.type.startsWith('image/')){alert('Selecciona una imagen.');return}try{const data=await compressPhoto(file);state.photos[inp.dataset.photoUpload]=data;save();toast('Foto guardada');render()}catch{alert('No se pudo procesar la foto.')}});
 document.querySelectorAll('[data-remove-photo]').forEach(b=>b.onclick=()=>{if(confirm('¿Quitar únicamente la foto de este alumno?')){delete state.photos[b.dataset.removePhoto];save();render()}});
 document.querySelectorAll('[data-delete-student]').forEach(b=>b.onclick=()=>{const [gid,sid]=b.dataset.deleteStudent.split('|'),g=state.groups.find(x=>x.id===gid),st=g?.students.find(x=>x.id===sid);if(!g||!st)return;const ok=confirm(`Vas a eliminar a “${st.name}” y TODOS sus datos asociados: notas, evidencias, asistencia, observaciones, instrumentos y foto.\n\nEsta acción no se puede deshacer. ¿Eliminar alumno?`);if(!ok)return;g.students=g.students.filter(x=>x.id!==sid);const prefix=gid+'|'+sid;[state.scores,state.rubricMarks,state.qual,state.attendance,state.notes,state.teacherNotes,state.fitness,state.reflections,state.warmups,state.up3RPE,state.up3Tasks,state.up4Game,state.photos].forEach(obj=>Object.keys(obj).filter(k=>k===prefix||k.startsWith(prefix+'|')).forEach(k=>delete obj[k]));if(state.ui.openEvaluateStudent===sid)state.ui.openEvaluateStudent=null;if(state.ui.openSummaryStudent===sid)state.ui.openSummaryStudent=null;if(state.ui.openWarmup===sid)state.ui.openWarmup=null;if(state.ui.openUp3RPE===sid)state.ui.openUp3RPE=null;if(state.ui.openUp3Task===sid)state.ui.openUp3Task=null;if(state.ui.openUp4Game===sid)state.ui.openUp4Game=null;save();render();toast('Alumno eliminado')});
 const ej=document.getElementById('exportJson');if(ej)ej.onclick=()=>download('cuaderno-ef-backup.json',JSON.stringify(state,null,2),'application/json');const ij=document.getElementById('importJson');if(ij)ij.onchange=async e=>{try{state=migrate(JSON.parse(await e.target.files[0].text()));save();render();toast('Copia importada')}catch{alert('Archivo no válido')}};const ec=document.getElementById('exportCsv');if(ec)ec.onclick=exportCSV;
}
function bindAttendanceOnly(){
  document.querySelectorAll('[data-att]').forEach(b=>{
    b.onclick=()=>{
      const k=b.dataset.attKey,x=b.dataset.att;
      if(state.attendance[k]===x) delete state.attendance[k]; else state.attendance[k]=x;
      save();
      const box=document.getElementById('attendanceList');
      if(box){
        const g=group();
        box.innerHTML=attendanceHTML(g);
        const st=attendanceStats(g),done=document.getElementById('attDone');if(done)done.textContent=`${st.done}/${st.total}`;
        bindAttendanceOnly();
        document.querySelectorAll('[data-note-student]').forEach(n=>n.onclick=()=>editNote(n.dataset.noteStudent));
      }
    };
  });
}
function editNote(sid){const g=group(),s=g.students.find(x=>x.id===sid),k=noteKey(g.id,sid,state.selectedDate),old=state.notes[k]||'';const text=prompt(`Observación de sesión · ${s.name}\n${state.selectedDate}\n(No entra automáticamente en la nota)`,old);if(text===null)return;if(text.trim())state.notes[k]=text.trim();else delete state.notes[k];save();render()}
function openComp(index){const comps=compsForUP(state.selectedUP),ev=comps[index];if(!ev)return;const overlay=document.getElementById('sessionOverlay');overlay.innerHTML=`<div class="card"><div class="row"><div><h3>Seguimiento ○ · ${criterionLabel(ev.c)}</h3></div><button class="btn small secondary" id="closeComp">Cerrar</button></div>${qualListHTML(ev.c,ev.up)}</div>`;overlay.querySelectorAll('[data-qual-key]').forEach(s=>s.onchange=()=>{if(s.value)state.qual[s.dataset.qualKey]=s.value;else delete state.qual[s.dataset.qualKey];save()});document.getElementById('closeComp').onclick=()=>overlay.innerHTML='';overlay.scrollIntoView({behavior:'smooth',block:'start'})}
function download(name,text,type){const a=document.createElement('a');const url=URL.createObjectURL(new Blob([text],{type}));a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),500)}
function evaluationReportHTML(g,period){
 const label=evalLabel(period),date=new Date().toLocaleDateString('es-ES'),rows=g.students.map((st,i)=>{const grade=gradeForPeriod(g.id,st.id,period),cov=coverageForPeriod(g.id,st.id,period),count=assessedCountForPeriod(g.id,st.id,period),ces=['CE1','CE2','CE3','CE4','CE5'].map(ce=>ceValueForPeriod(g.id,st.id,ce,period));return `<tr><td>${i+1}</td><td><b>${esc(st.name)}</b></td><td class="num grade">${grade===null?'—':grade.toFixed(2)}</td><td class="num">${cov.toFixed(0)}%</td><td class="num">${count}/19</td>${ces.map(v=>`<td class="num">${v===null?'—':v.toFixed(2)}</td>`).join('')}</tr>`}).join('');
 return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Informe ${esc(label)} · ${esc(g.name)}</title><style>body{font-family:Arial,sans-serif;color:#182533;margin:28px}h1{margin:0 0 4px;color:#205987;font-size:24px}.meta{color:#5f6f7d;margin-bottom:20px}.note{padding:10px 12px;background:#f3f7fa;border-left:4px solid #205987;margin:14px 0 18px;font-size:13px}table{width:100%;border-collapse:collapse;font-size:13px}th,td{border:1px solid #ccd6de;padding:8px 7px}th{background:#eaf1f6;text-align:left}.num{text-align:center}.grade{font-size:15px;font-weight:700}.actions{margin-bottom:16px}.actions button{padding:10px 14px;border:0;border-radius:8px;background:#205987;color:#fff;font-weight:700;cursor:pointer}@media print{.actions{display:none}body{margin:12mm}h1{font-size:20px}table{font-size:11px}th,td{padding:6px}}</style></head><body><div class="actions"><button onclick="window.print()">Imprimir / Guardar como PDF</button></div><h1>Cuaderno EF · ${esc(label)}</h1><div class="meta"><b>Grupo:</b> ${esc(g.name)} · <b>Fecha del informe:</b> ${date}</div><div class="note">La nota de evaluación se calcula con las evidencias de calificación disponibles en el periodo seleccionado. Un criterio todavía no evaluado no se contabiliza como cero.</div><table><thead><tr><th>#</th><th>Alumno/a</th><th>Nota</th><th>Peso evaluado</th><th>Criterios</th><th>CE1</th><th>CE2</th><th>CE3</th><th>CE4</th><th>CE5</th></tr></thead><tbody>${rows}</tbody></table></body></html>`
}
function generateEvaluationReport(period){
 const g=group();if(!g){alert('Selecciona un grupo');return}const html=evaluationReportHTML(g,period),blob=new Blob([html],{type:'text/html;charset=utf-8'}),url=URL.createObjectURL(blob),w=window.open(url,'_blank');if(!w){download(`informe-${period}-${g.name}.html`,html,'text/html;charset=utf-8');toast('Informe descargado')}setTimeout(()=>URL.revokeObjectURL(url),60000)
}
function exportCSV(){const g=group();if(!g){alert('Selecciona un grupo');return}const period=state.ui.evaluationPeriod||'eval1',head=['Alumno','Evaluación','Peso evaluado','Criterios evaluados','CE1','CE2','CE3','CE4','CE5','Nota evaluación','Nivel criterial acumulado'];const rows=g.students.map(st=>[st.name,evalLabel(period),coverageForPeriod(g.id,st.id,period),assessedCountForPeriod(g.id,st.id,period),...['CE1','CE2','CE3','CE4','CE5'].map(ce=>ceValueForPeriod(g.id,st.id,ce,period)?.toFixed(2)||''),gradeForPeriod(g.id,st.id,period)?.toFixed(2)||'',finalGrade(g.id,st.id)?.toFixed(2)||'']);download(`resumen-${period}-${g.name}.csv`,[head,...rows].map(r=>r.map(x=>'"'+String(x).replaceAll('"','""')+'"').join(';')).join('\n'),'text/csv;charset=utf-8')}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;document.getElementById('installBtn')?.classList.remove('hidden')});document.getElementById('installBtn').onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null}};
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}));
render();
