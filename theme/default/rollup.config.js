import { terser } from 'rollup-plugin-terser';

export default {
    input: 'js/main.js',
    output: {
        file: 'dist/main.js',
        name: 'hkm',
        format: 'umd'
    },
    plugins: [
        terser()
    ]
}