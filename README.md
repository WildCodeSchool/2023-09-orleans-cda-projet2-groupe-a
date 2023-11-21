# Welcome to this monorepo template!

## Here's how to get started:

1. Clone this repo
2. Take a look inside the `package.json` file. You will see some dependencies and a `workspaces` prop. This is where all the apps are listed. You may add as many new packages as you want
3. Install [`Bun`](https://bun.sh/)
4. Run `bun i`. Bun will take care of installing every workspaces' dependencies
5. Configure all your env variables (see **Env variables** below)
6. Start up the `docker compose` -> `bun run compose:up` (`bun run compose:down` to shut it down)
7. You may run `bun run` to see all the available scripts

---

## Develop on the web

Simply run `bun run dev`. It will start both the ExpressJS backend and all the frontend apps except the mobile one

---

## Develop on mobile

First, start the app with `bun run dev` then run `bun run dev:frontend:mobile`

---

## Env variables

### MySQL env

In `deployment` folder, there's a `.env.sample`. Copy and paste it as `.env`.

Edit the variables as you see fit.

### Main env

There's a `.env.sample` file at the root of this repo. Copy and paste it as `.env`.

Edit the variables as you see fit. Make sure the `DB_*` variables match the ones you defined in the MySQL env file.

Running `bun run dev` will automagically make available your environment variables in every app, so you only need a single `.env` file.

To make an environment variable available in the **web** frontend app, you need to prefix it with `VITE_`

To make an environment variable available in the **mobile** frontend app, you need to prefix it with `EXPO_`

_All the environment variables will be available in any non-Vite non-Expo app._

---

## Add a new dependency

As usual, but you need to be in the correct directory first

Eg. `cd ./packages/frontend/web && bun add react-router-dom`

Don't forget that you still need to run `bun run dev` from the **root** `package.json`!

---

## Before commiting

Be sure to run `bun run lint && bun run format`

## Migrations

There is a package called `@app/migrations` that is meant to be used as a CLI tool to run and generate migrations.

### Run migrations

`bun run migrations:latest` will run **all the migrations** that haven't been run yet

`bun run migrations:up` will run **the next migration** that hasn't been run yet

`bun run migrations:down` will revert **the last migration** that has been run

### Generate migrations

`bun run migrations:generate <migration-name>` will generate a migration file in `packages/backend/migrations/src/migrations` using the query builder

You can add `--with-sql` to generate a migration file using raw SQL instead of the query builder

## Tools

- [Bun](https://bun.sh/) - A CLI tool to manage this monorepo, run scripts, ...
- [Docker](https://www.docker.com/) - Manages the containers
- [Docker Compose](https://docs.docker.com/compose/) - Manages the containers
- [ExpressJS](https://expressjs.com/) - Backend framework
- [MySQL](https://www.mysql.com/) - Database
- [React](https://reactjs.org/) - Frontend framework
- [React Native](https://reactnative.dev/) - Frontend mobile framework
- [Kysely](https://kysely.dev/docs/getting-started?package-manager=bun&dialect=mysql) - Query builder
- [TypeScript](https://www.typescriptlang.org/) - Language
- [Vite](https://vitejs.dev/) - Frontend bundler
- [Expo](https://expo.io/) - Frontend mobile bundler
- [ESLint](https://eslint.org/) - Linter
- [Prettier](https://prettier.io/) - Code formatter
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Testing library
