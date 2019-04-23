'use strict';
const pathd = require('path');

function addNewLineToEnds(s){
    if (s.charAt(0) !== '\n'){
        s = '\n' + s;
    }
    if (s.charAt(s.length - 1) !== '\n'){
        s += '\n';
    }
    return s;
}

module.exports = app => {
    let { escapeS, escapeHTML } = app.helper;
    let NodeType = app.markdown.NodeType;
    return class MyMarkdownRenderer extends app.markdown.DefaultRenderer {
        enterHeading(node) {
            if (node.val === 2){
                let id = this.getHeadingNodeID(node);
                id = id === null ? '' : ` id="${id}"`;
                this.text += `<div class="head2-wrapper"${id}><h2>`;
            }
            else
                this.text += `<h${node.val}>`;
        }
        leaveHeading(node) {
            if (node.val === 2){
                this.text += '</h2></div>';
            }
            else
                this.text += `</h${node.val}>`;
        }
        visitCode(node) {
            if (node.lang === 'mathjax-defs'){
                // XXX: A hack! 
                this.text += `<div class="mathjax-wrapper hidden"><script type="math/tex">%<![CDATA[${addNewLineToEnds(node.val)}%]]></script></div>`;
            }
            else
                this.text += `<pre><code lang="${escapeS(node.lang)}">${escapeHTML(node.val)}</code></pre>`;
        }
        visitImage(node) {
            let base = app.config.imagePath || '/';
            let src = /^https?:\/\//.test(node.src) ? escapeS(node.src) : pathd.join(base, escapeS(node.src));
            let inline = false, float = '', styles = [];
            for (let a of node.attrs){
                switch (a){
                    case 'inline': inline = true; break;
                    case 'left': float = 'left'; inline = false; break;
                    case 'right': float = 'right'; inline = false; break;
                    default:
                        if (/^"[^"]*"$/.test(a)){
                            styles.push(a.substr(1, a.length - 2) + ';');
                        }
                }
            }
            let classes = [];
            if (float !== ''){
                classes.push(float);
            }
            classes = classes.length > 0 ? ` class="${classes.join(' ')}"` : '';
            let styleString = styles.length > 0 ? ` style="${styles.join(' ')}"` : '';

            if (inline){
                this.text += `<img class="inline"${styleString} src="${src}" alt="${escapeS(node.alt)}" />`;
            }
            else {
                this.text += [
                    '<div class="img-container">',
                        `<figure${classes}>`,
                            `<img src="${src}"${styleString} alt="${escapeS(node.alt)}" />`,
                            node.alt !== '' ? `<figcaption><span>${escapeHTML(node.alt)}</span></figcaption>` : '',
                        '</figure>',
                    '</div>'
                ].join('');
            }
        }
        visitBlockMathjax(node) {
            this.text += [
                '<div class="mathjax-wrapper">',
                    '<script type="math/tex; mode=display">',
                        `%<![CDATA[${addNewLineToEnds(node.val)}%]]>`,
                    '</script>',
                '</div>'
            ].join('');
        }

        enterParagraph(node){
            let saved = this.text;
            this.text = '';
            let i, _a = node.children;
            for (i = 0; i < _a.length; i++){
                if (this.isBlockImage(_a[i])){
                    break;
                }
                _a[i].accept(this);
            }
            let hasPreceedingP = false;
            if (i > 0){
                this.text = saved + `<p>${this.text}</p>`;
                hasPreceedingP = true;
            }
            else {
                this.text = saved;
            }
            while (i < _a.length){
                this.text += `<div class="p-with-img${hasPreceedingP ? ' partial' : ''}">`;
                _a[i].accept(this);
                i++;
                if (i < _a.length && !this.isBlockImage(_a[i])){
                    this.text += '<p>';
                    while (i < _a.length && !this.isBlockImage(_a[i])){
                        _a[i].accept(this);
                        i++;
                    }
                    this.text += '</p>';
                }
                this.text += '</div>';
            }
            return true;
        }
        leaveParagraph(){
            this.text += '</p>';
        }

        getHeadingNodeID(node){
            if (node.children.length === 1 && node.children[0].type === NodeType.TEXT){
                let ret = node.children[0].val.trim();
                return ret.replace(/[A-Z]/g, c => c.toLowerCase()).replace(/[ ]+/g, '-');
            }
            else 
                return null;
        }
        isBlockImage(n){
            if (n.type === NodeType.IMAGE){
                let inline = false;
                for (let attr of n.attrs){
                    if (attr === 'left' || attr === 'right'){
                        return true;
                    }
                    if (attr === 'inline'){
                        inline = true;
                    }
                }
                return !inline;
            }
            return false;
        }
    };
}