'use strict';
const pathd = require('path');
const _ = p => pathd.join(__dirname, p);

module.exports = (main, mod) => {

    function _forIn(obj, cb){
        let ret = [];
        for (let k in obj){
            ret.push(cb(k, obj[k]));
        }
        return ret;
    }

    let {escapeS} = main.helper;

    let config = main.config;
    let libs = config.libs;
    let ext = main.ext;

    let domain = 'localhost';
    if (ext.env === 'Generate'){
        domain = config.domain;
    }
    else if (ext.env === 'Server'){
        domain = config.localDomain;
    }

    let {head, header} = mod.require(_('head.js'));
    let mathjax = () => `<script type="text/javascript" async src="${escapeS(libs.mathjax)}"></script>`;

    let creativeCommon = [
        // '<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">',
        //     '<img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" />',
        // '</a>',
        // '<br />',
        'This work is licensed under a ',
        '<a rel="license" href="http://creativecommons.org/licenses/by/4.0/" target="_blank">',
            'Creative Commons Attribution 4.0 International License',
        '</a>.'
    ];

    let footer = () => [
        '<footer class="main-footer">',
            '<div class="footer-row-2">',
                '<div class="footer-right">',
                    '<span>Links</span>',
                    '<ul class="link-list">',
                        _forIn(config.links, (name, url) => [
                            '<li>',
                                `<a href="${url}" target="_blank">${name}</a>`,
                            '</li>'
                        ]),
                    '</ul>',
                '</div>',
                '<div class="divider"></div>',
                '<div class="footer-left">',
                    '<p>',
                        creativeCommon,
                    '</p>',
                    '<p>',
                        'Powered by <a href="https://github.com/Hadron67/Noteblog" target="_blank">Noteblog</a>, theme written by Hadroncfy.',
                    '</p>',
                    '<p>',
                        '<i class="fab fa-html5"></i> ',
                        `<a href="http://validator.w3.org/check?uri=${domain}${pathd.join('/', main.rendering.path)}" target="_blank">`,
                            'Validate HTML5',
                        '</a>',
                    '</p>',
                '</div>',
            '</div>',
        '</footer>'
    ];

    let searchPanel = [
        '<div id="search-panel">',
            '<div class="search-inner empty" id="search-inner">',
                '<div class="search-input-container">',
                    '<a id="btn-clear-search"><i class="fas fa-times"></i></a>',
                    '<input id="search-input" type="text" autocomplete="off" placeholder="Search posts..." />',
                '</div>',
                '<div class="search-result-container">',
                    '<ul id="search-result">',
                    '</ul>',
                    '<div id="search-loading" class="show"></div>',
                    '<div id="search-no-result-hint">',
                        '<p class="icon"><i class="fas fa-search"></i></p>',
                        '<p class="text">No result found.</p>',
                    '</div>',
                '</div>',
            '</div>',
        '</div>',
    ];
    
    let outter = (banner, active, subtitle, content) => [
        '<!DOCTYPE html>',
        '<html>',
            '<head>',
                head(subtitle),
            '</head>',
            '<body>',
                header(banner, active),
                '<div class="outter-container">',
                    '<div class="main-container">',
                        content,
                    '</div>',
                '</div>',
                footer(),
                searchPanel,
                '<a id="totop" href="javascript:;" title="Back to top"><i class="fas fa-chevron-up"></i></a>',
                `<script data-index-json="${main.ext.searchIndex}" src="${main.path('/js/main.js')}"></script>`,
                libs.katex.prerendering ? '' : `<script src="${main.path('/js/katex-renderer.js')}"></script>`,
            '</body>',
        '</html>'
    ];


    return outter;
}