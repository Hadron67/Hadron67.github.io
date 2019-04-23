import $ from './tool';

var elems = $('.btn-popup');
var targets = [];
elems.click(function(){
    var cela = $(this);
    $(cela.attr('data-target')).addClass('show');
});
elems.forEach(function(e){
    e = $($(e).attr('data-target'));
    e && targets.push(e);
});
$(document).click(function(event){
    var id = event.target.id;
    for (var i = 0; i < targets.length; i++){
        id !== targets[i].elems[0].id && id !== elems.elems[i].id && targets[i].removeClass('show');
    }
});