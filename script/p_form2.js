$(function(){
    $('#date').bootstrapMaterialDatePicker({ format : 'YYYY/MM/DD  HH:mm' });
});

var data=[]; // SP【ギルメンデータ】の情報を入れる
// var data_a=[]; // SP【ギルバト各方舟戦果】を入れる

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
    var entryM = []; // ギルバトに参加してる人のデータを格納
	for(var i=1; i<data.length; i++){
		if(data[i][2] == "○"){
			entryM.push(data[i]);
		}
	}
	for(var i=1; i<=entryM.length; i++){
		$("#number").append('<input type="radio" name="number" id="num'+i+'" value="'+i+'">');
        $("#number").append('<label for="num'+i+'">'+i+'</label>');
	}
	for(var i=0; i<entryM.length; i++){
		$("#name").append('<input type="radio" name="name" id="name'+i+'" value="'+entryM[i][0]+'">');
        $("#name").append('<label for="name'+i+'">'+entryM[i][0]+'</label>');
	}

	$("#number").click(function(){
		$("#number").removeClass("in");
	});
	$("#name").click(function(){
		$("#name").removeClass("in");
	});
});

// // データ取得(SP【ギルバト各方舟戦果】)------------------------------------------------------------------
// $.getJSON("https://spreadsheets.google.com/feeds/cells/1pBlpeDH8YSE7HlZdd814mYr8ckq_A-5k9KH8DUfXDmo/o98qpi5/public/values?alt=json", function(dda){
// 	 //処理を実行
// 	 var row = 5; // SPの列数
// 		da=dda;
// 		console.log(da);
// 		for(var i = 0; i < (da.feed.entry.length)/row; i++) {
// 			var tmp=[];
// 			for(var j=0; j < row; j++){
// 				tmp[j]=da.feed.entry[i*row+j].gs$cell.$t;
// 				tmp[j].toString();
// 			}
// 			data_a[i]=tmp;
// 		}
	
// });


$(function(){
	var p_value=0; // 進捗状況の度合い
	var increment = 20;
	var p_flag=[0,0,0,0,0]; // [#number, #name, #medal, #date, #count]のフラグ
	var p_dnum=0; // #dateの際にカウントアップで使う
	// progressバーの実装---------------------------------
	$('#number').click(function(){ // #number---------------
		if($('#Ark_data [name=number]').val() != ""){
			if(p_flag[0] == 0){
				p_value += increment;
				p_flag[0] = 1;
			}
			$(".progress-bar").css({"width": +p_value+ "%"});
		}else{
			if(p_flag[0] == 1){
				p_value -= increment;
				p_flag[0] = 0;
			}
			$(".progress-bar").css({"width": +p_value+ "%"});
		}
	});
	$('#name').click(function(){ // #name-----------
		if($('#Ark_data [name=name]').val() != ""){
			if(p_flag[1] == 0){
				p_value += increment;
				p_flag[1] = 1;
			}
			$(".progress-bar").css({"width": +p_value+ "%"});
		}else{
			if(p_flag[1] == 1){
				p_value -= increment;
				p_flag[1] = 0;
			}
			$(".progress-bar").css({"width": +p_value+ "%"});
		}
	});
	$('#medal').click(function(){
		if($('#Ark_data [name=medal]').val() != ""){
			if(p_flag[3] == 0){
				p_value += increment;
				p_flag[3] = 1;
			}
			$(".progress-bar").css({"width": +p_value+ "%"});
		}else{
			if(p_flag[3] == 1){
				p_value -= increment;
				p_flag[3] = 0;
			}
		}
		$(".progress-bar").css({"width": +p_value+ "%"});
	});
	$('.dtp-btn-ok').click(function(){ // #date
		p_dnum += 1;
		if($('#Ark_data [name=date]').val() != "" && p_dnum<=3){
			if(p_flag[2] == 0){
				p_value += increment;
				p_flag[2] = 1;
				p_dnum=0;
			}
			$(".progress-bar").css({"width": +p_value+ "%"});
		}else{
			if(p_flag[2] == 1){
				p_value -= increment;
				p_flag[2] = 0;
			}
			$(".progress-bar").css({"width": +p_value+ "%"});
		}
	});
	$('#count').click(function(){
		if($('#Ark_data [name=count]').val() != ""){
			if(p_flag[4] == 0){
				p_value += increment;
				p_flag[4] = 1;
			}
			$(".progress-bar").css({"width": +p_value+ "%"});
		}else{
			if(p_flag[4] == 1){
				p_value -= increment;
				p_flag[4] = 0;
			}
		}
		$(".progress-bar").css({"width": +p_value+ "%"});
	});
});

function Reset(){
	$(".progress-bar").css({"width": "0%"});
	p_flag[0]=0; p_flag[1]=0; p_flag[2]=0; p_flag[3]=0; p_flag[4]=0;
	p_value = 0;
}

var number;
var name;
var medal;
var date;
var count;

function Confirm_enemydata(){
    // 入力した値の取得
    number = $('#number input:checked').val();
    console.log(number)
    name = $('#name input:checked').val();
    console.log(name)
    medal = $('#medal input:checked').val();
	console.log(medal)
    date = $('#Ark_data [name=date]').val();
	console.log(date)
    count = $('#count input:checked').val();
	console.log(count)

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
    if(number == ""||name == ""||medal == ""||date == ""||count == ""){
        $("#Confirm").append("入力不足があります。");
    }else{
        $("#Confirm>div>table>tbody").append('<tr><td class="col-sm-5">方舟No.：</td><td class="col-sm-7">'+ number +'</td><tr>');
        $("#Confirm>div>table>tbody").append('<tr><td class="col-sm-5">攻撃者名</td><td class="col-sm-7">'+ name + '</td><tr>');
        $("#Confirm>div>table>tbody").append('<tr><td class="col-sm-5">メダル数：</td><td class="col-sm-7">'+medal+'</td></tr>');
        $("#Confirm>div>table>tbody").append('<tr><td class="col-sm-5">攻撃した日：</td><td class="col-sm-7">'+ date + '</td><tr>');
        $("#Confirm>div>table>tbody").append('<tr><td class="col-sm-5">何戦目？：</td><td class="col-sm-7">'+count+'</td></tr>');
        $("#Confirm").append('<p>上記でよろしいですか？</p>');
        $("#Confirm").append('<input type="submit" value="OK!" class="btn btn-primary my-btn2">');
    }
}

function send_Data(){
    //FORMデータを送信する
	document.getElementById("Ark_data").submit();
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
	number = "";
	name = "";
	date = "";
	medal = "";
	count = "";
}

//センタリングをする関数
function centeringModalSyncer(){
	// 真ん中配置：(ウィンドウの幅∨高さ - コンテンツの幅∨高さ) /2
	var pxleft = (($(window).width() - $("#Confirm").outerWidth(true))/2);
    var pxtop = (($(window).height() - $("#Confirm").outerHeight(true))/4);
	$("#Confirm").css({"left": pxleft + "px",});
	$("#Confirm").css({"top": pxtop + "px",});
}