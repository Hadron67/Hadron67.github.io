import $ from './tool';
import getScrollPos from './get_scroll_pos';

var totop = $('#totop');

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

export default totop;