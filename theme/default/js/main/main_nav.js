import $ from './tool';
import getScrollPos from './get_scroll_pos';
import totop from './totop';

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

var nav = $('#main-nav');

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
$(document).scroll(check).load(check);