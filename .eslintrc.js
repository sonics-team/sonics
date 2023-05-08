module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-sonics`
  extends: ["sonics"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
