# 🛰️ Estación Órbita

**Juego para aprender HTML, CSS y JavaScript reparando los sistemas de una estación espacial.**

La diferencia con otros juegos de programación: aquí el juego **ejecuta tu código y lo prueba**.
Pulsa tus botones, escribe en tus campos y comprueba el resultado, como las pruebas automáticas de
un programador de verdad. 9 misiones, 3 pistas cada una y solución explicada.

---

## 1. Cómo se abre

| Formato | Qué abrir |
|---|---|
| Un solo archivo | `estacion-orbita.html` |
| Carpeta | `estacion-orbita/index.html` |

Doble clic y listo: no hay que instalar nada, no hay servidor y **no necesita internet**. Funciona
en Chrome, Edge, Firefox y Safari, también en tableta y móvil.

---

## 2. La pantalla

    ┌──────────────┬─────────────────────────┬──────────────────────┐
    │  MISIÓN      │  🖥️ TU PANEL            │  EDITOR              │
    │  qué reparar │  tu página funcionando  │  index.html          │
    │  pistas 💡   │  (puedes hacer clic)    │  estilos.css         │
    │  solución 🧪 │  ───────────────────    │  script.js           │
    │              │  🔍 PRUEBAS AUTOMÁTICAS │  ──────────────────  │
    │              │  ✓ ✓ ✗                  │  CONSOLA (errores)   │
    └──────────────┴─────────────────────────┴──────────────────────┘

---

## 3. La partida, paso a paso

1. Lee la misión y mira las **pruebas**: son los objetivos, escritos como los escribiría un
   programador («al pulsar ARRANCAR, la luz se enciende»).
2. Abre la pestaña del archivo que toque (`index.html`, `estilos.css` o `script.js`).
3. Escribe tu código. **Se prueba solo** en cuanto dejas de escribir (un segundo), o al pulsar
   **▶ Probar** / `Ctrl + Enter`.
4. Las pruebas se ponen en **verde**. Si alguna está en rojo, te dice exactamente qué esperaba y
   qué encontró: `#luz · background-color: esperaba #ffe066 y hay #3a4356`.
5. Cuando todas están en verde, misión superada.

Puedes hacer clic **dentro** del panel: es tu página de verdad, no una foto.

---

## 4. Las 9 misiones

| # | Misión | Archivo | Se aprende |
|---|--------|---------|-----------|
| 1 | Botón de arranque | script.js | eventos y `classList.add` |
| 2 | El mensaje del panel | script.js | cambiar texto con `textContent` |
| 3 | El interruptor | script.js | `classList.toggle` + `if / else` |
| 4 | Un botón decente | estilos.css | estilos por `#id` |
| 5 | Luces de estado | estilos.css | `#luz.encendida`, `.panel.encendido` |
| 6 | Alerta roja | 2 archivos | clase en el `body` + CSS que reacciona |
| 7 | Contador de impactos | script.js | variables que suman |
| 8 | Saludo al piloto | script.js | leer un `<input>` con `.value` |
| 9 | Panel de mando | 2 archivos | proyecto final: estado + estilos |

---

## 5. Ayudas

- **💡 Dame una pista** — 3 por misión: la idea, cómo se escribe y el código con huecos.
- **🧪 Ver la solución** — código final por archivo, con explicación, y botón para copiarlo.
- **📖 Chuleta** — tabla de HTML, CSS y JavaScript con lo que se usa en el juego.
- **Consola** — errores de JavaScript con su número de línea y avisos útiles.

---

## 6. Puntuación y progreso

- **⭐⭐⭐** superar la misión sin pistas · **⭐⭐** con 1 o 2 · **⭐** con las 3.
- Se guardan las estrellas, las misiones completadas y **tu código de cada misión**
  (`localStorage`, clave `estacion-progreso-v1`).
- Para empezar de cero: borra los datos del sitio o usa una ventana privada.

---

## 7. Reglas de la casa

- **Nada de `alert()`**: durante las pruebas dejaría un diálogo colgado. Usa `textContent`.
- El bucle `while` está desactivado a propósito: si nunca termina, la pestaña se congela. Usa `for`.
- Si algo se queda pensando, recarga la página: tu código está guardado.

---

## 8. Cómo funciona (para curiosos y docentes)

- Tu HTML, tu CSS y tu JavaScript se montan en un **documento aislado** (un `iframe`) y se
  ejecutan de verdad. Así tu CSS no puede romper el juego y el juego puede leer tu DOM.
- Cada prueba se ejecuta en **un documento nuevo**: hace clic (`.click()`), escribe (`input.value`
  + eventos `input` y `change`), añade clases… y después compara:
  - **texto** (`textContent`, sin mayúsculas ni espacios de más),
  - **clases** (`classList.contains`),
  - **estilo calculado** (`getComputedStyle`), aceptando cualquier forma equivalente de escribir el
    color y con 1 px de margen en las medidas.
- Los errores de JavaScript se capturan con `window.onerror` y se traducen a la línea del archivo
  del jugador con una **sonda de calibración** (los navegadores y otros motores numeran distinto).
- Nada sale del navegador: no hay cuentas, ni red, ni analítica.

**En clase:** las misiones 1–3 son una sesión de JavaScript y eventos; 4–5, una de CSS; 6–9 sirven
para un proyecto con las tres tecnologías. Las pruebas rojas son la mejor excusa para leer un
mensaje de error en voz alta.

---

## 9. Archivos

    estacion-orbita/
    ├── index.html     interfaz del juego
    ├── estilos.css    aspecto del juego (tema estación espacial)
    ├── juego.js       misiones + montaje del documento + comprobadores
    └── README.md      este archivo

Las misiones están en `NIVELES` dentro de `juego.js`, descritas de forma declarativa: su HTML, CSS
y JS iniciales, sus pistas, su solución y —lo importante— sus **pruebas** (acciones + esperas).
Añadir una misión es copiar una parecida y cambiar textos, código y pruebas.
