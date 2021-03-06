'use strict';

const theme = require('./theme/default/');
const pathd = require('path');
const _ = p => pathd.join(__dirname, p);
const fs = require('fs');

function read(file){
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => err ? resolve('') : resolve(data.toString('utf-8')));
    });
}

module.exports = async (app) => ({
    title: "Hadroncfy's Notebook",
    outDir: _('dist/'),
    localDomain: await read(_('private/ip')),
    domain: !app.env.lzy ? 'https://hadroncfy.com' : 'https://reex.tk',
    author: 'hadroncfy',
    githubRepo: 'https://github.com/Hadron67/Hadron67.github.io/tree/source',
    webRoot: !app.env.lzy ? '/' : 'blog',

    libs: {
        fontawesome: {
            url: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css',
            integrity: 'sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf'
        },
        katex: {
            css: {
                url: 'https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/katex.min.css',
                integrity: 'sha384-yFRtMMDnQtDRO8rLpMIKrtPCD5jdktao2TV19YiZYWMDkUR5GQZR/NOVTdquEx1j'
            },
            js: {
                url: 'https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/katex.min.js',
                integrity: 'sha384-9Nhn55MVVN0/4OFx7EE5kpFBPsEMZxKTCnA+4fqDmg12eCTqGi6+BB2LjY8brQxJ'
            },
            prerendering: false
        }
    },

    links: {
        'zzy(BG6GCZ)': 'https://zzy.blog.ustc.edu.cn/',
        'wxy': 'https://wxyhly.github.io/',
        'futantan': 'https://www.futantan.com/'
    },

    imagePath: '/static/img',
    
    plugins: [
        app.staticDirs(_('static'), '/static'),
        app.markdownPost([
            _('posts'),
            _('posts-old')
        ], '/articles'),
        app.categoryManager({
            mainPage: {path: '/', pagesPerPage: 5},
            archive: {path: '/archive', pagesPerPage: 20},
            tags: {path: '/tags', pagesPerPage: 20},
            categories: {path: '/category', pagesPerPage: 20},
        }),
        theme({
            oldBlogTime: '2016-07-24 15:45:26'
        }),
        app.indexGenerator('/search/content.json'),
        app.rss({
            path: '/rss.xml',
            limit: 10
        }),
        app.draft(),
        app.server({
            port: 8080,
            addr: 'localhost'
        }),
        app.gitDeployer({
            url: 'https://github.com/Hadron67/Hadron67.github.io.git',
            branch: 'master',
            deployDir: _('.deploy_git')
        }),
        app.generator(),
        app.cname()
    ]
});