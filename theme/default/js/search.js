import $ from './tool';
import overlay from './overlay';

var searchPanel = $('#search-panel');
var btnSearch = $('#btn-search');
var input = $('#search-input');
var result = $('#search-result');
var btnClear = $('#btn-clear-search');
var innerContainer = $('#search-inner');

var loading = $('#search-loading');
var noResultHint = $('#search-no-result-hint');
var noResult = false;
var isLoading = false;

var search = {
    hide: function(){
        searchPanel.removeClass('show');
        overlay.hide();
        noResultHint.removeClass('show');
        loading.removeClass('show');
    },
    show: function(){
        searchPanel.addClass('show');
        overlay.show();
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
}

var content = null;

function _(){
    var ret = '';
    for (var i = 0, _a = arguments; i < _a.length; i++){
        ret += _a[i];
    }
    return ret;
}
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


function matchString(content, regexps, chars, limit){
    var ret = '';
    for (var i = 0, _a = regexps; i < _a.length; i++){
        var s = extractMatchedString(content, _a[i], chars, limit);
        if (s === ''){
            return '';
        }
        else {
            ret += s;
        }
    }
    return ret;
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
        $.ajax({
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