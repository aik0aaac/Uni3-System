//-------------------------------------------------------------------------------
// 事前準備
//-------------------------------------------------------------------------------
$(function(){
    $('#Date').bootstrapMaterialDatePicker({ format : 'YYYY/MM/DD  HH:mm' });
    $('#IrregularDate').bootstrapMaterialDatePicker({ format : 'YYYY/MM/DD  HH:mm' });
});

//----------------------------------------------------------
// SP=Google スプレッドシートの取得
//----------------------------------------------------------
var Data_Member;// SP【ギルメン詳細】
var Data_Guild; // SP【ギルバト敵情報】
var Data_Guild_late; // SP【ギルバト敵情報】の最終行の数値

$(function(){
	$.getJSON("https://spreadsheets.google.com/feeds/cells"
			+"/1Gb1srFP5BbDeFN0mocKpwzHp7ww10FKoB3FZI6rQtUg/olntvy7/public/values?alt=json", function(dd, status){
		console.log(status)
		if(status == "success"){
			Data_Guild = SetSPDate(dd, 3);
			Data_Guild_late = dd.feed.entry.length/3-1;
			console.log(Data_Guild)
			$.getJSON("https://spreadsheets.google.com/feeds/cells"
					+"/1Gb1srFP5BbDeFN0mocKpwzHp7ww10FKoB3FZI6rQtUg/od6/public/values?alt=json", function(dd, status){
				if(status == "success"){
					Data_Member = SetSPDate(dd, 16);
					console.log(Data_Member);
					$("#loader-bg").fadeOut("slow");
					Form2_SetUp();
				}else if(status == "error"){
					errorSP();
				}
			});
			}else if(status == "error"){
				errorSP();
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

//イレギュラーパターン
var INumber; // 方舟No.を入れる
var IName; // 攻撃者名を入れる
var IMedal; // メダル数を入れる
var IDate; // 攻撃した日を入れる
var ICount; // 何戦目か？を入れる

function Form2_SetUp(){
	//各データ書きこみ----------------------------------------------

	//今戦ってる相手の情報書きこみ
    $('#NowFighting').html("対戦相手："+ Data_Guild[Data_Guild_late][0]);

	//Formの書きこみ
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
	console.log("entryM")
	console.log(entryM)
	for(var i=0; i<entryM.length; i++){
		$("#Name").append('<input type="radio" name="Name" '
								+'id="Name'+i+'" value="'+entryM[i][3]+'">');
		$("#Name").append('<label for="Name'+i+'">'+entryM[i][3]+'</label>');
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
		if($('[name=Number]').val() != ""){
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
		$('#NumberDetail').html('<br>選択した番号：'+$('[name=Number]:checked').val());
	});
	$('#Name').click(function(){ //#Name
		if($('[name=Name]').val() != ""){
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
		$('#NameDetail').html('<br>選択した攻撃者名：'+$('[name=Name]:checked').val());
	});
	$('#Medal').click(function(){
		if($('[name=Medal]').val() != ""){
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
		if($('[name=Date]').val() != "" && p_dnum<=3){
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
		if($('[name=Count]').val() != ""){
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
    Date = $('[name=Date]').val();
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
		if($('#Medal input:checked +label').html() == "バトルが正常に出来なかった"){
	        $("#Confirm>div>table>tbody").append('<tr><td class="col-sm-5">メダル数：</td>'
        											+'<td class="col-sm-7">バトルが正常に出来なかった</td></tr>');
		}else{
	        $("#Confirm>div>table>tbody").append('<tr><td class="col-sm-5">メダル数：</td>'
													+'<td class="col-sm-7">'+Medal+'</td></tr>');
		}
        $("#Confirm>div>table>tbody").append('<tr><td class="col-sm-5">攻撃した日：</td>'
        										+'<td class="col-sm-7">'+ Date + '</td><tr>');
        $("#Confirm>div>table>tbody").append('<tr><td class="col-sm-5">何戦目？：</td>'
        										+'<td class="col-sm-7">'+Count+'</td></tr>');
        $("#Confirm").append('<p>上記でよろしいですか？</p>');
        $("#Confirm").append('<input value="OK!" '
        						+'class="btn btn-primary my-btn2" onClick="SendData()">');
    }
}

function IrregularConfirmArkData(){
    // 入力した値の取得
    INumber = $('[name=IrregularNumber]').val();
    IName = $('[name=IrregularName]').val();
    IMedal = $('#IrregularMedal input:checked').val();
    IDate = $('[name=IrregularDate]').val();
    ICount = $('#IrregularCount input:checked').val();

	displayModalWindow("#IrregularConfirm", "IrregularConfirmWindow_close")
    // 確認用メッセージ内容-------------------------------------------------------------
    // 入力不足のチェック
    if(INumber == ""||IName == ""||IMedal == ""||IDate == ""||ICount == ""){
        $("#IrregularConfirm").append("入力不足があります。");
    }else{
        $("#IrregularConfirm>div>table>tbody").append('<tr><td class="col-sm-5">方舟No.：</td>'
        										+'<td class="col-sm-7">'+ INumber +'</td><tr>');
        $("#IrregularConfirm>div>table>tbody").append('<tr><td class="col-sm-5">攻撃者名</td>'
        										+'<td class="col-sm-7">'+ IName + '</td><tr>');
        $("#IrregularConfirm>div>table>tbody").append('<tr><td class="col-sm-5">メダル数：</td>'
        										+'<td class="col-sm-7">'+ IMedal+'</td></tr>');
        $("#IrregularConfirm>div>table>tbody").append('<tr><td class="col-sm-5">攻撃した日：</td>'
        										+'<td class="col-sm-7">'+ IDate + '</td><tr>');
        $("#IrregularConfirm>div>table>tbody").append('<tr><td class="col-sm-5">何戦目？：</td>'
        										+'<td class="col-sm-7">'+ ICount+'</td></tr>');
        $("#IrregularConfirm").append('<p>上記でよろしいですか？</p>');
        $("#IrregularConfirm").append('<input value="OK!" '
        						+'class="btn my-btn-Irregular" onClick="SendIrregularData()">');
    }
}
//---------------------------
// FORMデータを送信する
//---------------------------
function SendData(){
	Waiting();
	document.getElementById("ArkData").submit();
	ConfirmWindow_close();
}

function SendIrregularData(){
	Waiting();
	document.getElementById("IrregularArkData").submit();
	IrregularConfirmWindow_close();
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

function IrregularConfirmWindow_close() {
	INumber = "";
	IName = "";
	IDate = "";
	IMedal = "";
	ICount = "";
	ModalWindow_close("#IrregularConfirm");
	$("#IrregularConfirm").html('<button type="button" class="close" aria-label="Close">'
						+'<a id="Eao-close" onClick="IrregularConfirmWindow_close()">&times;</a></button>');
	$("#IrregularConfirm").append('<div class="table-responsive"><table class="table">'
						+'<tbody></tbody></table></div>');
}
