# What is it?

This is a Typescript library meant to be used as a shared package between all the frontend apps in this monorepo.

It is set up to use the `@app/types` (`/packages/types`) package from this monorepo.

# How to use it?

You don't. It's meant to be used by the other packages in this monorepo.

# How to develop it?

You can add new files in the `src` folder and they will be automatically available in the other packages.

Don't forget to export the new files to the `src/index.ts` file.

Be careful: React **components** can't be shared between the web and mobile apps. You need to create a new component for each platform. So no need to put them in this package.
