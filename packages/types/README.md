# What is it?

This is a Typescript library meant to be used as a shared package between all apps in this monorepo.

This package only contains **types**. No logic. So it can be used everywhere without any problem.

# How to use it?

You don't. It's meant to be used by the other packages in this monorepo.

# How to develop it?

You can add new files in the `src` folder and they will be automatically available in the other packages.

Don't forget to export the new files to the `src/index.ts` file.
