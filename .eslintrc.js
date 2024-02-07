module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    // 'plugin:prettier/recommended',
    'plugin:vue/vue3-recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    extraFileExtensions: ['.vue'],
    ecmaVersion: 2020,
  },
  rules: {
    quotes: ['warn', 'single'], // Prefer single quotes with a warning level
    'no-unused-vars': ['warn', { vars: 'all', args: 'after-used' }],
    'no-useless-escape': 'warn'
  },
};
