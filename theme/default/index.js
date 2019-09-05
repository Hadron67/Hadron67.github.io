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
        let scss = (await app.helper.find(_('css'))).map(f => pathd.join(_('css'), f.toString()));
        app.scss.register(app.path('/css/main.css'), _('css/main.scss'), scss);
        app.file.register(app.path('/js/main.js'), _('dist/main.js'));
        app.file.register(app.path('/js/katex-renderer.js'), _('dist/katex-renderer.js'));
    
        await app.hot.register(_('templates/templates.js'));
    });
};