module.exports = {
  root: true,
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        project: "tsconfig.*?.json",
        tsconfigRootDir: __dirname,
        createDefaultProgram: true
      },
      extends: ["plugin:@angular-eslint/recommended"],
      rules: {
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "max-len": ["error", { "code": 100, "tabWidth": 2 }],
        "array-bracket-spacing": ["error", "never"],
        "block-spacing": "error",
      }
    },
    {
      files: ["*.component.html"],
      extends: ["plugin:@angular-eslint/template/recommended"],
      rules: {
        "max-len": ["error", { "code": 140 }]
      }
    },
    {
      files: ["*.component.ts"],
      extends: ["plugin:@angular-eslint/template/process-inline-templates"]
    }
  ]
}

