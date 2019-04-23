import $ from './tool';
import overlay from './overlay';

var collapseBtn =  $('#btn-collapse');
var collapseList = $('#main-nav-list');
var btnCloseMenu = $('#btn-close-menu');

var menu = {
    show: function(){
        collapseList.addClass('show');
        overlay.show();
    },
    hide: function(){
        collapseList.removeClass('show');
        overlay.hide();
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
overlay.$.click(function(){
    if (menu.isShowing()){
        menu.hide();
    }
});

export default menu;