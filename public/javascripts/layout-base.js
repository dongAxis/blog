(function(index){
//    alert($(document.body).width());

   index=0;
   var ClientWidth=$(window).width();
   var ClientHeight=$(window).height();
   var boards = $("body div");
   var size = boards.size();

    alert(ClientHeight);
    boards.each(function(index){

        $(boards[index]).css({
            "height":ClientHeight+"px !important",
            "width":ClientWidth+"px !important",
            "dispaly":"block !important",
            "border":"2px solid"
        });
        /*if(index=3)
        {
            $(boards[index]).css({
                "height":ClientHeight+"px",
                "width":ClientWidth+"px",
                "dispaly":"block"
            });
        }
        else
        {
            $(boards[index]).css({
                "height":"0px",
                "width":"0px",
                "dispaly":"none"
            });
        }*/
    });
})();