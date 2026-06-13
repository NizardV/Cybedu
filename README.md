# Cybedu

> Application mobile Android éducative sur la cybersécurité / Android educational mobile app focused on cybersecurity

[![Kotlin](https://img.shields.io/badge/Kotlin-2.0+-7F52FF?style=flat&logo=kotlin&logoColor=white)](https://kotlinlang.org)
[![Jetpack Compose](https://img.shields.io/badge/Jetpack%20Compose-1.x-4285F4?style=flat&logo=jetpackcompose&logoColor=white)](https://developer.android.com/compose)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com)
[![OpenAPI](https://img.shields.io/badge/OpenAPI-3.0-85EA2D?style=flat&logo=swagger)](https://swagger.io)

## 🇫🇷 Français | 🇬🇧 English

[Voir en français](#-présentation) | [View in English](#-overview)

---

## 🇫🇷 Présentation

Cybedu est une application mobile Android éducative dédiée à la sensibilisation à la cybersécurité. Elle propose des quiz interactifs, des articles thématiques et un leaderboard, le tout sécurisé par authentification JWT. Développée dans le cadre du projet P2 DIIAGE.

## Stack technique

| Composant | Technologies |
|-----------|-------------|
| Mobile | Kotlin, Jetpack Compose, MVVM, Ktor HTTP client |
| API | Node.js, TypeScript, Express, JWT |
| Base de données | PostgreSQL |
| Infrastructure | Docker, Docker Compose |
| Documentation | OpenAPI / Swagger |

## Architecture

```
Cybedu/
├── mobile/       # Application Android (Kotlin / Jetpack Compose)
│   └── Architecture MVVM, appels HTTP via Ktor
├── api/          # Backend Node.js / TypeScript
│   └── Authentification JWT, routes REST, accès PostgreSQL
└── api-mock/     # API mockée pour le développement
    └── Données de test, spec OpenAPI documentée
```

> Voir aussi : [mobile/](./mobile/) · [api/](./api/) · [api-mock/](./api-mock/)

## Fonctionnalités principales

- Quiz interactifs sur la cybersécurité
- Articles et contenus éducatifs
- Authentification JWT (inscription / connexion)
- Leaderboard des meilleurs scores
- API mockée documentée via OpenAPI/Swagger

## Lancer en local

### Prérequis

- Docker & Docker Compose
- Android Studio (pour le client mobile)
- Node.js 20+ (sans Docker)

### Avec Docker Compose

```bash
git clone https://github.com/NizardV/Cybedu
cd Cybedu
docker compose up -d
```

### API seule (sans Docker)

```bash
cd api
npm install
npm run dev
```

### Application mobile

Ouvrir le dossier `mobile/` dans Android Studio et lancer l'émulateur ou un appareil physique.

## Équipe

Projet P2 DIIAGE — 2 contributeurs

| Rôle | Nom |
|------|-----|
| Développeur | [À COMPLÉTER] |
| Développeur | [À COMPLÉTER] |

---

## 🇬🇧 Overview

Cybedu is an educational Android mobile application focused on cybersecurity awareness. It features interactive quizzes, thematic articles, and a leaderboard, all secured with JWT authentication. Developed as part of the DIIAGE P2 project.

## Tech stack

| Component | Technologies |
|-----------|-------------|
| Mobile | Kotlin, Jetpack Compose, MVVM, Ktor HTTP client |
| API | Node.js, TypeScript, Express, JWT |
| Database | PostgreSQL |
| Infrastructure | Docker, Docker Compose |
| Documentation | OpenAPI / Swagger |

## Architecture

```
Cybedu/
├── mobile/       # Android application (Kotlin / Jetpack Compose)
│   └── MVVM architecture, HTTP calls via Ktor
├── api/          # Node.js / TypeScript backend
│   └── JWT auth, REST routes, PostgreSQL access
└── api-mock/     # Mocked API for development
    └── Test data, documented OpenAPI spec
```

> See also: [mobile/](./mobile/) · [api/](./api/) · [api-mock/](./api-mock/)

## Key features

- Interactive cybersecurity quizzes
- Educational articles and content
- JWT authentication (sign up / sign in)
- Score leaderboard
- Mock API documented via OpenAPI/Swagger

## Run locally

### Prerequisites

- Docker & Docker Compose
- Android Studio (for the mobile client)
- Node.js 20+ (without Docker)

### With Docker Compose

```bash
git clone https://github.com/NizardV/Cybedu
cd Cybedu
docker compose up -d
```

### API only (without Docker)

```bash
cd api
npm install
npm run dev
```

### Mobile app

Open the `mobile/` folder in Android Studio and launch the emulator or a physical device.

## Team

P2 DIIAGE project — 2 contributors

| Role | Name |
|------|------|
| Developer | [TO COMPLETE] |
| Developer | [TO COMPLETE] |
