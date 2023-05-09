module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `@sonics-team/eslint`
  extends: ["sonics"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
