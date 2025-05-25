import simpleImportSort from "eslint-plugin-simple-import-sort";

const eslintConfig = [
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^\\u0000"],
            ["^react$", "^next"],
            ["^@"],
            ["^[a-z]"],
            ["^~"],
            ["^\\./", "^\\.\\./"],
          ],
        },
      ],
    },
    ignores: [".github", ".husky", "node_modules", ".next"],
  },
];

export default eslintConfig;
