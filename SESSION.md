# Sesión - 26 de junio de 2026

## Cambios realizados

### 1. Generador CV PDF (`index.html`)
- **Header del documento**: eliminado `<div class="top">` con fecha/hora, `<title>` vacío (`<title></title>`) para que el encabezado del navegador no muestre nada
- **Footer**: añadido `<div class="footer">Curriculum Vitae</div>` al final, visible solo en impresión
- **URL blob eliminada**: reemplazado `URL.createObjectURL(blob)` + `window.open(url)` por `window.open('about:blank')` + `document.write(html)` — evita URL `blob:` en el footer del navegador
- **Screen/print separation**: página en blanco con "Preparando PDF..." en pantalla; CV solo visible en vista previa de impresión
- Eliminadas variables `now`, `dateStr`, `timeStr` no utilizadas

### 2. Eliminación de GitHub Actions polling
- Eliminado archivo: `.github/workflows/bot-poll.yml`
- El bot `@randy_contact_bot` ya no responde automáticamente a mensajes directos
- El formulario de la landing page sigue funcionando via Netlify function (`netlify/functions/contact.js`)

## Estado del proyecto
- Landing page: **https://quiet-marzipan-05d32e.netlify.app**
- Proxy API: **https://quiet-marzipan-05d32e.netlify.app/api/contact**
- Vercel redirect: **https://vibecoding-landing-page.vercel.app** → Netlify
- Bot: `@randy_contact_bot` | Token: *(en variables de entorno)*
- Chat ID: `6446460318`
- Variables de entorno Netlify: `BOT_TOKEN`, `CHAT_ID`

## Archivos relevantes
- `index.html` — Landing page completa (chatbot, CV, skills, certificaciones, proyectos)
- `netlify/functions/contact.js` — Proxy seguro Netlify
- `netlify.toml` — Config Netlify
- `scripts/bot_poll.py` — Script Python (ya no se ejecuta, workflow eliminado)
- `api/contact.js` — Edge Function Vercel (no funcional)
- `api/webhook.js` — Serverless function Vercel (no funcional)
- `vercel.json` — Redirige a Netlify
- `assets/photo.png` — Foto de perfil
- `favicon.svg` — Favicon RBM ciberpunk
