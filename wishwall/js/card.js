window._move = false;
mycolor = ['pink lighten-2','purple darken-2',' blue lighten-2','deep-purple lighten-3',' light-blue lighten-2',' light-green darken-3',' cyan darken-1'];
var window_h, window_w ,card_h ,card_w;
$(function() {
            
            var _x, _y; 
            var cards = $(".mycard");
            window_h = $(window).height();
            window_w = $(window).width();
            card_h = $('.mycard').height();
            card_w = $('.mycard').width();
            var max_z_index = getCard_zindex();
            $.each(cards, function(index, val) {
                 
                rand_coor = randNum(window_w - card_w,window_h - card_h);
                var rand_x = rand_coor.x;
                var rand_y = rand_coor.y;
                 $(this).css({
                     left: rand_x,
                     top: rand_y
                 });
            });
            addMouseEvent();
            

            $("#add_wish").click(function() {
                $('.modal').modal();
                $('#textarea1').val('');
                $('#textarea1').trigger('autoresize');
            });
            $("#submit").click(function() {
                var userwish = $('#textarea1').val();
                var userwish = userwish.replace(/\n/g, "<br>");
                addWish(userwish);
                addMouseEvent();
                
                
            });
});
function randNum (under,over) {
    
    _r_x = parseInt(Math.random()*(under-1)+1);
    _r_y = parseInt(Math.random()*(over-1)+1);
    
    return {x:_r_x,y:_r_y};
}
function addWish (userwish) {
    var c_t = getTime();
    var rand_coor = randNum(window_w - card_w,window_h - card_h);
    var _z = getCard_zindex()+1;
    var _color = mycolor[Math.floor(Math.random() * mycolor.length + 1)-1];
    var new_add = "<div class='mycard' style='cursor:pointer;position:absolute;left:"+rand_coor.x+"px;top:"+rand_coor.y+"px;z-index:"+_z+"'>"+
                    "<div class='card "+_color+"'>"+
                    "<div class='card-content white-text'>"+
                    "<span class='card-title'>"+c_t+"</span>"+
                    "<div class='divider'></div>"+
                    "<p>"+userwish+
                    "</p></div></div></div>";
    $(".wishwall").append(new_add);
}
function addMouseEvent () {
    $(".mycard").mousedown(function(e) {
                $(this).addClass('active');
                 window._move = true;
                 _x = e.pageX - parseInt($(this).css("left"));
                 _y = e.pageY - parseInt($(this).css("top"));
                 
                 $(this).fadeTo(20, 0.5); 
            });
             $(document).mousemove(function(e) {
                 if (window._move) {
                     var x = e.pageX - _x; 
                    var y = e.pageY - _y;
                    
                     $(".active").css({ top: y, left: x }); 
                }
             }).mouseup(function() {
                 window._move = false;
                 var _z = getCard_zindex () + 1;
                 
                 $(".active").css('z-index', _z);
                 $(".active").fadeTo("fast", 1); 
                 $(".mycard").removeClass("active");
            });
}
function getCard_zindex() {
    var cards = $(".mycard");
    z_max = 0;
    $.each(cards, function(index, val) {
        z_ind = parseInt($(this).css('z-index'));
        if(z_ind > z_max){
            z_max = z_ind;
        }
    });
    
    return parseInt(z_max);
}

function getTime () {
    var d = new Date(new Date().getTime());
    return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
}