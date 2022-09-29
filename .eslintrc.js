module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'plugin:vue/vue3-essential'
  ],
  parserOptions: {
    ecmaVersion: 2021
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-return-assign': 'off',
    'no-tabs': 'off',
    'import/no-named-as-default': 'off',
    'no-unused-expressions': 'off',
    'vue/no-v-html': 'off',
    'vue/no-v-model-argument': 'off',
    'vue/no-template-shadow': 'off',
    'vue/multi-word-component-names': 'off',
    quotes: ['off', 'single', 'avoid-escape'],
    'no-irregular-whitespace': 'off',
    'object-curly-spacing': 'warn',
    'no-unused-vars': 'off',
    'semi-colon': 'off',
    '@typescript-eslint/no-unused-vars': 'warn'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
