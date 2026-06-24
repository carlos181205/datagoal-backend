# datagoal-backend

Backend de Datagoal Patriotas, migrado desde el monorepo `datagoal-patriotas`.

## Contenido

- `src/` — Backend con Clean Architecture (domain / use-cases / infrastructure por módulo:
  jugadores, partidos, torneos, entrenamientos, finanzas, lesiones, notificaciones, okr,
  convocatorias, estadisticas, usuarios, categorias). Este es el backend que el frontend
  consume hoy vía el alias `@backend/*`.
- `src/interfaces/http/` — Servidor Express que expone el backend como API REST real, con
  Swagger/OpenAPI generado a partir de los comentarios `@swagger` en cada `*.routes.ts`.
  Cada ruta es una capa de interfaz fina que solo instancia repositorio(s) + caso de uso
  existente y serializa la respuesta (con el Mapper del módulo si existe). No contiene
  lógica de negocio.
- `api-rest-standalone/` — API REST genérica (`/api/[resource]`) que existía en la raíz del
  monorepo (`src/app/api`). **No estaba conectada a ningún `next.config.ts` ni `tsconfig.json`
  en ese momento de la migración** — quedó huérfana tras un merge previo. Se conserva como
  referencia histórica; el API REST soportada activamente es la de `src/interfaces/http/`.

## Build

```
npm install
npm run build
```

## Levantar el servidor REST

```
cp .env.example .env   # completar SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY
npm run build
npm start
```

- API: `http://localhost:4000/api/<recurso>`
- Swagger UI: `http://localhost:4000/api-docs`
- Spec JSON: `http://localhost:4000/api-docs.json`
- Healthcheck: `http://localhost:4000/health`

`SUPABASE_SERVICE_ROLE_KEY` es obligatoria porque algunas rutas (usuarios) usan
`auth.admin` para crear/sincronizar cuentas. No expongas este servidor directamente a
internet sin agregar autenticación/autorización a las rutas — hoy no tienen ninguna.

### Endpoints excluidos a propósito

Los siguientes casos de uso dependen de la sesión del navegador (`IAuthSessionRepository`
resuelve el usuario autenticado desde las cookies de Supabase Auth en Next.js) y no se
expusieron como rutas REST porque requerirían diseñar un middleware de autenticación por
JWT que no existe aún: `CambiarPasswordUseCase`, `ObtenerMatrizUsuarioUseCase`,
`GenerarMatrizUsuarioUseCase`, `ValidarRetoMatrizUseCase`, `GetMiPerfilJugadorUseCase`,
`UpdateMiPerfilJugadorUseCase`. Siguen disponibles para el frontend vía import directo,
igual que hoy.
