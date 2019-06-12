'use strict';

const theme = require('./theme/default/index.js');
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
    domain: 'https://hadroncfy.com',
    author: 'hadroncfy',
    githubRepo: 'https://github.com/Hadron67/Hadron67.github.io/tree/source',

    mathjaxURL: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS_CHTML',

    fontawesome: {
        url: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css',
        integrity: 'sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf'
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
            addr: '0.0.0.0'
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