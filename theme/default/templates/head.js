'use strict';
const pathd = require('path');

module.exports = (main, mod) => {
    let { escapeHTML, escapeS } = main.helper;
    let config = main.config;
    let libs = config.libs;
    let ext = main.ext;

    let fontawesome = () => `<link rel="stylesheet" href="${escapeS(libs.fontawesome.url)}" integrity="${libs.fontawesome.integrity}" crossorigin="anonymous">`;
    let katexCSS = () => `<link rel="stylesheet" href="${escapeS(libs.katex.css.url)}" integrity="${libs.katex.css.integrity}" crossorigin="anonymous">`;
    let katexJs = () => `<script defer src="${escapeS(libs.katex.js.url)}" integrity="${libs.katex.js.integrity}" crossorigin="anonymous"></script>`;

    let metaTags = () => [
        '<meta http-equiv="X-UA-Compatible" content="IE=edge" />',
        '<meta name="viewport" content="width=device-width, initial-scale=1" />',
        main.helper.seo()
    ];

    let head = (title, fullTitle = false) => [
        '<meta charset="utf-8" />',
        '<title>',
            title ? escapeHTML(`${title} | `) : '',
            !fullTitle ? escapeHTML(config.title) : '',
        '</title>',
        `<link href="${main.path('/css/main.css')}" type="text/css" rel="stylesheet">`,
        // XXX: Using an empty script tag to fix the Chrome bug that all property transition from 
        // user agent to the supplied value on page load. See https://github.com/LeaVerou/prefixfree/issues/99
        '<script> (function(){})(); </script>',
        metaTags(),
        fontawesome(),
        katexCSS(),
        libs.katex.prerendering ? '' : katexJs()
    ];

    let header = (banner, active = '') => [
        '<header class="main-header clearfix">',
            banner ? [
                '<div class="banner">',
                    banner,
                '</div>',
            ] : '',
            '<nav class="site-nav clearfix" id="main-nav">',
                '<a href="javascript:;" id="btn-collapse" class="nav-btn">',
                    '<i class="fas fa-bars"></i>',
                '</a>',
                '<ul class="nav-list right">',
                    [
                        {icon: '<i class="fas fa-search"></i>', path: 'javascript:;', id: 'btn-search'},
                        config.githubRepo ? {icon: '<i class="fab fa-github"></i>', path: escapeS(config.githubRepo), id: null} : null,
                        {icon: '<i class="fas fa-rss"></i>', path: ext.rssPath || '/rss.xml', id: null},
                    ].filter(p => p).map(({icon, path, id}) => [
                        '<li>',
                            `<a href="${escapeS(path)}" class="nav-btn"${id ? ` id="${id}"` : ''}>`,
                                '<span class="nav-icon-btn">',
                                    icon,
                                '</span>',
                            '</a>',
                        '</li>'
                    ]),
                '</ul>',
                '<ul class="nav-list collapse" id="main-nav-list">',
                    '<li class="collapse">',
                        '<a class="nav-btn" id="btn-close-menu" href="javascript:;"><i class="fas fa-arrow-left"></i></a>',
                    '</li>',
                    [
                        {name: 'Home', icon: '<i class="fas fa-home"></i>', path: pathd.join(ext.blog, '/') },
                        {name: 'Archive', icon: '<i class="fas fa-archive"></i>', path: pathd.join(ext.archive, '/')},
                        {name: 'Categories', icon: '<i class="fas fa-folder-open"></i>', path: pathd.join(ext.category, '/')},
                        {name: 'Tags', icon: '<i class="fas fa-tags"></i>', path: pathd.join(ext.tags, '/')},
                        // {name: 'Programmes', icon: '<i class="fas fa-desktop"></i>', path: '/programmes/'},
                        // {name: 'About', icon: '<i class="fas fa-address-card"></i>', path: '/about/'}
                    ].map(({name, icon, path}) => [
                        `<li${active === name ? ' class="active"' : ''}>`,
                            `<a href="${escapeS(path)}" class="nav-btn collapse">`,
                                '<span class="nav-icon">',
                                    icon,
                                '</span>',
                                `<span class="nav-item-name">${escapeHTML(name)}</span>`,
                            '</a>',
                        '</li>'
                    ]),
                '</ul>',
                '<div class="overlay"></div>',
            '</nav>',
        '</header>'
    ];

    return {header, head};
}