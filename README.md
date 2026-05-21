# iperc-game

Proyecto "iperc-game" — pequeño proyecto TypeScript con estructura simple y diseño profesional. Este README ofrece instrucciones rápidas para desarrolladores y visitantes, y describe la organización y flujo de trabajo sugerido.

## Diseño (simple y profesional)
- Minimalismo: código organizado en `src/`, configuración en `package.json` y `tsconfig.json`.
- Tipado fuerte: TypeScript para mayor seguridad y mantenimiento.
- Separación de responsabilidades: módulos con responsabilidades claras dentro de `src/`.
- Dependencias de desarrollo limitadas (TypeScript y tipos) para mantener el repositorio ligero.

## Estructura de carpetas
- `src/` — Código fuente TypeScript.
- `node_modules/` — Dependencias (no se versiona).
- `package.json` — Scripts y dependencias.
- `tsconfig.json` — Configuración del compilador TypeScript.
- `.clasp.json` — (opcional) configuración de CLASP para Google Apps Script, si aplica.

## Tecnologías
- Node.js
- TypeScript
- (Opcional) CLASP / Google Apps Script (si `.clasp.json` está presente)

## Instalación
1. Instala Node.js (v16+ recomendada) y npm.
2. En la raíz del proyecto ejecuta:

```bash
npm install
```

## Compilación / Desarrollo
- Compilar TypeScript:

```bash
npx tsc
```

- Nota: no hay scripts adicionales configurados en `package.json`; puedes añadir scripts de `build`, `start` o `test` según las necesidades.

## Contribuir
1. Crea una rama descriptiva: `git checkout -b feat/nueva-funcionalidad`.
2. Haz commits atómicos y claros.
3. Abre un Pull Request hacia `main` y describe los cambios.

## Subir el repositorio a GitHub (pasos sugeridos)
Si quieres que lo suba yo mismo, necesito acceso a tu cuenta GitHub (no puedo autenticarme desde aquí). Puedes crear el repositorio en GitHub y luego ejecutar estos comandos localmente:

```bash
# (solo una vez)
git init
# añade todos los archivos (respetando .gitignore)
git add .
git commit -m "Initial commit: add project files and README"
# crea la rama principal y añade el remoto (sustituye USERNAME/REPO por tu cuenta)
git branch -M main
git remote add origin git@github.com:USERNAME/REPO.git
# empuja al remoto
git push -u origin main
```

O bien, con la CLI de GitHub (`gh`) autenticada:

```bash
gh repo create USERNAME/REPO --public --source=. --remote=origin --push
```

## Licencia
Este proyecto declara `ISC` en `package.json`. Cambia la licencia si lo deseas.

---

Si quieres, puedo:
- Añadir scripts útiles en `package.json` (build, start, lint, test).
- Crear y configurar un workflow de GitHub Actions.
- Intentar crear el repositorio y hacer el push por ti si me indicas tu usuario GitHub y confirmas que autorizas la acción (aviso: necesito que tu entorno esté autenticado para que el push funcione, o que proporciones un token/credencial por un método seguro).
