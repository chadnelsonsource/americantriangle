import nextCore from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCore,
  ...nextTs,
  {
    ignores: [".next/**", "out/**", "coverage/**", "playwright-report/**", "test-results/**"],
  },
];

export default eslintConfig;
