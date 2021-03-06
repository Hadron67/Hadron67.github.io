'use strict';

const pathd = require('path');
const _ = p => pathd.join(__dirname, p);

module.exports = (main, mod) => {

    // mod.require('hkm');
    let outter = mod.require(_('outter.js'));

    let escapeS = main.helper.escapeS;
    let escapeHTML = main.helper.escapeHTML;
    let regulateName = main.helper.regulateName;
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let ext = main.ext;
    let oldBlogTime = ext.oldBlogTime;
    
    function _if(cond, cb){
        return cond ? cb() : '';
    }

    function script(s){
        let ret = '';
        let c1 = 'a'.charCodeAt(0), c2 = 'A'.charCodeAt(0);
        for (let i = 0; i < s.length; i++){
            let c = s.charAt(i);
            if (/[A-Z]/.test(c)){
                ret += '&#x' + (c.charCodeAt(0) - c2 + 0x1D49C).toString(16).toUpperCase() + ';';
            }
            else if (/[a-z]/.test(c)){
                ret += '&#x' + (c.charCodeAt(0) - c1 + 0x1D4B6).toString(16).toUpperCase() + ';';
            }
            // if (/[a-zA-Z]/.test(c)){
            //     ret += `&${c}scr;`;
            // }
            else {
                ret += c;
            }
        }
        return ret;
    }
    
    let config = main.config;
    
    function articleCategoryList(pathBase, categoryPath){
        let list = [];
        let path0 = pathBase;
        for (let name of categoryPath){
            path0 = pathd.join(path0, name, '/');
            list.push({name, path: path0});
        }
        return list;
    }
    
    let postInfo = (article) => {
        let date = article.date;
        return [
            '<div class="article-info-container">',
                '<span class="post-meta-block">',
                    '<span class="post-info-icon">', 
                        '<i class="fas fa-calendar-alt"></i>', 
                    '</span>',
                    `<time class="post-date" title="Created on" datetime="${date.toISOString()}">`,
                        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
                    '</time>',
                '</span>',
                _if(article.category, () => {
                    let list = articleCategoryList(ext.category, article.category);
                    let content = [];
                    for (let i = 0; i < list.length; i++){
                        if (i > 0){
                            content.push(
                                '<span class="category-divider">',
                                    '<i class="fas fa-chevron-right"></i>',
                                '</span>'
                            );
                        }
                        content.push(
                            `<a href="${escapeS(regulateName(list[i].path))}">`,
                                escapeHTML(list[i].name),
                            '</a>'
                        );
                    }
                    return [
                        '<span class="post-meta-block">',
                            '<span class="post-info-icon">',
                                '<i class="fas fa-folder-open"></i>',
                            '</span>',
                            content,
                        '</span>',
                    ];
                }),
            '</div>',
        ];
    };
    
    let postTags = (article, small = false) => {
        if (article.tags.length === 0){
            return '';
        }
        return [
            `<footer class="post-footer${small ? ' small' : ''}">`,
                article.tags.map(tag => [
                    `<a class="btn-tag" href="${pathd.join(escapeS(ext.tags), regulateName(tag), '/')}" title="Tag: ${escapeS(tag)}">`,
                        `<i class="fas fa-tag"></i>${escapeHTML(tag)}`,
                    '</a>',
                ]),
            '</footer>'
        ];
    };
    
    let postLike = (article, header, content, arg) => [
        '<article class="article-main">',
            '<header class="article-title-container">',
                '<h1 class="article-title">', 
                    header,                
                '</h1>',
                postInfo(article),
            '</header>',
            `<div class="article-inner-container${article.indent ? ' indent' : ''}">`,
                content,
            '</div>',
            postTags(article),
        '</article>',
    ];
    
    let post = ({arg}) => outter([
        '<hgroup>',
            "<h1>Welcome to</h1>",
            `<h1>Hadroncfy's Notebook</h1>`,
        '</hgroup>'
    ], '', main.rendering.article.title,
    postLike(main.rendering.article,
        escapeHTML(main.rendering.article.title),
        main.rendering.article.content,
        arg
    ));

    let checkOldPost = (pages, cb) => {
        let old = pages[0] && pages[0].article.date <= oldBlogTime;
        let ret = [];
        for (let p of pages){
            let firstOldPost = false;
            if (!old && p.article.date <= oldBlogTime){
                old = true;
                firstOldPost = true;
            }
            ret.push(cb(p, firstOldPost));
        }
        return ret;
    }
    
    let page = ({pages, path, arg}) => outter([
        "<h1>Welcome to</h1>",
        `<h1>Hadroncfy's Notebook</h1>`,
    ], 'Home', '', [
        '<ul class="main-post-list">',
        checkOldPost(pages.getPages(), (page, firstOldPost) => [
            '<li>',
                firstOldPost ? oldBlogHint : '',
                postLike(page.article,
                    `<a class="article-title-link" href="${escapeS(page.path)}">${escapeHTML(page.article.title)}</a>`, [
                        page.article.summary,
                        '<p class="article-more-btn">',
                            `<a href="${escapeS(page.path)}">Read more</a>`,
                        '</p>'
                    ],
                    arg
                ),
            '</li>'
        ]),
        // pages.getPages().map(page => [
        // ]),
        '</ul>',
        pageNav(pages.pagePaths, pages.index)
    ]);
    
    function partitionByDate(pages){
        let ret = [];
        let old = pages[0] && pages[0].article.date <= oldBlogTime;
        for (let p of pages){
            let top = ret[ret.length - 1];
            let date = p.article.date;
            if (!old && date <= oldBlogTime){
                old = true;
                ret.push({date, pages: [p], firstOldList: true});
            }
            else if (top && top.date.getFullYear() === date.getFullYear() && top.date.getMonth() === date.getMonth()){
                top.pages.push(p);
            }
            else {
                ret.push({date, pages: [p], firstOldList: false});
            }
        }
        return ret;
    }
    
    let tag = ({pages, arg, tag, path}) => outter([
        `<h1 class="icon"><i class="fas fa-tags"></i>Tag: </h1>`,
        `<h2>${escapeHTML(tag)}</h2>`
    ], '', `Tag: ${tag}`, postDateList(pages, arg));

    let smallPost = (page, args) => [
        '<article class="article-main">',
            '<header class="article-title-container small">',
                '<h1 class="article-title small">', 
                    `<a class="article-title-link" href="${escapeS(page.path)}">`,
                        escapeHTML(page.article.title),
                    '</a>',
                '</h1>',
                postInfo(page.article),
            '</header>',
            postTags(page.article, true),
        '</article>',
    ];

    let oldBlogHint = [
        '<div class="old-blog-hint">',
            '<span class="outter"><span class="inner">Belows are old posts</span></span>',
            '<hr class="divider">',
        '</div>'
    ];

    let postDateList = (pages, args) => [
        '<ul class="post-date-list">',
            partitionByDate(pages.getPages()).map(({date, pages, firstOldList}) => [
                '<li>',
                    firstOldList ? oldBlogHint : '',
                    `<h2 class="post-list-date">${monthNames[date.getMonth()]}, ${escapeHTML(date.getFullYear().toString())}</h2>`,
                    '<ul class="post-list">',
                        pages.map(p => [
                            '<li>',
                                smallPost(p, args),
                            '</li>'
                        ]),
                    '</ul>',
                '</li>'
            ]),
        '</ul>',
        pageNav(pages.pagePaths, pages.index)
    ];

    let pageNav = (pagePaths, index, limit = 2) => _if(pagePaths.length > 1, () => [
        '<nav class="page-nav">',
            '<div>',
                () => {
                    let active = i => i === index ? ' active' : '';
                    let ret = [];
                    if (index > 0){
                        ret.push(
                            `<a href="${escapeS(pagePaths[index - 1])}" class="btn">`,
                                '<i class="fas fa-chevron-left"></i>',
                            '</a>'
                        );
                    }
                    else {
                        ret.push(
                            `<a href="javascript:;" class="btn disabled">`,
                                '<i class="fas fa-chevron-left"></i>',
                            '</a>'
                        );
                    }

                    ret.push(
                        '<a href="javascript:;" id="page-nav-mobile" class="btn-popup page-nav-mobile" data-target="#page-nav-popup">',
                            (index + 1) + '/' + pagePaths.length,
                        '</a>'
                    );
                    
                    ret.push('<div class="page-nav-popup-container"><ul id="page-nav-popup">');
                    for (let j = 0; j < pagePaths.length; j++){
                        ret.push(`<li><a href="${escapeS(pagePaths[j])}" class="btn${active(j)}">${j + 1}</a></li>`);
                    }
                    ret.push('</ul></div>');

                    ret.push('<ul class="page-nav-list">');
                    let i = 0;
                    ret.push(`<li><a href="${escapeS(pagePaths[0])}" class="btn${active(0)}">1</a></li>`);
                    i++;
                    if (i < index - limit){
                        ret.push('<li><a href="javascript:;" class="btn dotted"></a></li>');
                        i = index - limit;
                    }
                    while (i < index){
                        ret.push(`<li><a href="${escapeS(pagePaths[i])}" class="btn">${i + 1}</a></li>`);
                        i++;
                    }
                    if (i === index){
                        ret.push(`<li><a href="${escapeS(pagePaths[i])}" class="btn active">${i + 1}</a></li>`);
                        i++;
                    }
                    while (i < pagePaths.length && i <= index + limit){
                        ret.push(`<li><a href="${escapeS(pagePaths[i])}" class="btn">${i + 1}</a></li>`);
                        i++;
                    }
                    if (i < pagePaths.length - 1){
                        ret.push('<li><a href="javascript:;" class="btn dotted"></a></li>');
                        i = pagePaths.length - 1;
                    }
                    if (i === pagePaths.length - 1){
                        ret.push(`<li><a href="${escapeS(pagePaths[i])}" class="btn">${i + 1}</a></li>`);
                    }
                    ret.push('</ul>');
                    if (index < pagePaths.length - 1){
                        ret.push(
                            `<a href="${escapeS(pagePaths[index + 1])}" class="btn">`,
                                '<i class="fas fa-chevron-right"></i>',
                            '</a>'
                        );
                    }
                    else {
                        ret.push(
                            `<a href="javascript:;" class="btn disabled">`,
                                '<i class="fas fa-chevron-right"></i>',
                            '</a>'
                        );
                    }
                    return ret;
                },
            '</div>',
        '</nav>'
    ]);
    
    let category = ({pages, node, pathBase, path, arg}) => () => {
        let cpath = node.getPath();
        return outter([
            '<h1 class="line1 icon"><i class="fas fa-folder-open"></i>Categories</h1>',
        ], 'Categories', `Category${cpath.length > 0 ? ': ' + cpath.map(n => n.name).join('/') : ''}`, [
            '<div class="category-outter-container">',
                '<header class="category-path">',
                    `<a href="${pathd.join(escapeS(pathBase), '/')}">Category</a>`,
                    cpath.map(n => [
                        '<span class="category-divider">',
                            '<i class="fas fa-chevron-right"></i>',
                        '</span>',
                        `<a href="${pathd.join(escapeS(pathBase), n.getPath().map(p => regulateName(p.name)).join('/'), '/')}">${escapeHTML(n.name)}</a>`,
                    ]),
                '</header>',
                () => {
                    let subcat = node.getSubcategories();
                    let p = pathd.join(pathBase, node.getPath().map(n => regulateName(n.name)).join('/'), '/');
                    if (subcat.length > 0){
                        return [
                            '<h3 class="post-list-date">Subcategories</h3>',
                            '<ul class="subcategory-container">',
                                subcat.map(c => [
                                    `<li><a class="category-btn btn-category" href="${pathd.join(p, regulateName(c), '/')}">`,
                                        '<span class="category-file-icon"><i class="fas fa-folder-open"></i></span>',
                                        escapeHTML(c),
                                    `</a></li>`
                                ]),
                            '</ul>'
                        ];
                    }
                    else 
                        return '';
                },
                '<div class="category-post-list">',
                    postDateList(pages, arg),
                '</div>',
            '</div>',
        ]);
    };

    let archive = ({pages, arg}) => outter([
        '<h1 class="line1 icon"><i class="fas fa-archive"></i>Archive</h1>'
    ], 'Archive', 'Archive', [
        '<div class="archive-container">',
            postDateList(pages, arg),
        '</div>'
    ]);

    main.layouts.post = post;
    main.layouts.page = page;
    main.layouts.tag = tag;
    main.layouts.category = category;
    main.layouts.archive = archive;
    main.layouts.tagCloud = mod.require(_('tagcloud.js'));
};
