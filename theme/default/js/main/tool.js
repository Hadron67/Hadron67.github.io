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
}
Element.prototype.addEventListener = function(event, s){
    this.forEach(function(e){
        e.addEventListener(event, s);
    });
    return this;
}
Element.prototype.click = function(s){
    return this.addEventListener('click', s);
}
Element.prototype.scroll = function(s){
    return this.addEventListener('scroll', s);
}
Element.prototype.load = function(s){
    return this.addEventListener('load', s);
}
Element.prototype.input = function(s){
    return this.addEventListener('input', s);
}
Element.prototype.hasClass = function(c){
    for (var i = 0, _a = this.elems; i < _a.length; i++){
        if (_a[i].classList.contains(c)){
            return true;
        }
    }
    return false;
}
Element.prototype.addClass = function(c){
    this.forEach(function(n){
        n.classList.add(c);
    });
}
Element.prototype.removeClass = function(c){
    this.forEach(function(n){
        n.classList.remove(c);
    });
}
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
}
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
}
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
}
Element.prototype.attr = function(name, v){
    return this.getValue({
        get: function(e){ return e.getAttribute(name); },
        set: function(e, v){ return e.setAttribute(name, v); }
    }, v);
}

function getXMLHttpRequest(){
    var xmlHttp = null;
    try {
        xmlHttp = new XMLHttpRequest();
    }
    catch (e) {
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return xmlHttp;
}

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
}

export default fn;