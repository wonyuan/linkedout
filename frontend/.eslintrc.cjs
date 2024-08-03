module.exports = {
  extends: ['mantine'],
  parserOptions: {
    project: path.join(__dirname, "tsconfig.eslint.json")

  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
  },
};

