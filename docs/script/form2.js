//-------------------------------------------------------------------------------
// 事前準備
//-------------------------------------------------------------------------------
$(function(){
    $('#Date').bootstrapMaterialDatePicker({ format : 'YYYY/MM/DD  HH:mm' });
});

//----------------------------------------------------------
// SP=Google スプレッドシートの取得
//----------------------------------------------------------
var Data_Member;// SP【ギルメン詳細】

$(function(){
	$.getJSON("https://spreadsheets.google.com/feeds/cells"
			+"/1Gb1srFP5BbDeFN0mocKpwzHp7ww10FKoB3FZI6rQtUg/od6/public/values?alt=json", function(dd, status){
		if(status == "success"){
			Data_Member = SetSPDate(dd, 13);
			console.log(Data_Member);
			$("#loader-bg").fadeOut("slow");
			Form2_SetUp();
		}else if(status == "error"){
			$("body").html('<div class="jumbotron">'
				+'<h1>Error!</h1>'
				+'情報が取得できませんでした。<br>'
				+'<span class="reload glyphicon glyphicon-repeat" onClick="reload()"></span>'
				+'</div>');
		}
	});
});

//-------------------------------------------------------------------------------
// 本体
//-------------------------------------------------------------------------------
var Progress_Value=0; // 進捗状況の度合い
var Progress_Flag=[0,0,0,0,0]; // [#Number, #Name, #Medal, #Date, #Count]のフラグ
var Increment = 100/Progress_Flag.length; // 1項目で増えるプログレスバーの量

var Number; // 方舟No.を入れる
var Name; // 攻撃者名を入れる
var Medal; // メダル数を入れる
var Date; // 攻撃した日を入れる
var Count; // 何戦目か？を入れる

function Form2_SetUp(){
	//各データ書きこみ----------------------------------------------
	var entryM = []; // ギルバトに参加してる人のデータを格納
	for(var i=1; i<Data_Member.length; i++){
		if(Data_Member[i][2] == "○"){
			entryM.push(Data_Member[i]);
		}
	}
	for(var i=1; i<=entryM.length; i++){
		$("#Number").append('<input type="radio" name="Number" '
								+'id="num'+i+'" value="'+i+'">');
		$("#Number").append('<label for="num'+i+'">'+i+'</label>');
	}
	for(var i=0; i<entryM.length; i++){
		$("#Name").append('<input type="radio" name="Name" '
								+'id="Name'+i+'" value="'+entryM[i][0]+'">');
		$("#Name").append('<label for="Name'+i+'">'+entryM[i][0]+'</label>');
	}
	$("#Number").click(function(){
		$("#Number").removeClass("in");
	});
	$("#Name").click(function(){
		$("#Name").removeClass("in");
	});

	// 進捗バーの実装-----------------------------------------------
	var p_dnum=0; // #Dateの際にカウントアップで使う
	// progressバーの実装---------------------------------
	$('#Number').click(function(){ // #Number
		if($('#ArkData [name=Number]').val() != ""){
			if(Progress_Flag[0] == 0){
				Progress_Value += Increment;
				Progress_Flag[0] = 1;
			}
			$(".progress-bar").css({"width": +Progress_Value+ "%"});
		}else{
			if(Progress_Flag[0] == 1){
				Progress_Value -= Increment;
				Progress_Flag[0] = 0;
			}
			$(".progress-bar").css({"width": +Progress_Value+ "%"});
		}
	});
	$('#Name').click(function(){ //#Name
		if($('#ArkData [name=Name]').val() != ""){
			if(Progress_Flag[1] == 0){
				Progress_Value += Increment;
				Progress_Flag[1] = 1;
			}
			$(".progress-bar").css({"width": +Progress_Value+ "%"});
		}else{
			if(Progress_Flag[1] == 1){
				Progress_Value -= Increment;
				Progress_Flag[1] = 0;
			}
			$(".progress-bar").css({"width": +Progress_Value+ "%"});
		}
	});
	$('#Medal').click(function(){
		if($('#ArkData [name=Medal]').val() != ""){
			if(Progress_Flag[3] == 0){
				Progress_Value += Increment;
				Progress_Flag[3] = 1;
			}
			$(".progress-bar").css({"width": +Progress_Value+ "%"});
		}else{
			if(Progress_Flag[3] == 1){
				Progress_Value -= Increment;
				Progress_Flag[3] = 0;
			}
		}
		$(".progress-bar").css({"width": +Progress_Value+ "%"});
	});
	$('.dtp-btn-ok').click(function(){ // #Date
		p_dnum += 1;
		if($('#ArkData [name=Date]').val() != "" && p_dnum<=3){
			if(Progress_Flag[2] == 0){
				Progress_Value += Increment;
				Progress_Flag[2] = 1;
				p_dnum=0;
			}
			$(".progress-bar").css({"width": +Progress_Value+ "%"});
		}else{
			if(Progress_Flag[2] == 1){
				Progress_Value -= Increment;
				Progress_Flag[2] = 0;
			}
			$(".progress-bar").css({"width": +Progress_Value+ "%"});
		}
	});
	$('#Count').click(function(){
		if($('#ArkData [name=Count]').val() != ""){
			if(Progress_Flag[4] == 0){
				Progress_Value += Increment;
				Progress_Flag[4] = 1;
			}
			$(".progress-bar").css({"width": +Progress_Value+ "%"});
		}else{
			if(Progress_Flag[4] == 1){
				Progress_Value -= Increment;
				Progress_Flag[4] = 0;
			}
		}
		$(".progress-bar").css({"width": +Progress_Value+ "%"});
	});
}

//---------------------------
// プログレスバーの初期化
//---------------------------
function Reset(){
	$(".progress-bar").css({"width": "0%"});
	Progress_Flag[0]=0; Progress_Flag[1]=0; Progress_Flag[2]=0; Progress_Flag[3]=0; Progress_Flag[4]=0;
	Progress_Value = 0;
}

//-------------------------------------------------------------------------------
// 確認画面
//-------------------------------------------------------------------------------
function ConfirmArkData(){
    // 入力した値の取得
    Number = $('#Number input:checked').val();
    Name = $('#Name input:checked').val();
    Medal = $('#Medal input:checked').val();
    Date = $('#ArkData [name=Date]').val();
    Count = $('#Count input:checked').val();

	displayModalWindow("#Confirm", "ConfirmWindow_close")
    // 確認用メッセージ内容-------------------------------------------------------------
    // 入力不足のチェック
    if(Number == ""||Name == ""||Medal == ""||Date == ""||Count == ""){
        $("#Confirm").append("入力不足があります。");
    }else{
        $("#Confirm>div>table>tbody").append('<tr><td class="col-sm-5">方舟No.：</td>'
        										+'<td class="col-sm-7">'+ Number +'</td><tr>');
        $("#Confirm>div>table>tbody").append('<tr><td class="col-sm-5">攻撃者名</td>'
        										+'<td class="col-sm-7">'+ Name + '</td><tr>');
        $("#Confirm>div>table>tbody").append('<tr><td class="col-sm-5">メダル数：</td>'
        										+'<td class="col-sm-7">'+Medal+'</td></tr>');
        $("#Confirm>div>table>tbody").append('<tr><td class="col-sm-5">攻撃した日：</td>'
        										+'<td class="col-sm-7">'+ Date + '</td><tr>');
        $("#Confirm>div>table>tbody").append('<tr><td class="col-sm-5">何戦目？：</td>'
        										+'<td class="col-sm-7">'+Count+'</td></tr>');
        $("#Confirm").append('<p>上記でよろしいですか？</p>');
        $("#Confirm").append('<input value="OK!" '
        						+'class="btn btn-primary my-btn2" onClick="SendData()">');
    }
}

//---------------------------
// FORMデータを送信する
//---------------------------
function SendData(){
	document.getElementById("ArkData").submit();
	ConfirmWindow_close();
}

//---------------------------
// モーダルウィンドウを閉じる関数
//---------------------------
function ConfirmWindow_close() {
	Number = "";
	Name = "";
	Date = "";
	Medal = "";
	Count = "";
	ModalWindow_close("#Confirm");
	$("#Confirm").html('<button type="button" class="close" aria-label="Close">'
						+'<a id="Eao-close" onClick="ConfirmWindow_close()">&times;</a></button>');
	$("#Confirm").append('<div class="table-responsive"><table class="table">'
						+'<tbody></tbody></table></div>');
}
