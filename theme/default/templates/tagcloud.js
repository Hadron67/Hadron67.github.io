'use strict';
const pathd = require('path');
const _ = p => pathd.join(__dirname, p);

module.exports = (main, mod) => {

    let outter = mod.require(_('outter.js'));
    let ext = main.ext;
    let {escapeS, escapeHTML, regulateName} = main.helper;

    function _forIn(obj, cb){
        let ret = [];
        for (let k in obj){
            ret.push(cb(k, obj[k]));
        }
        return ret;
    }

    function totalTags(tags){
        let ret = 0;
        for (let name in tags){
            ret += tags[name].size();
        }
        return ret;
    }

    function tagMinMax(tags){
        let min = 0, max = 0;
        for (let name in tags){
            let s = tags[name].size();
            s < min && (min = s);
            s > max && (max = s);
        }
        return {min, max};
    }

    function getTagStyle(max, min, size){
        let from = 1, to = 2.5;
        let r = min === max ? 0 : (size - min) / (max - min);
        let fs = from + (to - from) * r;
        return `font-size: ${fs}em;`;
    }

    let tagCloud = ({tags}) => outter([
        '<h1 class="line1 icon"><i class="fas fa-tags"></i>Tag Cloud</h1>'
    ], 'Tags', 'Tagcloud', [
        '<ul class="tag-cloud">',
            () => {
                let {max, min} = tagMinMax(tags);
                return _forIn(tags, (k, v) => [
                    '<li>',
                        `<a href="${pathd.join(escapeS(ext.tags), escapeS(regulateName(k)), '/')}" style="${getTagStyle(max, min, v.size())}">`,
                            '<i class="fas fa-tag"></i>',
                            escapeHTML(k),
                        '</a>',
                    '</li>'
                ])
            },
        '</ul>'
    ]);

    return tagCloud;
}