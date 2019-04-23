'use strict';
const getMyRenderer = require('./renderer.js');
const pathd = require('path');
const _ = p => pathd.join(__dirname, p);

module.exports = params => async (app) => {
    app.markdown.setRenderer(getMyRenderer(app));
    if (params.oldBlogTime){
        let d = Date.parse(params.oldBlogTime);
        app.ext.oldBlogTime = d;
    }
    app.on('init-pages', async () => {
        let scss = (await app.helper.find(_('css'))).map(f => pathd.join(__dirname, 'css', f.toString()));
        app.scss.register('/css/main.css', _('css/main.scss'), scss);
        app.file.register('/js/main.js', _('dist/main.js'));
    
        await app.hot.register(_('templates/templates.js'));
    });
};