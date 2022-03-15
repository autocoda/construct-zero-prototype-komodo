module.exports = {
  'root': true,
  'env': {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  'parserOptions': {
    ecmaVersion: 2020
  },
  'rules': {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-new-func': 'error',
    'prefer-arrow-callback': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-spacing': 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'eqeqeq': 'error',
    'no-with': 'error',
    'no-warning-comments': 'error',
    'max-len': ['error', { 'code': 190 }],
    'no-unused-expressions': ['error', { 'allowTernary': true }],
    'no-param-reassign': 'error',
    'quote-props': ['error', 'consistent'],
    'import/extensions': 'off',
    'vue/attribute-hyphenation': 'error',
    'vue/require-prop-types': 'error',
    'vue/order-in-components': ['error', {
      'order': [
        'el',
        'name',
        'key',
        'parent',
        'functional',
        ['delimiters', 'comments'],
        ['components', 'directives', 'filters'],
        'extends',
        'mixins',
        ['provide', 'inject'],
        'layout',
        'middleware',
        'validate',
        'scrollToTop',
        'transition',
        'loading',
        'inheritAttrs',
        'model',
        ['props', 'propsData'],
        'setup',
        'asyncData',
        'data',
        'fetch',
        'head',
        'computed',
        'methods',
        'watch',
        'watchQuery',
        'emits',
        'LIFECYCLE_HOOKS',
        'ROUTER_GUARDS',
        ['template', 'render'],
        'renderError',
      ],
    }],
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'always',
    }],
    'vue/html-closing-bracket-spacing': ['error', {
      'startTag': 'never',
      'endTag': 'never',
      'selfClosingTag': 'always',
    }],
    'vue/script-indent': ['error', 2, {
      'baseIndent': 0,
      'switchCase': 1,
      'ignores': [],
    }],
    'vue/html-indent': ['error', 2, {
      'attribute': 1,
      'baseIndent': 1,
      'closeBracket': 0,
      'alignAttributesVertically': true,
      'ignores': [],
    }],
    // Miscellaneous
    'vue/no-template-shadow': 'error',
    'vue/no-v-html': 'error',
  },
  'overrides': [
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
