import $ from './tool';

var overlay = $('.overlay');

export default {
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