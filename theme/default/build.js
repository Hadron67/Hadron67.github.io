'use strict';
const pathd = require('path');
const { rollup } = require('rollup');
const terser = require('terser');
const terserPlugin = require('rollup-plugin-terser');
const fs = require('fs');

const _ = p => pathd.join(__dirname, p);

function terserOneFile(input, output){
    input = _(input), output = _(output);
    input = fs.readFileSync(input, 'utf-8');
    input = terser.minify(input);
    fs.writeFileSync(output, input.code);
}

rollup({
    input: 'js/main/main.js',
    output: {
        file: 'dist/main.js',
        name: 'hkm',
        format: 'umd'
    },
    plugins: [
        terserPlugin.terser()
    ]
});
terserOneFile('js/katex-renderer.js', 'dist/katex-renderer.js');