# datagoal-backend

Backend de Datagoal Patriotas, migrado desde el monorepo `datagoal-patriotas`.

## Contenido

- `src/` — Backend con Clean Architecture (domain / use-cases / infrastructure por módulo:
  jugadores, partidos, torneos, entrenamientos, finanzas, lesiones, notificaciones, okr,
  convocatorias, estadisticas, usuarios, categorias). Este es el backend que el frontend
  consume hoy vía el alias `@backend/*`.
- `api-rest-standalone/` — API REST genérica (`/api/[resource]`) que existía en la raíz del
  monorepo (`src/app/api`). **No estaba conectada a ningún `next.config.ts` ni `tsconfig.json`
  en ese momento de la migración** — quedó huérfana tras un merge previo. Se incluye aquí como
  referencia/punto de partida si se decide exponer el backend como API REST, pero requiere
  integrarse a un proyecto Next.js (o equivalente) para funcionar.

## Build

```
npm install
npm run build
```
