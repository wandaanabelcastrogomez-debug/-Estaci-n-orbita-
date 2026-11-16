/* =====================================================================
   ESTACIÓN ÓRBITA · Repara los sistemas con HTML, CSS y JavaScript
   ---------------------------------------------------------------------
   PARTE 1 · Núcleo: niveles, montaje del documento del jugador y
             comprobadores (sin depender de la interfaz).
   PARTE 2 · Interfaz: editor de 3 archivos, vista previa y pruebas.
   ===================================================================== */
(function (raiz) {
  "use strict";

  /* ===================================================================
     PARTE 1 · NÚCLEO
     =================================================================== */

  /* Hoja de estilo base con la que arranca el panel del jugador.
     Su CSS se añade DESPUÉS, así que siempre puede sobrescribirla. */
  var BASE_CSS = [
    "* { box-sizing: border-box; }",
    "html, body { margin: 0; }",
    "body {",
    '  font-family: "Segoe UI", system-ui, -apple-system, sans-serif;',
    "  background: #0e1524; color: #e7eefb; padding: 16px;",
    "  font-size: 14px; line-height: 1.5;",
    "}",
    "h2 { font-size: 16px; margin: 0 0 12px; color: #ffffff; }",
    "p { margin: 0 0 10px; }",
    "button {",
    "  font: inherit; font-weight: 800; cursor: pointer; border: none;",
    "  border-radius: 9px; padding: 9px 14px;",
    "  background: #cfe0ff; color: #0e1524;",
    "  transition: transform .1s, background .15s;",
    "}",
    "button:active { transform: scale(.97); }",
    "input {",
    "  font: inherit; padding: 8px 10px; border-radius: 9px;",
    "  border: 1px solid #26314a; background: #0b1220; color: #e7eefb;",
    "  width: 100%; margin-bottom: 10px;",
    "}",
    ".panel {",
    "  border: 1px solid #26314a; border-radius: 14px;",
    "  padding: 16px; background: #162033; max-width: 400px;",
    "}",
    ".fila { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }"
  ].join("\n");

  var NIVELES = [

    /* ---------------- 1 ---------------- */
    {
      id: 1, cap: "js", editar: "js",
      titulo: "Botón de arranque",
      concepto: "JavaScript · eventos",
      texto: "Bienvenido a la Estación Órbita, técnico. El panel ya tiene su estructura (HTML) y su " +
             "aspecto (CSS). Lo que falta es el **comportamiento**, y eso es JavaScript.\n\n" +
             "Un **evento** es algo que ocurre: un clic, una tecla, el tiempo que pasa. Con " +
             "`${addEventListener(\"click\", …)}` le dices al navegador «cuando ocurra esto, haz aquello».\n\n" +
             "Tu misión: cuando se pulse el botón `${#boton}`, añade la clase `${encendida}` al elemento " +
             "`${#luz}`. El CSS ya tiene preparada la regla `${#luz.encendida}`: en cuanto la clase " +
             "aparezca, la luz se pone amarilla.",
      html: '<div class="panel">\n  <h2>Reactor principal</h2>\n  <div class="fila">\n    <div id="luz"></div>\n    <p id="estado">Apagado</p>\n  </div>\n  <button id="boton">ARRANCAR</button>\n</div>',
      css: '#luz {\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  background: #3a4356;          /* apagada */\n  box-shadow: inset 0 0 12px #0006;\n  transition: background .25s;\n}\n\n#luz.encendida {\n  background: #ffe066;          /* encendida */\n  box-shadow: 0 0 18px #ffe066;\n}',
      js: "// Escribe el código que enciende la luz al pulsar ARRANCAR\n",
      pruebas: [
        {
          nombre: "Al pulsar ARRANCAR, la luz se enciende",
          acciones: [{ tipo: "click", sel: "#boton" }],
          espera: [{ tipo: "estilo", sel: "#luz", prop: "background-color", valor: "#ffe066" }]
        },
        {
          nombre: "La luz no se enciende sola al cargar",
          acciones: [],
          espera: [{ tipo: "estilo", sel: "#luz", prop: "background-color", valor: "#3a4356" }]
        }
      ],
      pistas: [
        { t: "La idea", v: "Son tres pasos: **seleccionar** el botón, **escuchar** su clic y, dentro, **hacer** el cambio." },
        { t: "Cómo se escribe", v: "`document.getElementById(\"boton\").addEventListener(\"click\", function () { … });` y dentro de las llaves: `document.getElementById(\"luz\").classList.add(\"encendida\");`" },
        { t: "Casi lo tienes", v: "Solo faltan dos nombres:", codigo: 'document.getElementById("______").addEventListener("click", function () {\n  document.getElementById("____").classList.add("__________");\n});' }
      ],
      solucion: {
        js: 'document.getElementById("boton").addEventListener("click", function () {\n  document.getElementById("luz").classList.add("encendida");\n});'
      },
      nota: "`getElementById` busca un elemento por su id, `addEventListener(\"click\", …)` espera a que el usuario pulse, y `classList.add(\"encendida\")` añade la clase. El CSS hace el resto: no tocamos el color desde JavaScript, solo encendemos la clase correcta."
    },

    /* ---------------- 2 ---------------- */
    {
      id: 2, cap: "js", editar: "js",
      titulo: "El mensaje del panel",
      concepto: "JavaScript · textContent",
      texto: "El piloto necesita saber qué pasa. El párrafo `${#mensaje}` dice «Sistema apagado» y " +
             "debe pasar a decir «Sistema en línea» cuando arranque el reactor.\n\n" +
             "Para cambiar el texto de un elemento se usa `${textContent}`:\n\n" +
             "`${document.getElementById(\"mensaje\").textContent = \"texto nuevo\";}`\n\n" +
             "Haz las dos cosas a la vez: encender la luz **y** cambiar el mensaje.",
      html: '<div class="panel">\n  <h2>Reactor principal</h2>\n  <div class="fila">\n    <div id="luz"></div>\n    <p id="mensaje">Sistema apagado</p>\n  </div>\n  <button id="boton">ARRANCAR</button>\n</div>',
      css: '#luz {\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  background: #3a4356;\n  transition: background .25s;\n}\n\n#luz.encendida {\n  background: #ffe066;\n  box-shadow: 0 0 18px #ffe066;\n}',
      js: "// Al pulsar ARRANCAR: enciende la luz y cambia el mensaje\n",
      pruebas: [
        {
          nombre: "Al pulsar ARRANCAR, el mensaje dice «Sistema en línea»",
          acciones: [{ tipo: "click", sel: "#boton" }],
          espera: [{ tipo: "texto", sel: "#mensaje", contiene: "en línea" }]
        },
        {
          nombre: "Antes de pulsar, el mensaje sigue diciendo «apagado»",
          acciones: [],
          espera: [{ tipo: "texto", sel: "#mensaje", contiene: "apagado" }]
        }
      ],
      pistas: [
        { t: "La idea", v: "Dentro del mismo `addEventListener` que ya conoces, añade una línea que cambie el texto." },
        { t: "Cómo se escribe", v: "`document.getElementById(\"mensaje\").textContent = \"Sistema en línea\";`" },
        { t: "Casi lo tienes", v: "Dos líneas dentro del clic:", codigo: 'document.getElementById("luz").classList.add("encendida");\ndocument.getElementById("______").________ = "Sistema en línea";' }
      ],
      solucion: {
        js: 'document.getElementById("boton").addEventListener("click", function () {\n  document.getElementById("luz").classList.add("encendida");\n  document.getElementById("mensaje").textContent = "Sistema en línea";\n});'
      },
      nota: "`textContent` es el texto que hay dentro de un elemento. Asignándole un valor nuevo, el navegador repinta ese texto y nada más: la estructura y los estilos siguen igual."
    },

    /* ---------------- 3 ---------------- */
    {
      id: 3, cap: "js", editar: "js",
      titulo: "El interruptor",
      concepto: "JavaScript · toggle y if",
      texto: "Un interruptor no solo enciende: también **apaga**. El botón debe alternar.\n\n" +
             "`${classList.toggle(\"encendida\")}` pone la clase si no estaba y la quita si estaba. " +
             "Y para saber en cuál de los dos estados estamos, se pregunta con `${classList.contains(\"encendida\")}` " +
             "dentro de un `${if}`.\n\n" +
             "Al terminar, el texto `${#mensaje}` debe decir **Encendido** o **Apagado** según cómo quede la luz.",
      html: '<div class="panel">\n  <h2>Iluminación</h2>\n  <div class="fila">\n    <div id="luz"></div>\n    <p id="mensaje">Apagado</p>\n  </div>\n  <button id="boton">INTERRUPTOR</button>\n</div>',
      css: '#luz {\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  background: #3a4356;\n  transition: background .25s;\n}\n\n#luz.encendida {\n  background: #ffe066;\n  box-shadow: 0 0 18px #ffe066;\n}',
      js: "// Un clic enciende; otro clic, apaga\n",
      pruebas: [
        {
          nombre: "Un clic enciende la luz",
          acciones: [{ tipo: "click", sel: "#boton" }],
          espera: [
            { tipo: "estilo", sel: "#luz", prop: "background-color", valor: "#ffe066" },
            { tipo: "texto", sel: "#mensaje", contiene: "encendido" }
          ]
        },
        {
          nombre: "Dos clics la vuelven a apagar",
          acciones: [{ tipo: "click", sel: "#boton" }, { tipo: "click", sel: "#boton" }],
          espera: [
            { tipo: "estilo", sel: "#luz", prop: "background-color", valor: "#3a4356" },
            { tipo: "texto", sel: "#mensaje", contiene: "apagado" }
          ]
        }
      ],
      pistas: [
        { t: "La idea", v: "Primero cambia la clase con `toggle`. Después pregunta si la luz ha quedado encendida para escribir uno de los dos mensajes." },
        { t: "Cómo se escribe", v: "`luz.classList.toggle(\"encendida\");` y luego `if (luz.classList.contains(\"encendida\")) { … } else { … }`" },
        { t: "Casi lo tienes", v: "Faltan las dos palabras del mensaje:", codigo: 'var luz = document.getElementById("luz");\nvar mensaje = document.getElementById("mensaje");\n\nboton.addEventListener("click", function () {\n  luz.classList.______("encendida");\n  if (luz.classList.contains("encendida")) {\n    mensaje.textContent = "__________";\n  } else {\n    mensaje.textContent = "_______";\n  }\n});' }
      ],
      solucion: {
        js: 'var boton = document.getElementById("boton");\nvar luz = document.getElementById("luz");\nvar mensaje = document.getElementById("mensaje");\n\nboton.addEventListener("click", function () {\n  luz.classList.toggle("encendida");\n\n  if (luz.classList.contains("encendida")) {\n    mensaje.textContent = "Encendido";\n  } else {\n    mensaje.textContent = "Apagado";\n  }\n});'
      },
      nota: "`toggle` alterna una clase: la añade si falta y la quita si sobra. Con `contains` preguntamos en cuál de los dos estados está, y `if / else` elige el mensaje. Guardar los elementos en variables al principio evita repetir `getElementById` cinco veces."
    },

    /* ---------------- 4 ---------------- */
    {
      id: 4, cap: "css", editar: "css",
      titulo: "Un botón decente",
      concepto: "CSS · estilos por id",
      texto: "El panel funciona, pero ese botón gris no parece de una estación espacial. Esta vez el " +
             "JavaScript está terminado: solo hay que escribir **CSS**.\n\n" +
             "Para elegir el botón se usa su id: `${#boton}`. Y dentro, las propiedades que ya conoces:\n\n" +
             "• `${background: #7c3aed;}` violeta\n" +
             "• `${color: #ffffff;}` texto blanco\n" +
             "• `${border-radius: 14px;}` esquinas redondeadas\n\n" +
             "El `padding` ya está bien, no lo toques.",
      html: '<div class="panel">\n  <h2>Consola de mando</h2>\n  <p>Botón de arranque del motor principal.</p>\n  <button id="boton">ARRANCAR</button>\n</div>',
      css: "/* Da estilo al botón usando el selector #boton */\n",
      js: "// En esta misión el JavaScript ya está hecho.\n",
      pruebas: [
        {
          nombre: "El botón es violeta",
          acciones: [],
          espera: [{ tipo: "estilo", sel: "#boton", prop: "background-color", valor: "#7c3aed" }]
        },
        {
          nombre: "El texto del botón es blanco",
          acciones: [],
          espera: [{ tipo: "estilo", sel: "#boton", prop: "color", valor: "#ffffff" }]
        },
        {
          nombre: "Las esquinas están redondeadas a 14px",
          acciones: [],
          espera: [{ tipo: "estilo", sel: "#boton", prop: "border-top-left-radius", valor: "14px" }]
        }
      ],
      pistas: [
        { t: "La idea", v: "Un bloque de CSS: selector, llaves y dentro las propiedades. Una sola regla basta." },
        { t: "Cómo se escribe", v: "`#boton { background: #7c3aed; color: #ffffff; border-radius: 14px; }`" },
        { t: "Casi lo tienes", v: "Faltan dos valores:", codigo: "#boton {\n  background: #______;\n  color: #ffffff;\n  border-radius: ____px;\n}" }
      ],
      solucion: {
        css: "#boton {\n  background: #7c3aed;\n  color: #ffffff;\n  border-radius: 14px;\n}"
      },
      nota: "Para dar estilo a un elemento concreto se usa su **id** con `#`. `background` pinta el fondo, `color` el texto y `border-radius` redondea las esquinas. El CSS base ya ponía `padding`: como no lo hemos tocado, se mantiene."
    },

    /* ---------------- 5 ---------------- */
    {
      id: 5, cap: "css", editar: "css",
      titulo: "Luces de estado",
      concepto: "CSS · selectores con clase",
      texto: "Cuando un elemento tiene una clase, se puede elegir **solo en ese caso**:\n\n" +
             "`${#luz.encendida}` significa «el elemento con id luz **y** clase encendida». " +
             "Sin la clase, la regla no se aplica.\n\n" +
             "Faltan dos reglas:\n\n" +
             "• `${#luz.encendida}` → fondo `${#3ee07a}` (verde)\n" +
             "• `${.panel.encendido}` → borde `${#3ee07a}`\n\n" +
             "Ya hay un `${#luz}` gris de base: no lo toques, añade lo que falta debajo.",
      html: '<div class="panel">\n  <h2>Luces de estado</h2>\n  <div class="fila">\n    <div id="luz"></div>\n    <p id="estado">En espera</p>\n  </div>\n</div>',
      css: "#luz {\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  background: #3a4356;\n}\n\n/* Añade aquí las dos reglas que faltan */\n",
      js: "// Nada que hacer en JavaScript: las clases las ponen las pruebas.\n",
      pruebas: [
        {
          nombre: "Con la clase «encendida», la luz se pone verde",
          acciones: [{ tipo: "clase", sel: "#luz", clase: "encendida" }],
          espera: [{ tipo: "estilo", sel: "#luz", prop: "background-color", valor: "#3ee07a" }]
        },
        {
          nombre: "Con la clase «encendido», el panel cambia el color del borde",
          acciones: [{ tipo: "clase", sel: ".panel", clase: "encendido" }],
          espera: [{ tipo: "estilo", sel: ".panel", prop: "border-top-color", valor: "#3ee07a" }]
        }
      ],
      pistas: [
        { t: "La idea", v: "Dos reglas nuevas, cada una con **dos** partes pegadas en el selector: el id o la clase del elemento, y la clase de estado." },
        { t: "Cómo se escribe", v: "`#luz.encendida { background: #3ee07a; }` y `.panel.encendido { border-color: #3ee07a; }`. Sin espacio entre las dos partes: con espacio sería «un elemento dentro de otro»." },
        { t: "Casi lo tienes", v: "Faltan los selectores:", codigo: "#____.________ {\n  background: #3ee07a;\n}\n\n.____.________ {\n  border-color: #3ee07a;\n}" }
      ],
      solucion: {
        css: "#luz.encendida {\n  background: #3ee07a;\n}\n\n.panel.encendido {\n  border-color: #3ee07a;\n}"
      },
      nota: "`#luz.encendida` se lee «el elemento con id luz que además tenga la clase encendida». La clase funciona como un interruptor: el mismo HTML se ve de una forma u otra según la clase que lleve, y por eso el CSS combinado con JavaScript sirve para todo (avisos, menús, pestañas…)."
    },

    /* ---------------- 6 ---------------- */
    {
      id: 6, cap: "todo", editar: "js",
      titulo: "Alerta roja",
      concepto: "CSS + JavaScript",
      texto: "Hay una fuga en el módulo 3. Al pulsar el botón, la estación entera debe ponerse en " +
             "modo alerta: fondo rojo oscuro, mensaje en rojo claro y la palabra **ALERTA** en el panel.\n\n" +
             "Un truco muy usado: **JavaScript pone una clase en `${<body>}` y el CSS hace el resto**.\n\n" +
             "• En `script.js`: al pulsar `${#alarma}`, añade la clase `${alerta}` al body y pon en " +
             "`${#mensaje}` el texto «¡ALERTA!».\n" +
             "• En `estilos.css`: `${body.alerta}` con fondo `${#3b0d0d}` y " +
             "`${body.alerta #mensaje}` con color `${#ff8a80}`.",
      html: '<div class="panel">\n  <h2>Sala de máquinas</h2>\n  <p id="mensaje">Sistemas estables</p>\n  <button id="alarma">ACTIVAR ALARMA</button>\n</div>',
      css: "/* Falta: cuando el body tenga la clase alerta */\n",
      js: '// Al pulsar #alarma: clase "alerta" en el body y mensaje de alerta\n',
      pruebas: [
        {
          nombre: "Al pulsar, el fondo del body se vuelve rojo oscuro",
          acciones: [{ tipo: "click", sel: "#alarma" }],
          espera: [{ tipo: "estilo", sel: "body", prop: "background-color", valor: "#3b0d0d" }]
        },
        {
          nombre: "El mensaje dice «¡ALERTA!»",
          acciones: [{ tipo: "click", sel: "#alarma" }],
          espera: [{ tipo: "texto", sel: "#mensaje", contiene: "ALERTA" }]
        },
        {
          nombre: "El mensaje se pinta en rojo claro",
          acciones: [{ tipo: "click", sel: "#alarma" }],
          espera: [{ tipo: "estilo", sel: "#mensaje", prop: "color", valor: "#ff8a80" }]
        }
      ],
      pistas: [
        { t: "La idea", v: "Dos archivos, dos trabajos: el JS **añade la clase** y cambia el texto; el CSS **describe** cómo se ve el conjunto con esa clase." },
        { t: "Cómo se escribe", v: "JS: `document.body.classList.add(\"alerta\");` y `mensaje.textContent = \"¡ALERTA!\";`. CSS: `body.alerta { background: #3b0d0d; }` y `body.alerta #mensaje { color: #ff8a80; }`" },
        { t: "Casi lo tienes", v: "Faltan los dos trozos del CSS:", codigo: "body.______ {\n  background: #3b0d0d;\n}\n\nbody.alerta ______ {\n  color: #ff8a80;\n}" }
      ],
      solucion: {
        js: 'document.getElementById("alarma").addEventListener("click", function () {\n  document.body.classList.add("alerta");\n  document.getElementById("mensaje").textContent = "¡ALERTA!";\n});',
        css: "body.alerta {\n  background: #3b0d0d;\n}\n\nbody.alerta #mensaje {\n  color: #ff8a80;\n}"
      },
      nota: "`document.body` es el elemento `<body>`: la caja que contiene toda la página. Poniéndole una clase, una sola línea de JavaScript cambia el aspecto de todo a la vez, porque el CSS puede escribir «cuando el body tenga la clase alerta, haz esto». Así funcionan los temas oscuros, los modos de alto contraste y los avisos de las webs reales."
    },

    /* ---------------- 7 ---------------- */
    {
      id: 7, cap: "js", editar: "js",
      titulo: "Contador de impactos",
      concepto: "JavaScript · variables",
      texto: "Cada micrometeorito que golpea la estación debe sumar un impacto. Necesitas recordar " +
             "una cifra entre un clic y el siguiente: eso es una **variable**.\n\n" +
             "`${var impactos = 0;}` crea la caja con un cero dentro. Después, en cada clic: " +
             "`${impactos = impactos + 1;}` (o `${impactos++;}`) y escribe el valor en el contador.\n\n" +
             "El contador empieza en 0 y debe llegar a mostrar 3 después de tres clics.",
      html: '<div class="panel">\n  <h2>Impactos recibidos</h2>\n  <p>Impactos: <span id="contador">0</span></p>\n  <button id="boton">+1 IMPACTO</button>\n</div>',
      css: "#contador {\n  font-weight: 800;\n  color: #ffd166;\n}",
      js: "// Cada clic suma 1 al contador\n",
      pruebas: [
        {
          nombre: "Tres clics muestran 3 impactos",
          acciones: [{ tipo: "click", sel: "#boton" }, { tipo: "click", sel: "#boton" }, { tipo: "click", sel: "#boton" }],
          espera: [{ tipo: "texto", sel: "#contador", exacto: "3" }]
        },
        {
          nombre: "Al cargar, el contador empieza en 0",
          acciones: [],
          espera: [{ tipo: "texto", sel: "#contador", exacto: "0" }]
        }
      ],
      pistas: [
        { t: "La idea", v: "Una variable fuera del clic guarda la cuenta; dentro del clic se suma uno y se escribe en la pantalla." },
        { t: "Cómo se escribe", v: "`var impactos = 0;` arriba del todo, y dentro del listener: `impactos++; document.getElementById(\"contador\").textContent = impactos;`" },
        { t: "Casi lo tienes", v: "Falta la suma:", codigo: 'var impactos = 0;\n\ndocument.getElementById("boton").addEventListener("click", function () {\n  impactos____;\n  document.getElementById("contador").textContent = ________;\n});' }
      ],
      solucion: {
        js: 'var impactos = 0;\n\nvar boton = document.getElementById("boton");\nvar contador = document.getElementById("contador");\n\nboton.addEventListener("click", function () {\n  impactos++;\n  contador.textContent = impactos;\n});'
      },
      nota: "La variable vive fuera del `addEventListener`, y eso es lo importante: si la declararas dentro, se reiniciaría en cada clic y siempre valdría 1. `impactos++` suma uno; después se escribe el número en el `textContent` (el navegador lo convierte a texto solo)."
    },

    /* ---------------- 8 ---------------- */
    {
      id: 8, cap: "js", editar: "js",
      titulo: "Saludo al piloto",
      concepto: "JavaScript · leer un input",
      texto: "El control de acceso pide el nombre del piloto. Un campo de texto es un `${<input>}`, y " +
             "su contenido se lee con `${.value}`.\n\n" +
             "Cuando se pulse el botón, lee el valor de `${#nombre}` y escribe en `${#mensaje}` algo " +
             "como **Hola, Ana**.\n\n" +
             "Se junta texto y valor con el signo `${+}`: `${\"Hola, \" + nombre.value}`.",
      html: '<div class="panel">\n  <h2>Control de acceso</h2>\n  <p id="mensaje">Piloto desconocido</p>\n  <input id="nombre" placeholder="Escribe tu nombre">\n  <button id="boton">SALUDAR</button>\n</div>',
      css: "#mensaje {\n  color: #4dd6c1;\n}",
      js: "// Lee el nombre y saluda\n",
      pruebas: [
        {
          nombre: "Con «Ana» en el campo, aparece «Hola, Ana»",
          acciones: [{ tipo: "escribir", sel: "#nombre", valor: "Ana" }, { tipo: "click", sel: "#boton" }],
          espera: [{ tipo: "texto", sel: "#mensaje", contiene: "hola, ana" }]
        },
        {
          nombre: "Con «Kai» en el campo, aparece «Kai»",
          acciones: [{ tipo: "escribir", sel: "#nombre", valor: "Kai" }, { tipo: "click", sel: "#boton" }],
          espera: [{ tipo: "texto", sel: "#mensaje", contiene: "kai" }]
        }
      ],
      pistas: [
        { t: "La idea", v: "Dentro del clic: lee `#nombre` con `.value` y escribe el saludo completo en `#mensaje`." },
        { t: "Cómo se escribe", v: "`var nombre = document.getElementById(\"nombre\").value;` y `document.getElementById(\"mensaje\").textContent = \"Hola, \" + nombre;`" },
        { t: "Casi lo tienes", v: "Falta la lectura del campo:", codigo: 'document.getElementById("boton").addEventListener("click", function () {\n  var nombre = document.getElementById("nombre").____;\n  document.getElementById("mensaje").textContent = "____, " + nombre;\n});' }
      ],
      solucion: {
        js: 'document.getElementById("boton").addEventListener("click", function () {\n  var nombre = document.getElementById("nombre").value;\n  document.getElementById("mensaje").textContent = "Hola, " + nombre;\n});'
      },
      nota: "En un `<input>`, lo que el usuario ha escrito está en `.value` (no en `textContent`: un campo no «contiene» texto, tiene un valor). El `+` pega dos textos: eso se llama concatenar."
    },

    /* ---------------- 9 ---------------- */
    {
      id: 9, cap: "todo", editar: "js",
      titulo: "Panel de mando",
      concepto: "Proyecto final · todo junto",
      texto: "Última misión: el panel de mando completo. Dos botones, dos sistemas y un mensaje que " +
             "resume el estado.\n\n" +
             "**En `script.js`**: cada botón se enciende y se apaga con `${toggle(\"activo\")}`, y después " +
             "hay que escribir en `${#mensaje}` el estado de los dos sistemas, por ejemplo " +
             "«Puertas: abiertas · Luces: encendidas».\n\n" +
             "**En `estilos.css`**: la clase `${.activo}` debe poner el fondo `${#ffe066}`.\n\n" +
             "Consejo: escribe una función `${refrescar()}` que lea los dos estados y guarde el mensaje; " +
             "así no repites el texto en los dos botones.",
      html: '<div class="panel">\n  <h2>Panel de mando</h2>\n  <p id="mensaje">Puertas: cerradas · Luces: apagadas</p>\n  <div class="fila">\n    <button id="puerta">PUERTA</button>\n    <button id="luces">LUCES</button>\n  </div>\n</div>',
      css: "/* La clase .activo pinta el botón en amarillo */\n",
      js: "// Cada botón cambia su sistema y actualiza el mensaje\n",
      pruebas: [
        {
          nombre: "Al pulsar PUERTA, el mensaje dice «Puertas: abiertas»",
          acciones: [{ tipo: "click", sel: "#puerta" }],
          espera: [{ tipo: "texto", sel: "#mensaje", contiene: "puertas: abiertas" }]
        },
        {
          nombre: "Con PUERTA y LUCES pulsados, el mensaje lo dice todo",
          acciones: [{ tipo: "click", sel: "#puerta" }, { tipo: "click", sel: "#luces" }],
          espera: [
            { tipo: "texto", sel: "#mensaje", contiene: "puertas: abiertas" },
            { tipo: "texto", sel: "#mensaje", contiene: "luces: encendidas" }
          ]
        },
        {
          nombre: "El botón LUCES se enciende en amarillo al pulsarlo",
          acciones: [{ tipo: "click", sel: "#luces" }],
          espera: [{ tipo: "estilo", sel: "#luces", prop: "background-color", valor: "#ffe066" }]
        }
      ],
      pistas: [
        { t: "La idea", v: "Cada botón: `toggle` de la clase `activo` y luego llamar a `refrescar()`. `refrescar` mira si cada botón tiene la clase y escribe la frase completa." },
        { t: "Cómo se escribe", v: "`var abierta = puerta.classList.contains(\"activo\");` · `mensaje.textContent = \"Puertas: \" + (abierta ? \"abiertas\" : \"cerradas\") + \" · Luces: \" + (encendidas ? \"encendidas\" : \"apagadas\");`" },
        { t: "Casi lo tienes", v: "Faltan dos detalles:", codigo: 'function refrescar() {\n  var abierta = puerta.classList.________("activo");\n  var encendidas = luces.classList.contains("______");\n  mensaje.textContent =\n    "Puertas: " + (abierta ? "abiertas" : "cerradas") +\n    " · Luces: " + (encendidas ? "________" : "apagadas");\n}' }
      ],
      solucion: {
        js: 'var puerta = document.getElementById("puerta");\nvar luces = document.getElementById("luces");\nvar mensaje = document.getElementById("mensaje");\n\nfunction refrescar() {\n  var abierta = puerta.classList.contains("activo");\n  var encendidas = luces.classList.contains("activo");\n\n  mensaje.textContent =\n    "Puertas: " + (abierta ? "abiertas" : "cerradas") +\n    " · Luces: " + (encendidas ? "encendidas" : "apagadas");\n}\n\npuerta.addEventListener("click", function () {\n  puerta.classList.toggle("activo");\n  refrescar();\n});\n\nluces.addEventListener("click", function () {\n  luces.classList.toggle("activo");\n  refrescar();\n});',
        css: ".activo {\n  background: #ffe066;\n  color: #0e1524;\n}"
      },
      nota: "Aquí se junta todo: variables para los elementos, `toggle` para cambiar el estado, `contains` para consultarlo, una función propia para no repetir código y una clase de CSS que pinta el botón activo. Es la estructura de casi cualquier interfaz real: **estado en JavaScript, aspecto en CSS, estructura en HTML**."
    }
  ];

  /* ---------------- Montaje del documento del jugador ---------------- */
  /* Gancho de errores + sonda de calibración: según el motor, el número de
     línea de un error es absoluto (línea del documento) o relativo al
     contenido del <script>. La sonda lo detecta sola. */
  var HOOK = "<scr" + "ipt>" +
    "window.__errores=[];window.__sondaLinea=0;" +
    "window.onerror=function(m,f,l){" +
    "  if(window.__sondaLinea===0){window.__sondaLinea=l||-1;return true;}" +
    "  window.__errores.push({mensaje:String(m),linea:l});return true;};" +
    "</scr" + "ipt>";

  var SONDA = "<scr" + "ipt>__sonda_error__();\n</scr" + "ipt>";

  /**
   * Construye el documento completo que se ejecutará en el iframe.
   * @returns {{html:string, desfase:number}}
   */
  function construir(nivel, codigo) {
    var c = codigo || {};
    var htmlJugador = String(c.html == null ? nivel.html : c.html);
    var cssJugador = String(c.css == null ? nivel.css : c.css);
    var jsJugador = String(c.js == null ? nivel.js : c.js).replace(/<\/script/gi, "<\\/script");

    var cabecera = '<!DOCTYPE html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n<style>\n' +
      BASE_CSS + "\n\n/* ---- CSS del jugador ---- */\n" + cssJugador + "\n</style>\n</head>\n<body>\n" +
      htmlJugador + "\n";

    var prefijo = cabecera + HOOK + "\n" + SONDA + "\n";
    // lineas del documento antes del JS del jugador (convención absoluta)
    var desfase = (prefijo.match(/\n/g) || []).length;

    var resto = "<scr" + "ipt>" + jsJugador + "\n</scr" + "ipt>\n</body>\n</html>";

    return { html: prefijo + resto, desfase: desfase };
  }

  var JUEGO = {
    BASE_CSS: BASE_CSS,
    NIVELES: NIVELES,
    construir: construir
  };

  if (typeof module !== "undefined" && module.exports) { module.exports.JUEGO = JUEGO; }
  raiz.JUEGO = JUEGO;

  /* ===================================================================
     PARTE 2 · INTERFAZ
     =================================================================== */
  if (typeof document === "undefined") { return; }

  document.addEventListener("DOMContentLoaded", function () {
    var $ = function (id) { return document.getElementById(id); };

    var CLAVE = "estacion-progreso-v1";
    var ARCHIVOS = ["html", "css", "js"];
    var NOMBRES = { html: "index.html", css: "estilos.css", js: "script.js" };

    var progreso = cargar();
    var idx = Math.min(progreso.nivelActual || 0, NIVELES.length - 1);
    var nivel = NIVELES[idx];
    var codigo = {};
    var archivo = "js";
    var pistasMostradas = 0;
    var celebrado = false;
    var temporizador = null;

    var elEditor = $("editor"), elGutter = $("gutter"), elConsola = $("consola");
    var preview = $("preview");
    var runner = null;          // iframe oculto para las pruebas
    var resultados = [];        // último resultado de las pruebas
    var erroresVistos = [];

    /* ---------------- progreso ---------------- */
    function cargar() {
      try {
        var d = JSON.parse(localStorage.getItem(CLAVE) || "{}");
        return {
          nivelActual: d.nivelActual || 0,
          nivelMax: d.nivelMax || 0,
          estrellas: d.estrellas || {},
          completados: d.completados || {},
          codigo: d.codigo || {}
        };
      } catch (e) {
        return { nivelActual: 0, nivelMax: 0, estrellas: {}, completados: {}, codigo: {} };
      }
    }
    function guardar() {
      try { localStorage.setItem(CLAVE, JSON.stringify(progreso)); } catch (e) {}
    }

    /* ---------------- utilidades de texto ---------------- */
    function escapar(s) {
      return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function formatear(txt) {
      var s = String(txt)
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/`([^`]+)`/g, function (m, d) { return "<code>" + escapar(d) + "</code>"; });
      var out = "", i = 0;
      while (i < s.length) {
        var ini = s.indexOf("${", i);
        if (ini === -1) { out += s.slice(i); break; }
        out += s.slice(i, ini);
        var hondo = 0, j = ini + 1, cerrado = false;
        for (; j < s.length; j++) {
          var ch = s.charAt(j);
          if (ch === "{") { hondo++; }
          else if (ch === "}") { hondo--; if (hondo === 0) { j++; cerrado = true; break; } }
        }
        out += "<code>" + escapar(s.slice(ini + 2, cerrado ? j - 1 : s.length)) + "</code>";
        i = j;
      }
      return out.replace(/\n\n/g, "<br><br>");
    }
    function limpiar(t) {
      return String(t == null ? "" : t).replace(/\s+/g, " ").trim().toLowerCase();
    }
    function aHex(color) {
      var m = /^rgba?\((\d+), ?(\d+), ?(\d+)/i.exec(String(color).trim());
      if (!m) return String(color).trim();
      function dos(n) { var h = parseInt(n, 10).toString(16); return h.length === 1 ? "0" + h : h; }
      return "#" + dos(m[1]) + dos(m[2]) + dos(m[3]);
    }

    /* ---------------- consola ---------------- */
    function limpiarConsola() {
      elConsola.innerHTML = '<p class="consola-vacia">Aquí verás errores y avisos.</p>';
    }
    function aviso(texto, clase) {
      var vacio = elConsola.querySelector(".consola-vacia");
      if (vacio) vacio.remove();
      var p = document.createElement("p");
      p.className = clase || "info";
      p.innerHTML = texto;
      elConsola.appendChild(p);
      elConsola.scrollTop = elConsola.scrollHeight;
    }

    /* ---------------- iframes ---------------- */
    function crearIframe(visible) {
      var f = document.createElement("iframe");
      f.className = visible ? "lienzo" : "lienzo-oculto";
      f.setAttribute("title", visible ? "Vista previa de tu panel" : "Probador interno");
      document.body.appendChild(f);
      return f;
    }

    function escribir(iframe, nivelActual, codigoActual) {
      var montado = construir(nivelActual, codigoActual);
      var doc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
      if (!doc) return null;
      doc.open();
      doc.write(montado.html);
      doc.close();
      return montado.desfase;
    }

    function esperar(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

    /* ---------------- comprobaciones ---------------- */
    function valorDe(el, prop, w) {
      var cs = w.getComputedStyle(el);
      var camel = prop.replace(/-([a-z])/g, function (m, l) { return l.toUpperCase(); });
      if (prop === "padding") {
        return (cs.paddingTop || "") + " " + (cs.paddingLeft || "");
      }
      return cs[camel] || "";
    }

    function colorEsperado(w, doc, valor) {
      var probe = doc.createElement("span");
      probe.style.color = valor;
      doc.body.appendChild(probe);
      var c = w.getComputedStyle(probe).color;
      probe.remove();
      return c || valor;
    }

    function comprobar(e, w, d) {
      var el = d.querySelector(e.sel);
      if (!el) return { ok: false, motivo: "No encuentro " + e.sel };

      if (e.tipo === "texto") {
        var txt = limpiar(el.textContent);
        if (e.exacto !== undefined) {
          var esperado = limpiar(e.exacto);
          return txt === esperado
            ? { ok: true }
            : { ok: false, motivo: e.sel + ": esperaba «" + e.exacto + "» y dice «" + (el.textContent || "").trim() + "»" };
        }
        var busca = limpiar(e.contiene);
        return txt.indexOf(busca) !== -1
          ? { ok: true }
          : { ok: false, motivo: e.sel + ": esperaba «" + e.contiene + "» y dice «" + (el.textContent || "").trim() + "»" };
      }

      if (e.tipo === "clase") {
        var tiene = el.classList.contains(e.clase);
        return tiene === (e.tiene !== false)
          ? { ok: true }
          : { ok: false, motivo: e.sel + (e.tiene === false ? " no debería tener " : " debería tener ") + "la clase " + e.clase };
      }

      if (e.tipo === "estilo") {
        var actual = String(valorDe(el, e.prop, w)).trim();
        var objetivo = /color/i.test(e.prop) ? colorEsperado(w, d, e.valor) : e.valor;
        var igual;
        if (/color/i.test(e.prop)) {
          igual = actual === objetivo;
        } else {
          var ma = /^(-?[\d.]+)px$/.exec(actual), mb = /^(-?[\d.]+)px$/.exec(String(objetivo));
          igual = actual === objetivo || (ma && mb && Math.abs(parseFloat(ma[1]) - parseFloat(mb[1])) <= 1);
        }
        return igual
          ? { ok: true }
          : {
              ok: false,
              motivo: e.sel + " · " + e.prop + ": esperaba " +
                (/color/i.test(e.prop) ? aHex(objetivo) : objetivo) + " y hay " +
                (/color/i.test(e.prop) ? aHex(actual || "sin color") : (actual || "nada"))
            };
      }

      return { ok: false, motivo: "Comprobación desconocida" };
    }

    function hacer(a, w, d) {
      var el = d.querySelector(a.sel);
      if (!el) return "No encuentro " + a.sel;
      try {
        if (a.tipo === "click") {
          el.click();
        } else if (a.tipo === "escribir") {
          el.value = a.valor;
          el.dispatchEvent(new w.Event("input", { bubbles: true }));
          el.dispatchEvent(new w.Event("change", { bubbles: true }));
        } else if (a.tipo === "clase") {
          if (a.poner === false) el.classList.remove(a.clase);
          else el.classList.add(a.clase);
        }
      } catch (err) {
        return "Error al probar: " + (err && err.message ? err.message : err);
      }
      return null;
    }

    async function ejecutarPruebas() {
      if (!runner) {
        runner = crearIframe(false);
      }
      var salida = [];
      var errores = [];
      var totalLineasJs = String(codigo.js == null ? nivel.js : codigo.js).split("\n").length;

      for (var i = 0; i < nivel.pruebas.length; i++) {
        var p = nivel.pruebas[i];
        var desfase = escribir(runner, nivel, codigo);
        await esperar(20);
        var w = runner.contentWindow, d = runner.contentDocument;
        if (!d) {
          salida.push({ nombre: p.nombre, ok: false, detalle: "No se pudo ejecutar tu panel." });
          continue;
        }

        // ¿este motor cuenta las líneas de forma relativa al script?
        var relativa = false;
        try { relativa = (w.__sondaLinea === 1); } catch (e) {}

        var fallo = null;
        (p.acciones || []).forEach(function (a) { if (!fallo) fallo = hacer(a, w, d); });

        var esperas = (p.espera || []).map(function (e) { return comprobar(e, w, d); });
        var ok = !fallo && esperas.every(function (x) { return x.ok; });
        var detalle = fallo || esperas.filter(function (x) { return !x.ok; })
          .map(function (x) { return x.motivo; }).join(" · ");

        salida.push({ nombre: p.nombre, ok: ok, detalle: detalle });

        // errores de JavaScript de este intento
        try {
          (w.__errores || []).forEach(function (err) {
            var linea = null;
            if (err.linea) {
              linea = relativa ? err.linea : err.linea - desfase;
              if (!(linea >= 1 && linea <= totalLineasJs)) { linea = null; }
            }
            errores.push({ mensaje: err.mensaje, linea: linea });
          });
        } catch (e) {}
      }

      return { resultados: salida, errores: errores };
    }

    /* ---------------- vista previa ---------------- */
    function pintarPreview() {
      escribir(preview, nivel, codigo);
    }

    /* ---------------- panel de pruebas ---------------- */
    function pintarPruebas(lista) {
      var ul = $("listaPruebas");
      ul.innerHTML = "";
      var hechas = 0;

      nivel.pruebas.forEach(function (p, i) {
        var r = lista ? lista[i] : null;
        var li = document.createElement("li");
        li.className = "prueba" + (r ? (r.ok ? " ok" : " mal") : " pendiente");
        if (r && r.ok) hechas++;

        var marca = document.createElement("span");
        marca.className = "marca";
        marca.textContent = r ? (r.ok ? "✓" : "✗") : "○";

        var cuerpo = document.createElement("div");
        var titulo = document.createElement("strong");
        titulo.textContent = p.nombre;
        cuerpo.appendChild(titulo);
        if (r && !r.ok && r.detalle) {
          var det = document.createElement("span");
          det.className = "detalle";
          det.textContent = r.detalle;
          cuerpo.appendChild(det);
        }

        li.appendChild(marca);
        li.appendChild(cuerpo);
        ul.appendChild(li);
      });

      $("pruebasResumen").textContent = hechas + " / " + nivel.pruebas.length;
      return hechas;
    }

    /* ---------------- flujo principal ---------------- */
    async function probar(manual) {
      pintarPreview();
      limpiarConsola();
      var salida = await ejecutarPruebas();
      resultados = salida.resultados;

      var hechas = pintarPruebas(resultados);
      var total = nivel.pruebas.length;

      // errores de JavaScript, sin repetir el mismo mensaje
      var vistos = [];
      salida.errores.forEach(function (e) {
        var clave = e.mensaje + "#" + e.linea;
        if (vistos.indexOf(clave) !== -1) return;
        vistos.push(clave);
        aviso("⚠️ Error en " + NOMBRES.js + (e.linea ? " · línea " + e.linea : "") + ": " + escapar(e.mensaje), "error");
      });

      if (hechas === total) {
        $("pruebasNota").textContent = "¡Todas las pruebas en verde! El sistema está reparado.";
        if (!celebrado) { celebrar(); }
      } else {
        $("pruebasNota").textContent = (manual ? "" : "") +
          "Van " + hechas + " de " + total + " pruebas. Lee las que están en rojo: te dicen qué esperaba y qué encontró.";
        if (manual && hechas < total) {
          aviso("Todavía no pasan todas las pruebas. Revisa las rojas del panel de la izquierda.", "info");
        }
      }
      return { hechas: hechas, total: total };
    }

    /* ---------------- editor ---------------- */
    function actualizarGutter() {
      var n = elEditor.value.split("\n").length;
      var html = "";
      for (var i = 1; i <= Math.max(n, 1); i++) { html += "<span>" + i + "</span>"; }
      elGutter.innerHTML = html;
      elGutter.scrollTop = elEditor.scrollTop;
    }

    function cargarCodigoEnEditor() {
      elEditor.value = codigo[archivo] == null ? "" : codigo[archivo];
      elEditor.placeholder = archivo === "js"
        ? "// Escribe aquí tu JavaScript"
        : (archivo === "css" ? "/* Escribe aquí tu CSS */" : "<!-- Escribe aquí tu HTML -->");
      elEditor.setAttribute("aria-label", NOMBRES[archivo]);
      actualizarGutter();
    }

    function cambiarTab(nuevo) {
      archivo = nuevo;
      Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (t) {
        var activo = t.getAttribute("data-archivo") === archivo;
        t.classList.toggle("activo", activo);
        t.setAttribute("aria-selected", activo ? "true" : "false");
      });
      cargarCodigoEnEditor();
      elEditor.focus();
    }

    elEditor.addEventListener("input", function () {
      codigo[archivo] = elEditor.value;
      actualizarGutter();
      guardarCodigo();
      clearTimeout(temporizador);
      temporizador = setTimeout(function () { probar(false); }, 800);
    });
    elEditor.addEventListener("scroll", function () { elGutter.scrollTop = elEditor.scrollTop; });
    elEditor.addEventListener("keydown", function (e) {
      if (e.key === "Tab") {
        e.preventDefault();
        var s = elEditor.selectionStart, t = elEditor.selectionEnd;
        elEditor.value = elEditor.value.slice(0, s) + "  " + elEditor.value.slice(t);
        elEditor.selectionStart = elEditor.selectionEnd = s + 2;
        actualizarGutter();
        codigo[archivo] = elEditor.value;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        clearTimeout(temporizador);
        probar(true);
      }
    });

    function guardarCodigo() {
      progreso.codigo[nivel.id] = {
        html: codigo.html, css: codigo.css, js: codigo.js
      };
      guardar();
    }

    /* ---------------- nivel ---------------- */
    function pintarNivel() {
      nivel = NIVELES[idx];

      $("misionNum").textContent = "Misión " + (idx + 1) + " de " + NIVELES.length;
      $("misionTitulo").textContent = nivel.titulo;
      $("misionConcepto").textContent = nivel.concepto;
      $("misionTexto").innerHTML = formatear(nivel.texto);

      pistasMostradas = 0;
      celebrado = false;
      $("pistasLista").innerHTML = "";
      $("pistasUsadas").textContent = "0 / " + nivel.pistas.length;
      $("btnPista").disabled = false;
      $("btnPista").textContent = "Dame una pista";

      // código del nivel (guardado o plantilla)
      var guardado = progreso.codigo[nivel.id] || {};
      codigo = {
        html: guardado.html !== undefined ? guardado.html : nivel.html,
        css: guardado.css !== undefined ? guardado.css : nivel.css,
        js: guardado.js !== undefined ? guardado.js : nivel.js
      };

      cambiarTab(nivel.editar || "js");
      pintarPruebas(null);
      $("pruebasNota").textContent = "Pulsa ▶ Probar y la estación comprobará tu código.";
      limpiarConsola();
      pintarPreview();
      pintarProgreso();

      // mención de los archivos que pide la misión
      $("tabsInfo").textContent = nivel.cap === "todo" ? "edita 2 archivos" :
        (nivel.cap === "css" ? "edita estilos.css" : "edita script.js");
    }

    function irANivel(i) {
      idx = Math.max(0, Math.min(i, NIVELES.length - 1));
      progreso.nivelActual = idx;
      guardar();
      pintarNivel();
    }

    function pintarProgreso() {
      var cont = $("progreso");
      cont.innerHTML = "";
      NIVELES.forEach(function (n, i) {
        var b = document.createElement("button");
        b.textContent = i + 1;
        var hecho = !!progreso.completados[n.id];
        var desbloqueado = i <= (progreso.nivelMax || 0);
        if (i === idx) b.classList.add("actual");
        else if (hecho) b.classList.add("hecho");
        else if (!desbloqueado) b.classList.add("bloqueado");
        b.title = "Misión " + (i + 1) + ": " + n.titulo;
        b.setAttribute("aria-label", b.title);
        b.addEventListener("click", function () {
          if (!desbloqueado && !hecho) { aviso("Para abrir esta misión, repara antes las anteriores 🙂"); return; }
          irANivel(i);
        });
        cont.appendChild(b);
      });
    }

    /* ---------------- pistas ---------------- */
    $("btnPista").addEventListener("click", function () {
      if (pistasMostradas >= nivel.pistas.length) return;
      var p = nivel.pistas[pistasMostradas];
      var div = document.createElement("div");
      div.className = "pista";
      var html = "<strong>" + (pistasMostradas + 1) + ". " + p.t + "</strong>" + formatear(p.v);
      if (p.codigo) html += "<pre>" + escapar(p.codigo) + "</pre>";
      div.innerHTML = html;
      $("pistasLista").appendChild(div);
      pistasMostradas++;
      $("pistasUsadas").textContent = pistasMostradas + " / " + nivel.pistas.length;
      if (pistasMostradas >= nivel.pistas.length) {
        $("btnPista").disabled = true;
        $("btnPista").textContent = "No hay más pistas 🙂";
      }
    });

    /* ---------------- éxito ---------------- */
    function celebrar() {
      celebrado = true;
      var estrellas = pistasMostradas === 0 ? 3 : (pistasMostradas >= 3 ? 1 : 2);
      progreso.estrellas[nivel.id] = Math.max(progreso.estrellas[nivel.id] || 0, estrellas);
      progreso.completados[nivel.id] = true;
      progreso.nivelMax = Math.max(progreso.nivelMax || 0, Math.min(idx + 1, NIVELES.length - 1));
      guardar();
      pintarProgreso();

      var txt = "";
      for (var i = 0; i < 3; i++) { txt += i < estrellas ? "⭐" : "☆"; }
      $("estrellasModal").textContent = txt;

      var ultimo = idx === NIVELES.length - 1;
      $("exitoTitulo").textContent = ultimo ? "¡Estación reparada! 🛰️" : "¡Sistema reparado!";
      $("exitoTexto").textContent = ultimo
        ? "Has arreglado los nueve sistemas: estructura con HTML, aspecto con CSS y comportamiento con JavaScript. Las pruebas automáticas están todas en verde."
        : (estrellas === 3 ? "Todas las pruebas en verde y sin pistas. ¡Nivel técnico superior!"
                           : "Todas las pruebas en verde. Repite la misión sin pistas para las 3 estrellas.");
      $("btnSiguiente").style.display = ultimo ? "none" : "inline-block";

      confeti();
      $("modalExito").classList.add("abierto");
    }

    function confeti() {
      var caja = $("confeti");
      caja.innerHTML = "";
      var colores = ["#4dd6c1", "#8b7cf6", "#ffd166", "#3ee07a", "#ff6b6b"];
      for (var i = 0; i < 24; i++) {
        var p = document.createElement("span");
        p.className = "confeti-pieza";
        p.style.left = Math.random() * 100 + "%";
        p.style.background = colores[i % colores.length];
        p.style.animationDelay = (Math.random() * 0.5) + "s";
        caja.appendChild(p);
      }
    }

    $("btnSiguiente").addEventListener("click", function () {
      $("modalExito").classList.remove("abierto");
      irANivel(idx + 1);
    });
    $("btnRepetir").addEventListener("click", function () {
      $("modalExito").classList.remove("abierto");
    });

    /* ---------------- solución ---------------- */
    $("btnSolucion").addEventListener("click", function () {
      var cont = $("solucionCodigo");
      cont.innerHTML = "";
      ARCHIVOS.forEach(function (a) {
        if (!nivel.solucion[a]) return;
        var h = document.createElement("h3");
        h.textContent = NOMBRES[a];
        var pre = document.createElement("pre");
        pre.className = "codigo-solucion";
        pre.textContent = nivel.solucion[a];
        cont.appendChild(h);
        cont.appendChild(pre);
      });
      $("solucionNota").innerHTML = formatear(nivel.nota);
      $("modalSolucion").classList.add("abierto");
    });

    $("btnCopiarSolucion").addEventListener("click", function () {
      ARCHIVOS.forEach(function (a) {
        if (nivel.solucion[a]) { codigo[a] = nivel.solucion[a]; }
      });
      guardarCodigo();
      cargarCodigoEnEditor();
      $("modalSolucion").classList.remove("abierto");
      probar(false);
    });

    ["btnCerrarSolucion", "btnCerrarSolucion2"].forEach(function (id) {
      $(id).addEventListener("click", function () { $("modalSolucion").classList.remove("abierto"); });
    });

    /* ---------------- chuleta ---------------- */
    var CHULETA = [
      {
        titulo: "HTML · la estructura",
        filas: [
          ["Un bloque", '<div class="panel">…</div>', "Una caja que agrupa cosas."],
          ["Un id", '<div id="luz">', "Nombre único: se elige con #luz."],
          ["Párrafo", "<p id=\"mensaje\">Hola</p>", "Texto normal."],
          ["Botón", '<button id="boton">ARRANCAR</button>', "Se puede pulsar."],
          ["Campo de texto", '<input id="nombre" placeholder="Nombre">', "Su contenido está en .value."]
        ]
      },
      {
        titulo: "CSS · el aspecto",
        filas: [
          ["Por id", "#boton { … }", "Un elemento concreto."],
          ["Por clase", ".activo { … }", "Todos los que tengan esa clase."],
          ["Id + clase", "#luz.encendida { … }", "Solo si tiene las dos cosas."],
          ["Dentro de otro", "body.alerta #mensaje { … }", "Un hijo dentro de un padre."],
          ["Colores", "background: #ffe066;  color: #0e1524;", "Fondo y texto."],
          ["Forma", "border-radius: 14px;", "Redondea las esquinas."],
          ["Borde", "border: 1px solid #26314a;", "Grosor, estilo y color."]
        ]
      },
      {
        titulo: "JavaScript · el comportamiento",
        filas: [
          ["Buscar un elemento", 'document.getElementById("luz")', "Por su id."],
          ["Escuchar un clic", 'elemento.addEventListener("click", function () { … })', "Se ejecuta al pulsar."],
          ["Añadir/quitar clase", 'elemento.classList.add("activo")\nelemento.classList.remove("activo")\nelemento.classList.toggle("activo")', "Cambia el aspecto vía CSS."],
          ["Preguntar si tiene clase", 'elemento.classList.contains("activo")', "Devuelve true o false."],
          ["Cambiar un texto", 'elemento.textContent = "nuevo"', "Escribe dentro."],
          ["Leer un campo", 'elemento.value', "Lo que escribió el usuario."],
          ["Guardar un número", "var n = 0;  n++;", "Variable que suma."],
          ["Decidir", "if (condición) { … } else { … }", "Dos caminos."],
          ["El body entero", "document.body", "La caja de toda la página."]
        ]
      }
    ];

    $("btnChuleta").addEventListener("click", function () {
      var html = '<p class="chuleta-intro">Lo que se usa en estas misiones. Son atajos: no hace falta memorizar nada.</p>';
      CHULETA.forEach(function (sec) {
        html += "<h3>" + sec.titulo + "</h3><table class=\"tabla-chuleta\">";
        html += "<tr><th>Para</th><th>Se escribe</th><th>Nota</th></tr>";
        sec.filas.forEach(function (f) {
          html += "<tr><td>" + f[0] + "</td><td><code>" + escapar(f[1]) + "</code></td><td>" + f[2] + "</td></tr>";
        });
        html += "</table>";
      });
      $("chuletaContenido").innerHTML = html;
      $("modalChuleta").classList.add("abierto");
    });
    $("btnCerrarChuleta").addEventListener("click", function () {
      $("modalChuleta").classList.remove("abierto");
    });

    /* ---------------- ayuda, tabs y botones ---------------- */
    $("btnAyuda").addEventListener("click", function () { $("modalAyuda").classList.add("abierto"); });
    ["btnCerrarAyuda", "btnCerrarAyuda2"].forEach(function (id) {
      $(id).addEventListener("click", function () { $("modalAyuda").classList.remove("abierto"); });
    });

    document.querySelectorAll(".tab").forEach(function (t) {
      t.addEventListener("click", function () {
        codigo[archivo] = elEditor.value;
        guardarCodigo();
        cambiarTab(t.getAttribute("data-archivo"));
      });
    });

    $("btnProbar").addEventListener("click", function () { probar(true); });
    $("btnReiniciar").addEventListener("click", function () {
      pintarPreview();
      pintarPruebas(null);
      limpiarConsola();
      aviso("Vista reiniciada al estado inicial de tu código.", "info");
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal.abierto").forEach(function (m) { m.classList.remove("abierto"); });
      }
    });

    /* ---------------- arranque ---------------- */
    // aviso de alert() para que no bloquee las pruebas
    pintarNivel();
    setTimeout(function () {
      aviso("Consejo: usa <code>textContent</code> y <code>classList</code>; evita <code>alert()</code>, que bloquearía las pruebas.", "info");
    }, 1200);
  });

})(typeof window !== "undefined" ? window : globalThis);
