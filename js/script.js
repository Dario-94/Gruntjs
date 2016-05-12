$().ready(function(){
    for(var listItem=$("li"),i=0;i<listItem.length;i++){
        var elem=listItem.eq(i);
        elem.is(".special")&&(elem.removeClass("special"),elem.addClass("bomba"))
    }
});
