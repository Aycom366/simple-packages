import typescript from "rollup-plugin-typescript2";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.ts", // Your entry TypeScript file
  output: {
    file: "dist/Ay_library.js", // Output bundle file
    format: "umd", // Universal Module Definition (UMD)
    name: "Ay_library", // Global name for UMD module
    sourcemap: true, // Generate sourcemaps
  },
  plugins: [
    typescript(), // TypeScript plugin
    terser({
      output: {
        comments: false,
      },
    }), // A Rollup plugin to generate a minified bundle with terser.
  ],
};
