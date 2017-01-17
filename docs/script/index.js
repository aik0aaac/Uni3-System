//-------------------------------------------------------------------------------
// 事前準備
//-------------------------------------------------------------------------------
$(function () {
	$('[data-toggle="tooltip"]').tooltip();
	$('body').mrstickytableheaders();
});

//----------------------------------------------------------
// SP=Google スプレッドシートの取得
//----------------------------------------------------------
var Data_Guild; // SP【ギルバト敵情報】
var Data_Guild_late; // SPの最終行の数値
var Data_Ark; // SP(【ギルバト各方舟戦果】
var Data_Member;// SP【ギルメン詳細】

$(function(){
	$.getJSON("https://spreadsheets.google.com/feeds/cells"
			+"/1Gb1srFP5BbDeFN0mocKpwzHp7ww10FKoB3FZI6rQtUg/olntvy7/public/values?alt=json", function(dd, status){
		console.log(status)
		if(status == "success"){
			Data_Guild = SetSPDate(dd, 3);
			Data_Guild_late = dd.feed.entry.length/3-1;
			console.log(Data_Guild)
			$.getJSON("https://spreadsheets.google.com/feeds/cells"
					+"/1Gb1srFP5BbDeFN0mocKpwzHp7ww10FKoB3FZI6rQtUg/oti3asw/public/values?alt=json", function(dd){
				Data_Ark = SetSPDate(dd, 5);
				console.log(Data_Ark)
				$.getJSON("https://spreadsheets.google.com/feeds/cells"
						+"/1Gb1srFP5BbDeFN0mocKpwzHp7ww10FKoB3FZI6rQtUg/od6/public/values?alt=json", function(dd){
					Data_Member = SetSPDate(dd, 13);
					console.log(Data_Member);
					$("#loader-bg").fadeOut("slow");
					Uni3System_SetUp();
					});
			});
		}else if(status == "error"){
			$("body").html('<div class="jumbotron">'
					+'<h1>Error!</h1>'
					+'情報が取得できませんでした。<br>'
					+'<span class="reload glyphicon glyphicon-repeat" onClick="reload()"></span></div>');

		}
	});
});


//-------------------------------------------------------------------------------
// 本体
//-------------------------------------------------------------------------------
// 時間関係の変数群
var ReadyTime; // 準備日終了までの秒数
var VsTime; // 戦闘日開始時間までの秒数
var NowTime; // 今の時間の秒数
var Time23 = 82800; // 23時間分の秒数
var TimeDiff; // 時間差を入れる関数

// 各種フラグ群
var Flag_VsTime = 0; // 準備日終了：1, 戦闘日終了；2
var Flag_Log=0; // logが表示された: 1, されてない:0

var ArkENum; // 何番の船をクリックしたか取得

//----------------------------------------------------------
// ページの成形
//----------------------------------------------------------
function Uni3System_SetUp(){
    var enemyName = Data_Guild[Data_Guild_late][0]; // 最新の敵の名
    var vsNumber = Data_Guild[Data_Guild_late][2]; // 戦闘方舟数

    // 時間について--------------------------------
    // 準備日終了時間(23時間なので、日を++、時間を--)
    ReadyTime = new Date(Data_Guild[Data_Guild_late][1]);
    ReadyTime.setDate(ReadyTime.getDate() + 1);
    ReadyTime.setHours(ReadyTime.getHours() - 1);
    // 戦闘日終了時間(23+24 = 47時間後なので、日を++、時間を+23)
    VsTime = new Date(Data_Guild[Data_Guild_late][1]);
    VsTime.setDate(VsTime.getDate() + 1);
    VsTime.setHours(VsTime.getHours() + 23);

    // 対戦ギルド名の表示-----------
    $('#EnemyGuildName').html("対戦相手："+ enemyName);
    // 船番ごとの表の表示
    for(var i=1; i<=vsNumber; i++){
        $('#ArksEnemy_table').children("tbody").append('<tr><td class="ark_enemy table-hover" '
        					+'onclick="ArkWindow()">'+i+'</td><td id="'+i+'"></td>'
							+'<td id="Attack'+i+'"></td></tr>');
    }

    // 最初に時間をマイナス表示させないため
    NowTime = new Date();
    TimeDiff = ReadyTime.getTime() - NowTime.getTime(); // 時間差
    if(TimeDiff <= Time23*2+3600){
        Flag_VsTime = 2;
    }else if(TimeDiff <= Time23){
        Flag_VsTime = 1;
    }
    
	// 敵番号の横にメダル数を表示
	var arkMedal=[]; // 各船番ごとの最高メダル数を格納
	for(var i=0; i<=vsNumber; i++){ arkMedal[i]=-1; }
	for(var i=1; i<Data_Ark.length; i++){
		if(parseInt(arkMedal[Data_Ark[i][0]]) < parseInt(Data_Ark[i][2])){
			arkMedal[Data_Ark[i][0]] = Data_Ark[i][2];
		}
	}
	for(var i=1; i<arkMedal.length; i++){
		switch (arkMedal[i]) {
		  case "0":
			$("#"+i).html('<img src="img/medal0.png" alt="0枚">');
			break;
		  case "1":
			$("#"+i).html('<img src="img/medal1.png" alt="1枚">');
			break;
		  case "2":
			$("#"+i).html('<img src="img/medal2.png" alt="1枚">'
							+'<img src="img/medal1.png" alt="2枚">');
			break;
		  case "3":
			$("#"+i).html('<img src="img/medal3.png" alt="1枚">'
							+'<img src="img/medal2.png" alt="2枚">'
							+'<img src="img/medal1.png" alt="3枚">');
			break;
		}
	}

	// 敵番号-メダル数の横に何回攻めたかを表示
	for(var i=1; i<Data_Ark.length; i++){
		$("#Attack"+Data_Ark[i][0]).append('<img src="img/attackIco.png" alt="★">');
	}

	// 合計メダル数の表示
	var flag_Results = [];
	for(var i=0; i<vsNumber; i++){ // 同じ船番を2度数えないようにフラグ群を作る
		flag_Results.push(0);
	}
	var sum=0;
	for(var i=1; i<Data_Ark.length; i++){
		if(!flag_Results[Data_Ark[i][0]]){
			sum += parseInt(Data_Ark[i][2]);
			flag_Results[Data_Ark[i][0]] = 1;
		}
	}
	$("#TotalResult").append(sum +"枚")
	$(".progress-bar").append(floatFormat((sum/(vsNumber * 3)), 2)*100+"%");
	$(".progress-bar").css({"width": + floatFormat((sum/(vsNumber * 3)), 2)*100+"%"});

	// Tab2の書きこみ------------------------------------------------------------------
	var entryM = []; // ギルバトに参加してる人のデータを格納
	for(var i=1; i<Data_Member.length; i++){
		if(Data_Member[i][2] == "○"){
			entryM.push(Data_Member[i]);
		}
	}
	var entryMName = {}; // ギルバトに参加してるギルメンの名前をハッシュ化して入れた配列
	for(var i=0; i<entryM.length; i++){
		var nm = entryM[i][0];
		entryMName[nm] = i;
	}
	var entryMResult = Data_Ark; // ギルメンの戦果を名前順に格納した配列
	entryMResult.sort(function(a,b){
		if( entryMName[a[1]] < entryMName[b[1]] ) return -1;
		if( entryMName[a[1]] > entryMName[b[1]] ) return 1;
		return 0;
	});

	var flag_entryMResult = []; // 各メンバーが何戦したかを判定する数値を格納した配列
	for(var i=0; i<entryM.length; i++){
		flag_entryMResult.push(0);
	}
	var tmp;
	for(var i=1; i<Data_Ark.length; i++){
		tmp = entryMResult[i][1];
		flag_entryMResult[entryMName[tmp]] += 1;
	}

	var ii=1;
	for(var i=0; i<entryM.length; i++){
		if(flag_entryMResult[i] == 0){ // まだ一戦もしてない∨準備日の時
			$('#Tab2>table>tbody').append('<tr><td>'+entryM[i][0]+'</td><td>'+entryM[i][5]+' '+entryM[i][6]+'</td>'
											+'<td></td><td></td>');
		}else if(flag_entryMResult[i] == 1){ // １戦した場合
			$('#Tab2>table>tbody').append('<tr><td>'+entryM[i][0]+'</td><td>'+entryM[i][5]+' '+entryM[i][6]+'</td>'
											+'<td>No.'+entryMResult[ii][0]+' '+entryMResult[ii][2]+'枚</td><td></td>');
			ii += 1;
		}else if(flag_entryMResult[i] == 2){ // ２戦した場合
			$('#Tab2>table>tbody').append('<tr><td>'+entryM[i][0]+'</td><td>'+entryM[i][5]+' '+entryM[i][6]+'</td>'
											+'<td>No.'+entryMResult[ii][0]+' '+entryMResult[ii][2]+'枚</td>'
											+'<td>No.'+entryMResult[ii+1][0]+' '+entryMResult[ii+1][2]+'枚</td>');
			ii += 2;
		}
	}


	// Tab3の書きこみ------------------------------------------------------------------
	for(var i=1; i<Data_Member.length; i++){
		$('#Tab3>table>tbody').append('<tr><td>'+Data_Member[i][0]+'</td>'
										+'<td>'+Data_Member[i][5]+' '+Data_Member[i][6]+'</td>'
										+'<td>'+Data_Member[i][3]+'</td></tr>');
	}

	// 最初のタブ表示の選択を行う
	if(Flag_VsTime == 0){
		$('.nav-tabs li').removeClass("active");
		$('.tab-pane').removeClass("active");
		$('.nav-tabs li:first-child').addClass("active");
		$('#Tab1').addClass("active");
	}else if(Flag_VsTime == 1){
		$('.nav-tabs li').removeClass("active");
		$('.tab-pane').removeClass("active");
		$('.nav-tabs li:nth-child(2)').addClass("active");
		$('#Tab2').addClass("active");
	}else if(Flag_VsTime == 2){
		$('.nav-tabs li').removeClass("active");
		$('.tab-pane').removeClass("active");
		$('.nav-tabs li:last-child').addClass("active");
		$('#Tab3').addClass("active");
	}

	OnStep();
    // 一秒ごとの処理
	setInterval("OnStep()",1000);
};

//----------------------------------------------------------
// 準備日、戦闘日カウントダウン表示関数
// ※戦闘日は、準備日の時は「開始まであと○○」、準備日終わったら「終了まであと○○」という形にする
//----------------------------------------------------------
function OnStep(){
    var time=[];
    NowTime = new Date();
    // 準備日の時
    if(Flag_VsTime == 0){
        TimeDiff = ReadyTime.getTime() - NowTime.getTime(); // 時間差
        if(TimeDiff <= Time23){ // 時間差が規定以上なら、戦闘日フェイズへ
            Flag_VsTime = 1;
        }
        time[0] = Math.floor(TimeDiff / (1000 * 60 * 60 *24)); // 日付変換
        time[1] = Math.floor((TimeDiff-time[0]*86400000) / (1000 * 60 * 60)); // 時間変換
        time[2] = Math.floor((TimeDiff-time[0]*86400000-time[1]*3600000) / (1000 * 60)); // 分変換
        time[3] = Math.floor((TimeDiff-time[0]*86400000-time[1]*3600000-time[2]*60000) / 1000 ); // 秒変換
        $('#VsTime').html("準備日終了まであと："+ time[0] +"日"+ time[1] +"時間"+ time[2] +"分"+ time[3] +"秒");
    }// 戦闘日の時
    else if(Flag_VsTime == 1){
        TimeDiff = VsTime.getTime() - NowTime.getTime(); // 時間差
        if(TimeDiff <= Time23+3600){// 時間差が規定以上なら、戦闘日終了フェイズへ
            Flag_VsTime = 2;
        }
        time[0] = Math.floor(TimeDiff / (1000 * 60 * 60 *24)); // 日付変換
        time[1] = Math.floor((TimeDiff-time[0]*86400000) / (1000 * 60 * 60)); // 時間変換
        time[2] = Math.floor((TimeDiff-time[0]*86400000-time[1]*3600000) / (1000 * 60)); // 分変換
        time[3] = Math.floor((TimeDiff-time[0]*86400000-time[1]*3600000-time[2]*60000) / 1000 ); // 秒変換
        $('#VsTime').html("戦闘日終了まであと："+ time[0] +"日"+ time[1] +"時間"+ time[2] +"分"+ time[3] +"秒");
    }// 戦闘日終了の時
    else if(Flag_VsTime == 2){
        $('#VsTime').html("戦闘日終了");
    }
}

//----------------------------------------------------------
// 方舟のテーブルの操作関数
//----------------------------------------------------------
function ArkWindow() {
    var getListAItems = document.getElementsByClassName( "ark_enemy" );
    for( var i = 0; i < getListAItems.length; i++ ){
        getListAItems[i].onclick = 
            function(){
                ArkENum = this.innerHTML;
                // 本体の表示-----------------------------------------------------------------------
                displayModalWindow("#EnemyArkOut", "EnemyArkOut_close");
                $('#number').html("No."+ ArkENum);
				var enemyArk_Data = ChooseArkResult(ArkENum);
				if(enemyArk_Data.length != 0){
					enemyArk_Data.sort(function(a,b){
						if( a[2] > b[2] ) return -1;
						if( a[2] < b[2] ) return 1;
						return 0;
					});
					$("#name").html("攻撃者名："+ enemyArk_Data[0][1]);// 攻撃者名
					$("#result").html("メダル数："+ enemyArk_Data[0][2]);// 戦果
					$("#time").html("攻撃した時間："+ enemyArk_Data[0][3]);// 時間
					$("#count").html("何戦目："+ enemyArk_Data[0][4]);// 何戦目か
				}
				else{
					$("#name").html("まだ誰も戦っていません");
				}
            }
    }
}

//---------------------------
// ログの表示関数
//---------------------------
function logDisplay(){
	if(Flag_Log == 0){
		var enemyArk_Data = ChooseArkResult(ArkENum);
		$("#log").css({
			"height": 80+"%",
			"overflow":"scroll",
		});
		// ログ
		$("#log").children("#logpanel").append('<div class="panel-heading">'
												+ enemyArk_Data.length +'人が戦っています</div>');
		// ログが0,1個以外なら表示
		if(enemyArk_Data.length >= 2){
			for(var i=0; i<enemyArk_Data.length; i++){
				$("#log").children("#logpanel").append('<div class="panel-heading">'
															+ parseInt(i+1) +'人目</div>');
				$("#log").children("#logpanel").append('<div class="panel-body">攻撃者名：'
															+ enemyArk_Data[i][1] +'</div>');
				$("#log").children("#logpanel").append('<div class="panel-body">メダル数：'
															+ enemyArk_Data[i][2] +'</div>');
				$("#log").children("#logpanel").append('<div class="panel-body">攻撃した時間：'
															+ enemyArk_Data[i][3] +'</div>');
				$("#log").children("#logpanel").append('<div class="panel-body">何戦目：'
															+ enemyArk_Data[i][4] +'</div');
			}
		}
		Flag_Log = 1;
	}
}

//---------------------------
// モーダルウィンドウを閉じる関数
//---------------------------
function EnemyArkOut_close(){
	Flag_Log=0;
	ModalWindow_close("#EnemyArkOut");
	ResetModalWindow();
}

//---------------------------
// モーダルウィンドウの初期化
//---------------------------
function ResetModalWindow(){
	$("#name").html("まだ攻めていません");// 攻撃者名
	$("#result").html("");// 戦果
	$("#time").html("");// 時間
	$("#count").html("");// 何戦目か
	// ログ
	$("#log").html('<a class="btn btn-primary" onClick="logDisplay()"'
					+'data-toggle="collapse" href="#logpanel">過去ログ表示/非表示</a>'
					+'<div id="logpanel" class="panel panel-default"></div>');
}

//---------------------------
// ⇛どの添字が同じ番号かを入れる二次元配列に格納
//---------------------------
function ChooseArkResult(num){
	var enemyArk_Data=[];
	for(var i=0; i<Data_Ark.length; i++){
		if(num == parseInt(Data_Ark[i][0])){
			enemyArk_Data.push(Data_Ark[i]);
		}
	}
	console.log(enemyArk_Data)
	return enemyArk_Data;
}