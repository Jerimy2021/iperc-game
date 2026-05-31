# iperc-game

Proyecto "iperc-game" — juego educativo/visual con enfoque en seguridad (IPERC) y una interfaz estilo "cyberpunk" minimalista.

Este README agrega una guía práctica para modificar la UI y explica el diseño del proyecto para desarrolladores que trabajen en `src/`.

---

## Resumen del diseño

- Estética: Dark, industrial / "neón" (glassmorphism + efectos de glow/pulse).
- Tipografías: `Bebas Neue` para títulos, `Exo 2` para textos y `JetBrains Mono` para cifras/monoespaciado.
- Variables CSS: las variables principales están definidas en `src/css.html` dentro de `:root` para facilitar el cambio rápido de colores y tipografías.
- Componentes visuales principales:
  - `map-dashboard` / `map-dashboard-modern` — barra superior o conjunto de paneles de estado.
  - `duo-path`, `map-container`, `map-row`, `map-node` — mapa/hoja de ruta con nodos en zig-zag.
  - `map-player-badge` — indicador flotante del personaje.

---

## Estructura relevante del proyecto (ruta de archivos)

- `src/css.html` — todas las reglas CSS del proyecto (variables, layout, componentes del mapa y dashboard).
- `src/index.html` — estructura HTML principal; aquí se anclan los paneles y el mapa.
- `src/js.html` — scripts en el HTML (puntos de montaje para la lógica del cliente).
- `src/Controlador.js` — lógica de control que interactúa con la UI (actualizar estados, nodos, etc.).

---

## Variables CSS (edítalas para cambiar tema)

En `src/css.html` encontrarás `:root` con las variables primarias. Ejemplo (tal cual en el proyecto):

```css
:root {
    --bg: #0e0e0e;
    --bg2: #141414;
    --bg3: #1a1a1a;
    --b1: #2a2a2a;
    --b2: #363636;
    --b3: #444444;
    --txt: #d8d8d8;
    --mut: #888880;
    --red: #dd1133;
    --r2: #ff3355;
    --r3: #ff6680;
    --gold: #c89000;
    --g2: #f5b200;
    --g3: #ffe066;
    --cyan: #00c8d4;
    --c2: #00eeff;
    --c3: #80f8ff;
    --grn: #00bb44;
    --gr2: #00ee66;
    --gr3: #80ffaa;
    --ora: #cc5500;
    --or2: #ff8000;
    --pur: #7722cc;
    --p2: #aa55ff;
    --yel: #bbaa00;
    --y2: #ffee00;
    --beb: 'Bebas Neue', cursive;
    --exo: 'Exo 2', sans-serif;
    --jb: 'JetBrains Mono', monospace;
}
```

Para cambiar el tema (por ejemplo pasar a variante fría o cálida) sólo modifica los valores hex y recarga la página.

---

## Guía rápida para modificar la interfaz

A continuación se indican los pasos y snippets para las modificaciones más comunes.

1) Cambiar colores / tipografías

- Edita `:root` en `src/css.html` y actualiza las variables.
- Ejemplo: cambiar el color cian principal

```css
:root { --cyan: #34e6ff; /* nuevo cian */ }
```

2) Añadir o editar un panel de dashboard

- En `src/index.html` agrega dentro del contenedor del dashboard la estructura markup. Usa las clases que están en `src/css.html` (`.map-dashboard-modern`, `.dash-panel`, `.panel-header`, `.panel-metrics`, `.metric`, `.lbl`, `.val`).

Snippet de ejemplo para `src/index.html`:

```html
<!-- Dashboard moderno -->
<div class="map-dashboard-modern">
  <div class="dash-panel">
    <div class="panel-header">Estado del Jugador</div>
    <div class="panel-metrics">
      <div class="metric">
        <div class="lbl">HP</div>
        <div class="val hp-val">85</div>
      </div>
      <div class="metric">
        <div class="lbl">XP</div>
        <div class="val xp-val">420</div>
      </div>
      <div class="metric iperc-panel">
        <div class="lbl">IPERC</div>
        <div class="val lvl-val">N3</div>
      </div>
    </div>
  </div>
  <!-- Repite .dash-panel para otros paneles -->
</div>
```

3) Añadir/editar nodos del mapa (mapa serpenteante)

- El mapa se compone de `map-container` > `map-row` > `map-node-wrapper` > `map-node`.
- Las clases de estado son `.completed`, `.current`, `.locked`.

Snippet de ejemplo:

```html
<div class="map-container">
  <div class="map-row">
    <div class="map-node-wrapper">
      <div class="map-node" data-id="1">1</div>
      <div class="node-info">
        <div class="node-code">N-01</div>
        <div class="node-name">Introducción</div>
      </div>
    </div>
    <!-- otros nodos -->
  </div>
</div>
```

- Para marcar un nodo como actual o completado desde JS, añade/quita clases:

```js
// marcar nodo actual
document.querySelector('.map-node[data-id="2"]').classList.add('current');
// marcar completado
document.querySelector('.map-node[data-id="1"]').classList.add('completed');
```

4) Posicionar / actualizar el `map-player-badge`

- El badge está pensado para colocarse como hijo de `.map-node-wrapper.current` para que quede encima del nodo.
- Ejemplo de HTML (añadir dentro de `map-node-wrapper` cuando el jugador esté en ese nodo):

```html
<div class="map-player-badge" style="--char-color: var(--cyan);">MI_AVATAR</div>
```

- También puedes moverlo por JS:

```js
const badge = document.querySelector('.map-player-badge');
const currentWrapper = document.querySelector('.map-node-wrapper.current');
if (badge && currentWrapper) currentWrapper.appendChild(badge);
```

5) Lógica y puntos de integración (JS)

- `src/Controlador.js` es el lugar donde suele actualizarse el DOM en respuesta a eventos (inicio de nivel, respuesta correcta, avance del jugador).
- Añade funciones explícitas para:
  - actualizar métricas (`.hp-val`, `.xp-val`, `.lvl-val`)
  - cambiar estados de nodos (`current`, `completed`, `locked`)
  - mostrar modal/quiz desde `src/js.html` si el flujo lo requiere

Ejemplo (actualizar una métrica):

```js
function setHP(n) {
  const el = document.querySelector('.hp-val');
  if (el) el.textContent = String(n);
}
```

6) Ver cambios rápidos durante el desarrollo

- Abrir `src/index.html` en el navegador (si usas módulos locales y TS puede necesitar build). Para servir localmente:

```bash
# instalar un servidor estático ligero si no lo tienes
npm install -g http-server
# en la raíz del proyecto
http-server -c-1 .
```

- Alternativa con `npx`:

```bash
npx http-server -c-1 .
```

7) Compilar / comprobar TypeScript

Si el proyecto contiene TS (según README original):

```bash
npm install
npx tsc
```

---

## Convenciones y flujo de trabajo

- Ramas: `feat/...` `fix/...` `chore/...`.
- Mensajes de commit: tipo(scope): breve descripción
  - Ejemplo: `feat(ui): añadir panel dashboard moderno`
- Antes de abrir PR:
  - Ejecutar `npx tsc` (si aplica)
  - Probar la UI en el navegador
  - Revisar cambios con `git diff` y `git add -p`

---

## Qué revisar cuando hagas cambios UI/UX

- Que las variables en `:root` cubran el nuevo color / contraste.
- Que elementos dinámicos (nodos, badge) no usen `position: fixed` que rompa el layout.
- Que cualquier JS que manipule clases use `classList` (no `className` que sobrescriba clases existentes).

---

## ¿Quieres que lo haga por ti?

Puedo:
- aplicar los snippets directamente a `src/index.html` y `src/Controlador.js` (si me das OK)
- crear ejemplos interactivos o pruebas de integración
- añadir un workflow de CI (GitHub Actions) para compilar y validar

Dime qué prefieres y lo hago.
