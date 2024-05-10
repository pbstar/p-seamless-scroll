import terser from "@rollup/plugin-terser";
export default {
  input: "src/index.js",
  output: [
    {
      file: "lib/p-seamless-scroll.es.js",
      format: "es"
    },
    {
      file: "lib/p-seamless-scroll.umd.js",
      format: "umd",
      name: 'pSeamlessScroll'
    }
  ],
  plugins: [
    terser()
  ]
};