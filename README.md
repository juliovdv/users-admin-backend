# users-admin-backend

Micro backend para la gestión de usuarios administradores de Supabase.  
Implementado con **Express**, **Supabase** y desplegado en **Vercel**, incluye medidas de seguridad como CORS, Helmet, rate limiting y manejo global de errores.

---

## 🧰 Tecnologías

- Node.js / Express
- Supabase (auth & perfiles)
- Vercel (serverless)
- Middlewares de seguridad:
  - `helmet` (cabeceras HTTP seguras)
  - `cors` (control de orígenes)
  - `express-rate-limit` (protección contra abuso)
  - Middleware global de manejo de errores

---

## ⚡ Requisitos

- Node.js ≥ 18
- npm
- Cuenta en Supabase con proyecto y claves:

```

SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_ANON_KEY=
PORT=4000

````

> ⚠️ No subir el archivo `.env` al repositorio.

---

## 🏗️ Instalación local

1. Clonar el repositorio:
```bash
git clone <repo-url>
cd users-admin-backend
````

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` con tus variables de Supabase y puerto:

```
SUPABASE_URL=<tu-url>
SUPABASE_SERVICE_ROLE_KEY=<tu-service-role>
SUPABASE_ANON_KEY=<tu-anon-key>
PORT=4000
```

4. Ejecutar en modo desarrollo:

```bash
npm run dev
```

> Esto ejecuta `src/dev.js`, que inicia el servidor localmente en `http://localhost:4000`.

---

## 🚀 Despliegue en Vercel

1. Configurar variables de entorno en Vercel (Settings → Environment Variables):

```
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_ANON_KEY
```

2. Subir cambios a la rama principal (`main`) o usar `vercel --prod`.

3. Vercel se encargará de iniciar automáticamente la función serverless (sin necesidad de `app.listen()`).

---

## 🗂️ Estructura de carpetas

```
src/
├── dev.js                 # Script para correr localmente
├── index.js               # Entrada principal (exporta app)
├── lib/
│   └── supabase.js        # Clientes Supabase (public y admin)
├── middleware/
│   ├── corsConfig.js      # Configuración CORS
│   ├── errorHandler.js    # Middleware global de errores
│   ├── rateLimit.js       # Middleware de rate limiting
│   ├── requireAdmin.js    # Middleware de permisos admin
│   └── requireAuth.js     # Middleware de autenticación
└── routes/
    └── users.js           # Endpoints de gestión de usuarios
```

---

## 🔒 Seguridad y buenas prácticas

* **CORS** controlado por `corsConfig.js`
* **Cabeceras seguras** con `helmet`
* **Protección contra abuso** con `rateLimit.js`
* **Manejo de errores centralizado** (`errorHandler.js`)
* **Middlewares auth/admin** verifican token y rol
* **No exponer `SERVICE_ROLE_KEY`** al frontend

---
