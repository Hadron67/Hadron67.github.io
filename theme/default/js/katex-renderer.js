!function (A, E) {
    "use strict";
    var macros = {};
    E.addEventListener("load", function () {
        for (var n = 0, _a = A.getElementsByClassName("mathjax-defs"); n < _a.length; n++){
            katex.renderToString(_a[n].innerText, {
                macros: macros,
                throwOnError: false,
                strict: false
            });
        }
        for (var n = 0, _a = A.getElementsByTagName("script"); n < _a.length; n++) { 
            var s = _a[n];
            switch (s.type) { 
                case "math/tex": 
                    var o = A.createElement("span"); 
                    s.insertAdjacentElement("afterend", o);
                    katex.render(s.innerText, o, { 
                        displayMode: false,
                        macros: macros, 
                        throwOnError: false, 
                        strict: false
                    }); 
                    break; 
                case "math/tex; mode=display":
                    o = A.createElement("span");
                    s.insertAdjacentElement("afterend", o);
                    katex.render(s.innerText, o, { 
                        displayMode: true, 
                        macros: macros, 
                        throwOnError: false, 
                        strict: false
                    }); 
                    break;
            } 
        }
    });
}(document, window);