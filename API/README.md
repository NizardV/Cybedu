# Cybedu — API

> Backend Node.js/TypeScript de l'application Cybedu / Node.js/TypeScript backend for the Cybedu app

[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org)

> Retour au projet principal / Back to main project: [Cybedu](../README.md)

---

## Installation / Install

```bash
npm install
```

## Lancer / Run

```bash
# Développement / Development
npm run dev

# Production
npm run build && npm start
```

## Variables d'environnement / Environment variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/cybedu
JWT_SECRET=[À COMPLÉTER / TO COMPLETE]
PORT=3000
```

## Routes principales / Main routes

| Méthode | Route | Description FR | Description EN |
|---------|-------|----------------|----------------|
| `POST` | `/auth/register` | Inscription | Register |
| `POST` | `/auth/login` | Connexion | Login |
| `GET` | `/quiz` | Liste des quiz | Quiz list |
| `GET` | `/articles` | Liste des articles | Article list |
| `GET` | `/leaderboard` | Classement | Leaderboard |

La documentation complète des routes est disponible dans `api-mock/` via la spec OpenAPI.
Full route documentation is available in `api-mock/` via the OpenAPI spec.
