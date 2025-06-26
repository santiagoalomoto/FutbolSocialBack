# Documentación Técnica - FutbolSocialBack

## Descripción General

FutbolSocialBack es un backend profesional construido con NestJS para la gestión de una plataforma social de fútbol. Implementa seguridad avanzada, cifrado de datos sensibles, autenticación JWT, control de roles, logging profesional y documentación Swagger.

---

## Estructura de Carpetas

```
├── src/
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
│   ├── config/
│   ├── database/
│   ├── entities/
│   ├── logger/
│   ├── middleware/
│   ├── modules/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── matches/
│   │   ├── news/
│   │   ├── players/
│   │   ├── referees/
│   │   ├── standings/
│   │   ├── teams/
│   │   ├── user-preferences/
│   │   └── users/
│   └── shared/
├── test/
├── package.json
├── tsconfig.json
├── README.md
```

---

## Descripción de Módulos y Archivos Clave

### 1. `src/app.module.ts`, `src/main.ts`
- **Propósito:** Bootstrap y configuración global de la aplicación NestJS.
- **Funcionalidad:** Inicializa módulos, configura Swagger, aplica middlewares globales.

### 2. `src/config/`, `src/database/`
- **Propósito:** Configuración de variables de entorno, TypeORM y Mongoose.
- **Funcionalidad:** Conexión a base de datos, configuración segura para producción.

### 3. `src/entities/`
- **Propósito:** Entidades TypeORM para usuarios, equipos, partidos, árbitros, noticias, etc.
- **Funcionalidad:** Definen la estructura de las tablas y relaciones en la base de datos relacional.

### 4. `src/logger/`
- **logger.service.ts:** Servicio de logging profesional usando Winston.
- **logger.module.ts:** Módulo global para inyectar el logger en toda la app.
- **winston.config.ts:** Configuración de Winston (formato, archivos, consola).

### 5. `src/middleware/`
- **Propósito:** Middlewares como morgan para logging de peticiones HTTP.

### 6. `src/modules/`
- **admin/**: Dashboard de administración, totales y últimos registros.
- **auth/**: Registro, login, autenticación JWT, control de roles.
- **matches/**: Gestión de partidos (crear, listar, actualizar, eliminar).
- **news/**: Noticias deportivas.
- **players/**: Gestión de jugadores.
- **referees/**: Gestión de árbitros.
- **standings/**: Tabla de posiciones.
- **teams/**: Gestión de equipos.
- **user-preferences/**: Preferencias de usuario (tema, color, fuente, fondo).
- **users/**: Gestión de usuarios, cifrado de datos sensibles.

Cada módulo contiene:
- **controller.ts:** Define los endpoints y la documentación Swagger.
- **service.ts:** Lógica de negocio, acceso a base de datos, logging.
- **dto/**: Data Transfer Objects para validación y respuesta.

### 7. `src/shared/crypto.service.ts`
- **Propósito:** Cifrado AES y hash SHA256 para datos sensibles.

---

## Librerías y Dependencias Clave

- **@nestjs/common, @nestjs/core:** Framework principal.
- **@nestjs/typeorm, typeorm:** ORM para bases de datos SQL.
- **@nestjs/mongoose, mongoose:** ODM para MongoDB (preferencias de usuario).
- **@nestjs/swagger, swagger-ui-express:** Documentación automática de la API.
- **winston:** Logging profesional.
- **bcrypt:** Hash de contraseñas.
- **crypto-js:** Cifrado AES y hash SHA256.
- **class-validator, class-transformer:** Validación de DTOs.

---

## Seguridad y Buenas Prácticas

- **Cifrado de emails, roles y nombres** en la base de datos.
- **Contraseñas nunca se retornan ni se descifran.**
- **Autenticación JWT** y control de roles en endpoints protegidos.
- **Validación exhaustiva** de datos de entrada y respuesta.
- **Logger profesional** con Winston y logs en archivo y consola.
- **Swagger** para documentación y pruebas interactivas.

---

## Ejemplo de Endpoints y Uso de Swagger

- Accede a la documentación interactiva en `/api` (Swagger UI).
- Todos los endpoints principales están documentados con ejemplos de request y response.

### Ejemplo: Registro de usuario
```http
POST /auth/register
{
  "email": "usuario@email.com",
  "password": "123456"
}
```
Respuesta:
```json
{
  "access_token": "...",
  "user": {
    "id": 1,
    "email": "usuario@email.com",
    "role": "user"
  }
}
```

---

## Tests y Logging

- **Tests unitarios**: Ejemplo en `users.service.spec.ts`, estructura lista para ampliar a otros módulos.
- **Logs**: Todos los servicios y controladores importantes generan logs con timestamp y nivel (info, warn, error).

---

## Recomendaciones de Despliegue

- **No uses sincronización automática de TypeORM en producción.**
- **Configura variables de entorno seguras** (`.env`).
- **Revisa los logs periódicamente** para detectar anomalías.
- **Utiliza HTTPS** y configura CORS según tu frontend.

---

## Contacto y soporte

Para dudas, soporte o mejoras, contacta al equipo de desarrollo.

---

> **Este documento puede ser exportado a PDF desde cualquier editor Markdown.**

---

## Archivos Más Importantes y Su Funcionalidad

### app.module.ts
- **Propósito:** Módulo raíz de la aplicación. Importa y conecta todos los módulos principales.
- **Funcionalidad:** Define la estructura global, importa módulos de dominio, configura middlewares globales.

### main.ts
- **Propósito:** Punto de entrada de la aplicación NestJS.
- **Funcionalidad:** Inicializa la app, configura Swagger, aplica CORS y otros middlewares globales.

### config/env.config.ts
- **Propósito:** Carga y gestiona variables de entorno.
- **Funcionalidad:** Permite separar configuraciones para desarrollo, test y producción.

### database/typeorm.config.ts y mongoose.config.ts
- **Propósito:** Configuración de conexión a bases de datos relacionales (TypeORM) y MongoDB (Mongoose).
- **Funcionalidad:** Define entidades, sincronización, credenciales y opciones de seguridad.

### entities/*.entity.ts
- **Propósito:** Definen la estructura de las tablas y relaciones en la base de datos SQL.
- **Funcionalidad:** Cada archivo representa una entidad (User, Team, Match, etc.) con sus campos y relaciones.

### logger/logger.service.ts
- **Propósito:** Servicio de logging profesional usando Winston.
- **Funcionalidad:** Permite registrar logs de info, error, advertencia y debug en consola y archivos.

### logger/logger.module.ts
- **Propósito:** Hace disponible el logger en toda la aplicación como módulo global.

### logger/winston.config.ts
- **Propósito:** Configura el formato, transporte y nivel de logs de Winston.

### middleware/morgan.middleware.ts
- **Propósito:** Middleware para logging de peticiones HTTP con morgan.
- **Funcionalidad:** Registra cada request entrante, útil para auditoría y debugging.

### shared/crypto.service.ts
- **Propósito:** Provee métodos para cifrar (AES) y hashear (SHA256) datos sensibles.
- **Funcionalidad:** Se usa para emails, roles y otros campos sensibles.

### modules/**/controller.ts
- **Propósito:** Define los endpoints HTTP de cada módulo.
- **Funcionalidad:** Recibe requests, valida datos, documenta con Swagger y delega a los servicios.

### modules/**/service.ts
- **Propósito:** Lógica de negocio y acceso a base de datos.
- **Funcionalidad:** Implementa operaciones CRUD, validaciones adicionales y logging.

### modules/**/dto/*.dto.ts
- **Propósito:** Define los Data Transfer Objects para entrada y salida.
- **Funcionalidad:** Garantiza validación, tipado y documentación de los datos que viajan por la API.

### modules/auth/guards/*.ts y decorators/*.ts
- **Propósito:** Implementan autenticación JWT y control de roles.
- **Funcionalidad:** Protegen endpoints y permiten acceso solo a usuarios autorizados.

### modules/admin/
- **Propósito:** Provee endpoints para dashboard administrativo (totales, últimos registros, etc.).

### test/app.e2e-spec.ts
- **Propósito:** Pruebas end-to-end de la aplicación.
- **Funcionalidad:** Permite validar el funcionamiento global de la API.

---
