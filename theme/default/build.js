'use strict';
const pathd = require('path');
const { rollup } = require('rollup');
const terser = require('terser');
const terserPlugin = require('rollup-plugin-terser');
const fs = require('fs');

const _ = p => pathd.join(__dirname, p);

function readFile(p){
    return new Promise((resolve, reject) => {
        fs.readFile(p, (err, data) => err ? reject(err) : resolve(data.toString('utf-8')));
    });
}

function writeFile(p, data){
    return new Promise((resolve, reject) => {
        fs.writeFile(p, data, err => err ? reject(err) : resolve());
    });
}

function exists(f){
    return new Promise((resolve, reject) => {
        fs.exists(f, e => resolve(e));
    });
}

function mkdir(d){
    return new Promise((resolve, reject) => {
        fs.mkdir(d, err => err ? reject(err) : resolve());
    });
}

async function terserOneFile(input, output){
    input = _(input), output = _(output);
    input = await readFile(input);
    input = terser.minify(input);
    await writeFile(output, input.code);
}

(async () => {
    !await exists(_('dist')) && await mkdir(_('dist'));
    
    const bundle = await rollup({
        input: _('js/main/main.js'),
        plugins: [
            terserPlugin.terser()
        ]
    });
    await bundle.write({
        file: _('dist/main.js'),
        name: 'hkm',
        format: 'umd'
    });

    await terserOneFile('js/katex-renderer.js', 'dist/katex-renderer.js');
})();