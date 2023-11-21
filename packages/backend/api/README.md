# What is it?

This is an ExpressJS backend application.

It is set up to use the `@app/backend-shared` (`/packages/backend/shared`) and `@app/types` (`/packages/types`) packages from this monorepo.

A simple router is also set up to serve two endpoints at `/api`.

# How to use it?

## Development

Run `bun run dev` from the root of this repo.

## Production

Run `bun run build` from the root of this repo.

Then run `bun ./packages/backend/api/dist/index.js` from the root of this repo.
