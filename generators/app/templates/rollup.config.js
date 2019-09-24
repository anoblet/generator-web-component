import typescript from "rollup-plugin-typescript2";

export default {
  input: "./src/component.ts",
  output: {
    file: "dist/<%=tag%>.js",
    format: "esm"
  },
  plugins: [typescript()]
};
