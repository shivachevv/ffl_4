module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};

// module.exports = {
//   root: true,

//   env: {
//     node: true,
//   },

//   parserOptions: {
//     parser: "babel-eslint",
//   },

//   // parserOptions: {
//   //   parser: '@typescript-eslint/parser',
//   // },

//   rules: {
//     '@typescript-eslint/ban-ts-comment': 0,
//     '@typescript-eslint/ban-ts-ignore': 0,
//     '@typescript-eslint/explicit-module-boundary-types': 0,
//     '@typescript-eslint/no-use-before-define': [1, 'nofunc'],
//     'arrow-body-style': [1, 'as-needed'],
//     camelcase: [
//       2,
//       {
//         properties: 'never',
//       },
//     ],
//     'import/extensions': 0,
//     'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,
//     'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
//     'no-param-reassign': 0,
//     'no-use-before-define': [1, 'nofunc'],
//     'no-var': 2,
//     'vue/require-prop-types': 0,
//   },

//   globals: {
//     before: 'readonly',
//     after: 'readonly',
//     describe: 'readonly',
//     it: 'readonly',
//   },

//   overrides: [
//     {
//       files: [
//         '**/__tests__/*.{j,t}s?(x)',
//         '**/tests/unit/**/*.spec.{j,t}s?(x)',
//       ],
//       env: {
//         jest: true,
//       },
//     },
//   ],

//   settings: {
//     'import/resolver': {
//       node: {
//         extensions: ['.js', '.vue'],
//       },
//     },
//   },

//   plugins: ['@typescript-eslint', 'vue'],

//   extends: [
//     'plugin:vue/recommended',
//     'plugin:prettier-vue/recommended',
//     'prettier',
//   ],
// };
