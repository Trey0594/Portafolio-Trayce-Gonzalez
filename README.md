# Portafolio Profesional — Trayce González Brenes

Portafolio web responsivo, bilingüe (ES/EN) y desarrollado desde cero con **HTML5, CSS3, Bootstrap 5 y JavaScript**, para el proyecto de la Universidad Cenfotec.

> **Slogan:** *"Automatizando procesos, creando soluciones."*

---

## 📁 Estructura del repositorio

```
├── proyecto/                  ← Todo el código del portafolio (esta es la carpeta que se publica)
│   ├── index.html
│   └── assets/
│       ├── css/style.css
│       ├── js/  (i18n.js, projects-data.js, main.js)
│       ├── img/ (logo, favicon, foto)
│       ├── docs/ (CV en PDF)
│       └── vendor/ (Bootstrap, Bootstrap Icons, AOS, EmailJS y fuentes autoalojadas)
├── .github/workflows/deploy-pages.yml   ← Publica automáticamente "proyecto/" en GitHub Pages
├── portafolio-url.txt         ← Plantilla para subir a Moodle (URL del sitio + repo)
└── README.md
```

Todas las librerías (Bootstrap, Bootstrap Icons, AOS, EmailJS, Google Fonts) están **autoalojadas** dentro de `assets/vendor/` — el sitio no depende de ningún CDN externo, por lo que carga más rápido y funciona igual en cualquier conexión.

---

## 🚀 Cómo publicarlo en GitHub Pages (paso a paso)

1. **Crea un repositorio nuevo** en GitHub (por ejemplo `portafolio-trayce-gonzalez`), público.
2. **Sube todo el contenido de esta carpeta** (`portafolio-trayce/`) a la rama `main` del repositorio, manteniendo la estructura tal cual (incluyendo la carpeta oculta `.github/`).
   ```bash
   git init
   git add .
   git commit -m "Primer commit: portafolio profesional"
   git branch -M main
   git remote add origin https://github.com/Trey0594/TU-REPOSITORIO.git
   git push -u origin main
   ```
3. En GitHub, ve a **Settings → Pages**.
4. En **"Build and deployment" → Source**, selecciona **"GitHub Actions"** (no "Deploy from a branch").
5. Al hacer push a `main`, el workflow `deploy-pages.yml` se ejecuta automáticamente y publica el contenido de `proyecto/`. Revisa el progreso en la pestaña **Actions**.
6. En unos minutos tu sitio estará disponible en:
   `https://trey0594.github.io/TU-REPOSITORIO/`
7. Copia esa URL y complétala en `portafolio-url.txt` para subirla a Moodle.

> 💡 Si prefieres el método clásico ("Deploy from a branch"), tendrías que mover el contenido de `proyecto/` a la raíz del repositorio, pero entonces ya no cumplirías el requisito de tener los archivos dentro de una carpeta llamada `proyecto`. El workflow de GitHub Actions incluido resuelve ambos requisitos a la vez.

---

## ✉️ Activar el formulario de contacto (EmailJS)

El formulario de contacto ya está programado en JavaScript con validación completa. Para que los mensajes lleguen realmente a tu correo (en vez de abrir el cliente de correo del visitante como respaldo), conecta una cuenta gratuita de [EmailJS](https://www.emailjs.com):

1. Crea una cuenta gratuita en emailjs.com.
2. Crea un **Email Service** (puedes conectar tu Gmail).
3. Crea un **Email Template** con las variables `{{name}}`, `{{email}}`, `{{subject}}` y `{{message}}`.
4. Copia tu **Public Key**, **Service ID** y **Template ID**.
5. Abre `proyecto/assets/js/main.js` y reemplaza estas líneas cerca del inicio del bloque de contacto:
   ```js
   const EMAILJS_PUBLIC_KEY  = "TU_PUBLIC_KEY";
   const EMAILJS_SERVICE_ID  = "TU_SERVICE_ID";
   const EMAILJS_TEMPLATE_ID = "TU_TEMPLATE_ID";
   ```
6. Guarda, sube el cambio (`git add . && git commit -m "Configurar EmailJS" && git push`) y listo.

Mientras no configures EmailJS, el formulario sigue funcionando: valida los campos y abre el correo del visitante con el mensaje precargado a `trey0594@gmail.com`.

---

## 🖊️ Personalización rápida

| Qué cambiar | Dónde |
|---|---|
| Textos en español/inglés | `assets/js/i18n.js` |
| Descripciones de proyectos (modal) | `assets/js/projects-data.js` |
| Colores de marca | Variables `:root` al inicio de `assets/css/style.css` |
| CV descargable | Reemplaza `assets/docs/CV_Trayce_Gonzalez.pdf` (mismo nombre) |
| Foto de perfil | Reemplaza `assets/img/trayce-foto.jpg` (mismo nombre, idealmente cuadrada) |
| WhatsApp / correo / redes | Buscar `50687519620` y `trey0594@gmail.com` en `index.html` |

---

## ✅ Checklist de requisitos del proyecto

- [x] Apariencia innovadora, desarrollada desde cero (sin plantillas)
- [x] Favicon con la identidad de marca (TG)
- [x] Portafolio 100% laboral
- [x] HTML5, CSS3, Bootstrap 5 y JavaScript
- [x] 5 secciones de contenido (Inicio, Sobre mí, Experiencia, Proyectos, Contacto) sin contar encabezado/pie
- [x] Publicación remota vía GitHub Pages
- [x] Identidad visual (logo, colores, tipografías) incorporada
- [x] Galería interactiva con filtros, título, descripción y tecnologías por proyecto
- [x] Transiciones y animaciones sutiles (AOS + CSS)
- [x] Formulario de contacto en JavaScript con librería (EmailJS)
- [x] Botón de chat de WhatsApp flotante
- [x] Botón "Scroll to top"
- [x] Descarga de CV en PDF (formato ATS) mediante botón
- [x] Switch de idioma Español / Inglés sin recargar la página
- [x] Archivos dentro de una carpeta del repositorio llamada `proyecto`
- [ ] Subir a Moodle el archivo `portafolio-url.txt` con la URL y el repo (pendiente hasta publicar)

---

Hecho con 💛 y 🩷 por Trayce González Brenes — Universidad Cenfotec.
