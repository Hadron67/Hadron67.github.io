'use strict';
const pathd = require('path');
const _ = p => pathd.join(__dirname, p);

module.exports = (main, mod) => {
    let {head} = mod.require(_('head.js'));

    let quatreCentQuatre = () => [
        '<!DOCTYPE html>',
        '<html>',
            '<head>',
                head('404 - Page Not Found', true),
            '</head>',
            '<body>',
                '<h1>404</h1>',
            '</body>',
        '</html>'
    ];
}