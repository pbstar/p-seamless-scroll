import terser from "@rollup/plugin-terser";
import serve from 'rollup-plugin-serve'
import typescript from '@rollup/plugin-typescript';
import pa from "./package.json" assert { type: 'json' };
const dateTime = () => {
  const now = new Date();
  const year = now.getFullYear(); // 年  
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月，注意getMonth()是从0开始的  
  const day = String(now.getDate()).padStart(2, '0'); // 日  
  const hours = String(now.getHours()).padStart(2, '0'); // 时  
  const minutes = String(now.getMinutes()).padStart(2, '0'); // 分  
  const seconds = String(now.getSeconds()).padStart(2, '0'); // 秒  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
const banner = `/*!
* p-seamless-scroll v${pa.version}
* Copyright 2024 Pbstar (https://github.com/pbstar)
* Licensed under MIT (https://github.com/pbstar/p-seamless-scroll/blob/main/LICENSE)
* ${dateTime()}
*/
`
const isDev = process.env.NODE_ENV === 'dev'

export default {
  input: "src/index.ts",
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
    typescript({ tsconfig: './tsconfig.json' }),
    terser(),
    isDev && serve({
      open: true,
      openPage: "/test/index.html"
    })
  ]
};