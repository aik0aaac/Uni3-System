<script>
var name="hoge";
var date="0000/00/00 00:00";
var remain_date="0000/00/00 00:00";
var number=10;
var member=["セサミ街の悪夢","ぼん","BEJI","ウワノアゴト","Laplus"];

$(function(){
    $('#name').append('<div>'+name+'</div>');
    $('#date').append('<div>'+date+'</div>');
    $('#remain-date').append('<div class="col-sm-5">準備日終了まで：</div>'
                                +'<div>'+remain_date+'</div>');
    $('#number').append('<div>'+number+'</div>');
});

$(function(){
    for(var i=0; i<member.length; i++){
        $('#member>table>tbody').append('<tr><td>'+member[i]+'</td><td></td><td></td></tr>');
    }
});

</script>