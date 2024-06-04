import terser from "@rollup/plugin-terser";
import pa from "./package.json" assert { type: 'json' }; 
const banner = `/*!
* p-seamless-scroll v${pa.version}
* Copyright 2024 Pbstar (https://github.com/pbstar)
* Licensed under MIT (https://github.com/pbstar/p-seamless-scroll/blob/main/LICENSE)
*/
`
export default {
  input: "src/index.js",
  output: [
    {
      file: "lib/p-seamless-scroll.es.js",
      format: "es",
      banner
    },
    {
      file: "lib/p-seamless-scroll.umd.js",
      format: "umd",
      name: 'pSeamlessScroll',
      banner
    }
  ],
  plugins: [
    terser()
  ]
};