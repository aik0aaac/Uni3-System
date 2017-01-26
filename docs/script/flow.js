$(function(){
    $('#Flow1Button').click(function(){
        if($('#Flow1').css('display') == 'none'){
            $('#Flow1').show();
        }else{
            $('#Flow1').hide();
        }
        if($('#Flow2').css('display') == 'block'){
            $('#Flow2').hide();
        }
    });
    $('#Flow2Button').click(function(){
        if($('#Flow2').css('display') == 'none'){
            $('#Flow2').show();
        }else{
            $('#Flow2').hide();
        }
        if($('#Flow1').css('display') == 'block'){
            $('#Flow1').hide();
        }
    });
})