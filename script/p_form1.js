$(function(){
    $('#date').bootstrapMaterialDatePicker({ format : 'YYYY/MM/DD  HH:mm' });
});

var data=[]; // ギルメンの情報を入れる
var enemy_name; // 敵ギルドの名前を入れる
var date; // マッチング日を入れる
var vs_number; // 対戦数を入れる
var member=[]; // 参加メンバーを入れる

// ----------------SP(ギルメンデータの取得)-------------------------------------------------------------------
$.getJSON("https://spreadsheets.google.com/feeds/cells/1pBlpeDH8YSE7HlZdd814mYr8ckq_A-5k9KH8DUfXDmo/omooebr/public/values?alt=json", function(dd){
 　　　　//処理を実行
	var row = 13; // SPの列数
	d=dd;
     console.log(d);
     for(var i = 0; i < (d.feed.entry.length)/row; i++) {
        var tmp=[];
        for(var j=0; j < row; j++){
            tmp[j]=d.feed.entry[(i*row)+j].gs$cell.$t;
            tmp[j].toString();
        }
        data[i]=tmp;
     }
    //各データ書きこみ----------------------------------------------
	for(var i=1; i<data.length; i++){
        $('div>#member').append('<input type="checkbox" name="member" id="'+data[i][0]+'" value="'+i+'">');
        $('div>#member').append('<label for="'+data[i][0]+'">'+data[i][0]+'<br><span style="color: #bbbbbb">'+data[i][1]+'</span></label>');
    }
});

$(function(){
	var p_value=0; // 進捗状況の度合い
	var p_flag=[0,0,0,0]; // [#name, #date, #number, #member]のフラグ
	var p_dnum=0; // #dateの際にカウントアップで使う
	// progressバーの実装---------------------------------
	$('#name').focusout(function(){
		if($('#Enemy_data [name=name]').val() != ""){
			if(p_flag[0] == 0){
				p_value += 25;
				p_flag[0] = 1;
			}
			$(".progress-bar").css({"width": +p_value+ "%"});
		}else{
			if(p_flag[0] == 1){
				p_value -= 25;
				p_flag[0] = 0;
			}
			$(".progress-bar").css({"width": +p_value+ "%"});
		}
	});
	$('.dtp-btn-ok').click(function(){
		p_dnum += 1;
		if($('#Enemy_data [name=date]').val() != "" && p_dnum<=3){
			if(p_flag[1] == 0){
				p_value += 25;
				p_flag[1] = 1;
				p_dnum=0;
			}
			$(".progress-bar").css({"width": +p_value+ "%"});
		}else{
			if(p_flag[1] == 1){
				p_value -= 25;
				p_flag[1] = 0;
			}
			$(".progress-bar").css({"width": +p_value+ "%"});
		}
	});
	$('#number').click(function(){
		if($('#Enemy_data [name=number]').val() != ""){
			if(p_flag[2] == 0){
				p_value += 25;
				p_flag[2] = 1;
			}
		}
		if($('#member input:checked').length == parseInt($('#number input:checked').val())){
			if(p_flag[3] == 1){
				p_value -= 25;
				p_flag[3] = 0;
			}
		}
		$(".progress-bar").css({"width": +p_value+ "%"});
	});
	$('#member').click(function(){
		if($('#member input:checked').length == parseInt($('#number input:checked').val())){
			if(p_flag[3] == 0){
				p_value += 25;
				p_flag[3] = 1;
			}
		}else{
			if(p_flag[3] == 1){
				p_value -= 25;
				p_flag[3] = 0;
			}
		}
		$(".progress-bar").css({"width": +p_value+ "%"});
	});
});

function Reset(){
	$(".progress-bar").css({"width": "0%"});
	p_flag[0]=0; p_flag[1]=0; p_flag[2]=0; p_flag[3]=0; 
	p_value = 0;
}

function Confirm_enemydata(){
    // 入力した値の取得
    enemy_name = $('#Enemy_data [name=name]').val();
    date = $('#Enemy_data [name=date]').val();
    vs_number = $('#number input:checked').val();
    $('#member>input:checked').map(function(){ // チェックボックスの値を取得
		var val= $(this).attr("id");
		member.push(val);
    });

    // モーダルウィンドウ用の操作群------------------------------------------------------
    $("#Confirm").css({"display": "block"});
    //キーボード操作などにより、オーバーレイが多重起動するのを防止する
    $(this).blur() ;	//ボタンからフォーカスを外す
    if($("#modal-overlay")[0]) return false ;		//新しくモーダルウィンドウを起動しない
    //オーバーレイ用のHTMLコードを、[body]内の最後に生成する
    $("body").append('<div id="modal-overlay"></div>');
    //[$modal-overlay]をフェードインさせる
    $("#modal-overlay").fadeIn("slow");
    $("#Confirm").fadeIn("slow");
    centeringModalSyncer();
    // 確認用メッセージ内容-------------------------------------------------------------
    // 入力不足のチェック
    if(enemy_name == ""||date == ""||vs_number == "0"||member.length != parseInt(vs_number)){
    	console.log(enemy_name);
    	console.log(date)
    	console.log(vs_number)
    	console.log(member);
        $("#Confirm").append("入力不足があります。");
    }else{
        $("#Confirm>div>table>tbody").append('<tr><td class="col-sm-5">対戦相手のギルド名：</td><td class="col-sm-7">'+ enemy_name +'</td><tr>');
        $("#Confirm>div>table>tbody").append('<tr><td class="col-sm-5">マッチング日</td><td class="col-sm-7">'+ date + '</td><tr>');
        $("#Confirm>div>table>tbody").append('<tr><td class="col-sm-5">対戦数：</td><td class="col-sm-7">'+ vs_number + '</td><tr>');
        $("#Confirm>div>table>tbody").append('<tr><td class="col-sm-5">参加メンバー：</td><td class="col-sm-7"></td></tr>');
        for(var i=0; i<member.length; i++){
			$("#Confirm").append(member[i]+' ');
		}
        $("#Confirm").append('<p>上記でよろしいですか？</p>');
        $("#Confirm").append('<input type="submit" value="OK!" class="btn btn-primary my-btn2">');
    }
}

function send_Data(){
    //FORMデータを送信する
	document.getElementById("Enemy_data").submit();
	Confirm_window_close();
}

// モーダルウィンドウを閉じる関数
function Confirm_window_close() {
	$("#Confirm").fadeOut("slow");

	$("#modal-overlay").fadeOut("slow");
	$("#modal-overlay").unbind() // unbind()…対象の要素にそれまで設定されていたイベントをクリアする
	$("#modal-overlay").remove(); //フェードアウト後、[#modal-overlay]をHTML(DOコンテンツの初期化
	$("#Confirm").html('<button type="button" class="close" aria-label="Close"><a id="Eao-close" onClick="Confirm_window_close()">&times;</a></button>');
	$("#Confirm").append('<div class="table-responsive"><table class="table"><tbody></tbody></table></div>');
	enemy_name = "";
	date = "";
	vs_number = "";
	member =[];
}

//センタリングをする関数
function centeringModalSyncer(){
	// 真ん中配置：(ウィンドウの幅∨高さ - コンテンツの幅∨高さ) /2
	var pxleft = (($(window).width() - $("#Confirm").outerWidth(true))/2);
    var pxtop = (($(window).height() - $("#Confirm").outerHeight(true))/4);
	$("#Confirm").css({"left": pxleft + "px",});
	$("#Confirm").css({"top": pxtop + "px",});
}