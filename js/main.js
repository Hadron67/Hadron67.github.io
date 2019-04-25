(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}(function () { 'use strict';

    // A minimum jQuery-like library

    function Element(elems){
        if (typeof elems === 'string'){
            var sub = elems.substr(1, elems.length - 1);
            if (elems.charAt(0) === '.'){
                this.elems = document.getElementsByClassName(sub);
            }
            else if (elems.charAt(0) === '#'){
                this.elems = [document.getElementById(sub)];
            }
            else {
                this.elems = document.getElementsByTagName(elems);
            }
        }
        else if (elems.length !== void 0){
            this.elems = elems;
        }
        else {
            this.elems = [elems];
        }
    }
    Element.prototype.forEach = function(cb){
        for (var i = 0, _a = this.elems; i < _a.length; i++){
            if (cb(_a[i], i)){
                return;
            }
        }
    };
    Element.prototype.addEventListener = function(event, s){
        this.forEach(function(e){
            e.addEventListener(event, s);
        });
        return this;
    };
    Element.prototype.click = function(s){
        return this.addEventListener('click', s);
    };
    Element.prototype.scroll = function(s){
        return this.addEventListener('scroll', s);
    };
    Element.prototype.load = function(s){
        return this.addEventListener('load', s);
    };
    Element.prototype.input = function(s){
        return this.addEventListener('input', s);
    };
    Element.prototype.hasClass = function(c){
        for (var i = 0, _a = this.elems; i < _a.length; i++){
            if (_a[i].classList.contains(c)){
                return true;
            }
        }
        return false;
    };
    Element.prototype.addClass = function(c){
        this.forEach(function(n){
            n.classList.add(c);
        });
    };
    Element.prototype.removeClass = function(c){
        this.forEach(function(n){
            n.classList.remove(c);
        });
    };
    Element.prototype.getValue = function(getter, c){
        if (c === void 0){
            if (this.elems.length === 1){
                return getter.get(this.elems[0]);
            }
            else {
                ret = [];
                this.forEach(function(e){
                    ret.push(getter.get(e.innerHTML));
                });
                return ret;
            }
        }
        else {
            this.forEach(function(e){
                getter.set(e, c);
            });
            return this;
        }
    };
    Element.prototype.html = function(c){
        if (c === void 0){
            if (this.elems.length === 1){
                return this.elems[0].innerHTML;
            }
            else {
                ret = [];
                this.forEach(function(e){
                    ret.push(e.innerHTML);
                });
                return ret;
            }
        }
        else {
            this.forEach(function(e){
                e.innerHTML = c;
            });
        }
    };
    Element.prototype.value = function(c){
        if (c === void 0){
            if (this.elems.length === 1){
                return this.elems[0].value;
            }
            else {
                ret = [];
                this.forEach(function(e){
                    ret.push(e.value);
                });
                return ret;
            }
        }
        else {
            this.forEach(function(e){
                e.value = c;
            });
        }
    };
    Element.prototype.attr = function(name, v){
        return this.getValue({
            get: function(e){ return e.getAttribute(name); },
            set: function(e, v){ return e.setAttribute(name, v); }
        }, v);
    };

    function fn(s){
        return new Element(s);
    }

    fn.ajax = function(arg){
        // var xhr = getXMLHttpRequest();
        var xhr = new XMLHttpRequest();
        xhr.open(arg.method || 'GET', arg.url, true);
        xhr.responseType = 'json';
        xhr.addEventListener('readystatechange', function(){
            if (xhr.readyState === XMLHttpRequest.DONE){
                if (xhr.status === 200 && arg.success){
                    arg.success(xhr.response);
                }
                else {
                    throw new Error(arg.url + ' responsed with ' + xhr.status + ' status');
                }
            }
            
        });
        xhr.send(null);
    };

    function getScrollPos(){
        return document.documentElement.scrollTop || document.body.scrollTop;
    }

    var totop = fn('#totop');

    function scrollToTop(pos){
        var div = 10, i = 0;
        var dh = pos / div;
        var interval = setInterval(function(){
            if (i >= div){
                clearInterval(interval);
            }
            window.scrollTo(0, Math.ceil(pos - dh * i++) | 0);
        }, 20);
    }

    totop.click(function(){
        scrollToTop(getScrollPos());
    });

    function getPos(t){
        var ret = t.offsetTop;
        while (t.offsetParent){
            t = t.offsetParent;
            ret += t.offsetTop;
        }
        return ret;
    }

    function fixHeading(pos){
        if (pos > navPos){
            nav.addClass('fixed');
        }
        else {
            nav.removeClass('fixed');
            navPos = getPos(nav.elems[0]);
        }
    }

    var nav = fn('#main-nav');

    var navPos = getPos(nav.elems[0]);

    function check(){
        var pos = getScrollPos();
        fixHeading(pos);
        // Schmitt trigger
        if (pos > 200 && !totop.hasClass('show')){
            totop.addClass('show');
        }
        if (pos < 150 && totop.hasClass('show')){
            totop.removeClass('show');
        }
    }
    fn(document).scroll(check).load(check);

    var overlay = fn('.overlay');

    var overlay$1 = {
        $: overlay,
        show: function(){
            overlay.addClass('show');
        },
        hide: function(){
            overlay.removeClass('show');
        },
        isShowing: function(){
            overlay.hasClass('show');
        }
    };

    var collapseBtn =  fn('#btn-collapse');
    var collapseList = fn('#main-nav-list');
    var btnCloseMenu = fn('#btn-close-menu');

    var menu = {
        show: function(){
            collapseList.addClass('show');
            overlay$1.show();
        },
        hide: function(){
            collapseList.removeClass('show');
            overlay$1.hide();
        },
        isShowing: function(){
            return collapseList.hasClass('show');
        }
    };

    collapseBtn.click(function(){
        menu.show();
    });
    btnCloseMenu.click(function(){
        menu.hide();
    });
    overlay$1.$.click(function(){
        if (menu.isShowing()){
            menu.hide();
        }
    });

    var searchPanel = fn('#search-panel');
    var btnSearch = fn('#btn-search');
    var input = fn('#search-input');
    var result = fn('#search-result');
    var btnClear = fn('#btn-clear-search');
    var innerContainer = fn('#search-inner');

    var loading = fn('#search-loading');
    var noResultHint = fn('#search-no-result-hint');
    var noResult = false;
    var isLoading = false;

    var search = {
        hide: function(){
            searchPanel.removeClass('show');
            overlay$1.hide();
            noResultHint.removeClass('show');
            loading.removeClass('show');
        },
        show: function(){
            searchPanel.addClass('show');
            overlay$1.show();
            noResult && noResultHint.addClass('show');
            isLoading && loading.addClass('show'); 
        },
        isShowing: function(){
            return searchPanel.hasClass('show');
        },
        empty: function(){
            noResult = false;
            noResultHint.removeClass('show');
            result.html('');
            innerContainer.addClass('empty');
        },
        unEmpty: function(){
            innerContainer.removeClass('empty');
        },
        startLoading: function(){
            isLoading = true;
            loading.addClass('show');
            this.unEmpty();
        },
        stopLoading: function(){
            isLoading = false;
            loading.removeClass('show');
        },
        setResult: function(content){
            result.html(content);
            this.unEmpty();
            if (content === ''){
                noResultHint.addClass('show');
                noResult = true;
            }
            else {
                noResultHint.removeClass('show');
                noResult = false;
            }
        },
        setNoResult: function(){

        },
        search: function(str){
            doSearch(str, function(r){
                if (r.length){
                    var s = '';
                    for (var i = 0; i < r.length; i++){
                        s += [
                            '<li>',
                                '<a href="' + r[i].path + '" class="search-result-entry">',
                                    r[i].toString(),
                                '</a>',
                            '</li>'
                        ].join('');
                    }
                    search.setResult(s);
                }
                else {
                    search.setResult('');
                }
            });
        }
    };
    searchPanel.click(function(t){
        (t.target.id === 'search-panel' || t.target.id === 'search-inner') && search.hide();
    });
    btnSearch.click(function(){
        search.show();
    });

    function MatchedElement(path, title, content){
        this.path = path;
        this.title = title;
        this.content = content;
    }
    MatchedElement.prototype.toString = function(){
        return '<span class="title">' + this.title + '</span>' + this.content;
    };

    var content = null;
    var regWord = /[a-zA-Z0-9-]/;
    /**
     * 
     * @param {string} content 
     * @param {RegExp} regexp 
     */
    function extractMatchedString(content, regexp, chars, limit){
        var a = regexp.exec(content);
        chars >>= 1;
        if (a){
            var ret = '';
            var lastIndex = 0;
            var segs = [];
            var first = true;
            while (a){
                if (a.index > lastIndex){
                    segs.push({
                        start: lastIndex,
                        len: a.index - lastIndex
                    });
                }
                if (first){
                    first = false;
                }
                else {
                    if (a.index === lastIndex){
                        break;
                    }
                }
                segs.push(a[0]);
                lastIndex = a.index + a[0].length;
                a = regexp.exec(content);
            }
            if (lastIndex < content.length){
                segs.push({
                    start: lastIndex,
                    len: content.length - lastIndex
                });
            }
            for (var i = 0; i < segs.length; i++){
                var seg = segs[i];
                if (limit > 0 && ret.length > limit){
                    ret += '\u22ef';
                    break;
                }
                if (typeof seg === 'string'){
                    ret += '<span class="keyword">' + seg + '</span>';
                }
                else {
                    if (chars > 0 && seg.len > chars * 2){
                        var end = seg.start + seg.len;
                        var id1 = seg.start + chars, id2 = seg.start + seg.len - chars;
                        // Avoid breaking words
                        while (id1 < end && regWord.test(content.charAt(id1))){
                            id1++;
                        }
                        while (id2 > seg.start && regWord.test(content.charAt(id2))){
                            id2--;
                        }
                        if (id1 < id2){
                            ret += content.substr(seg.start, id1 - seg.start);
                            ret += '\u22ef';
                            ret += content.substr(id2, end - id2);
                        }
                        else {
                            ret += content.substr(seg.start, seg.len);
                        }
                    }
                    else {
                        ret += content.substr(seg.start, seg.len);
                    }
                }
            }
            return ret;
        }
        else {
            return '';
        }
    }

    function doMatch(content, regexp){
        var title = extractMatchedString(content.title, regexp, -1, -1);
        var text = extractMatchedString(content.content, regexp, 20, 2048);
        if (title !== '' || text !== ''){
            title === '' && (title = content.title);
            return new MatchedElement(content.path, title, text);
        }
        else {
            return null;
        }
    }

    function doSearch(str, cb){
        var regexp; 
        try {
            regexp = new RegExp(str.replace(/[ ]+/g, '|'), 'gmi');
        }
        catch(e){
            return;
        }
        if (content){
            var ret = [];
            for (var i = 0; i < content.length; i++){
                var match = doMatch(content[i], regexp);
                match && ret.push(match);
            }
            cb(ret);
        }
        else {
            search.startLoading();
            fn.ajax({
                url: '/search/content.json',
                success: function(data){
                    content = data;
                    search.stopLoading();
                    doSearch(input.value(), cb);
                }
            });
        }
    }

    btnClear.click(function(){
        if (input.value() === ''){
            search.hide();
        }
        else {
            input.value('');
            search.empty();
        }
    });

    input.input(function(){
        if (!isLoading){
            var str = this.value.trim();
            if (str.length > 0){
                search.search(str);
            }
            else {
                search.empty();
            }
        }
    });

    var elems = fn('.btn-popup');
    var targets = [];
    elems.click(function(){
        var cela = fn(this);
        fn(cela.attr('data-target')).addClass('show');
    });
    elems.forEach(function(e){
        e = fn(fn(e).attr('data-target'));
        e && targets.push(e);
    });
    fn(document).click(function(event){
        var id = event.target.id;
        for (var i = 0; i < targets.length; i++){
            id !== targets[i].elems[0].id && id !== elems.elems[i].id && targets[i].removeClass('show');
        }
    });

}));
