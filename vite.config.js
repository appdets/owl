import { defineConfig } from 'vite';
const path = require('path');

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: './src/index.js',
            },
            output: {
                entryFileNames: 'owl.js',
                dir: './dist',
            }
        },
        outDir: './dist',
        sourcemap: true,
        minify: 'terser',
        target: 'esnext',
        index: './src/index.html', 
    },
});
