$(function () { // ツールチップを使うために設定する
	$('[data-toggle="tooltip"]').tooltip();
});

// スマホの場合-------------------------------------------
var getDevice = (function(){ // スマホ(sp)、タブレット(tab)、その他(other)
    var ua = navigator.userAgent;
    if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
        return 'sp';
    }else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0){
        return 'tab';
    }else{
        return 'other';
    }
})();
if(getDevice == 'sp' || getDevice == 'tab'){
	console.log("aaaaaa")
}

function reload() {　// リロード用の関数
  location.reload();
};

//-------------------------------------------------------------------------------

// SP=Google スプレッドシート
// データ関係の変数群
var data=[]; // SP(【ギルバト敵情報】を入れる
var d;
var data_a=[]; // SP(【ギルバト各方舟戦果】を入れる
var da;
var ark_enum;
var data_b=[]; // SP(【ギルメン詳細】を入れる


// 時間関係の変数群
var readytime;
var vstime;
var time23 = 82800; // 23時間分の秒数
var time_diff; // 時間差を入れる関数

// その他変数群
var vs_number;

// 各種フラグ群
var f_vs_time = 0; // 準備日終了：1, 戦闘日終了；2)
var f_log=0; // logが表示されたかされてないか確かめる

//----------------SP(【ギルバト敵情報】の取得)-------------------------------------------------------------------
$.getJSON("https://spreadsheets.google.com/feeds/cells/1pBlpeDH8YSE7HlZdd814mYr8ckq_A-5k9KH8DUfXDmo/odtqom2/public/values?alt=json", function(dd){
 　　　　//処理を実行
	var row = 3; // SPの列数
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
    //各データの格納----------------------------------------------
    late = d.feed.entry.length/row-1;
    enemy_name = data[late][0]; // 最新の敵の名
    vs_number = data[late][2];

    // 時間について--------------------------------
    // 準備日終了時間(23時間なので、日を++、時間を--)
    readytime = new Date(data[late][1]);
    readytime.setDate(readytime.getDate() + 1);
    readytime.setHours(readytime.getHours() - 1);
    // 戦闘日終了時間(23+23 = 46時間後なので、日を++、時間を+22)
    vstime = new Date(data[late][1]);
    vstime.setDate(vstime.getDate() + 1);
    vstime.setHours(vstime.getHours() + 22);

    // 対戦ギルド名の表示-----------
    $('#enemy_name').html("対戦相手："+ enemy_name);
    // 船番ごとの表の表示
    for(var i=1; i<=vs_number; i++){
        $('#arks_enemy').children("tbody").append('<tr><td class="ark_enemy table-hover" onclick="Ark_window()">'+i+'</td><td id="'+i+'"></td><td id="attack_'+i+'"></td></tr>');
    }

    // 最初に時間をマイナス表示させないため
    nowtime = new Date();
    time_diff = readytime.getTime() - nowtime.getTime(); // 時間差
    if(time_diff <= time23*2){
        f_vs_time = 2;
    }else if(time_diff <= time23){
        f_vs_time = 1;
    }
    
	// データ取得(SP【ギルバト各方舟戦果】)------------------------------------------------------------------
	$.getJSON("https://spreadsheets.google.com/feeds/cells/1pBlpeDH8YSE7HlZdd814mYr8ckq_A-5k9KH8DUfXDmo/o98qpi5/public/values?alt=json", function(dda){
		 //処理を実行
		 var row = 5; // SPの列数
			da=dda;
			console.log(da);
			for(var i = 0; i < (da.feed.entry.length)/row; i++) {
				var tmp=[];
				for(var j=0; j < row; j++){
					tmp[j]=da.feed.entry[i*row+j].gs$cell.$t;
					tmp[j].toString();
				}
				data_a[i]=tmp;
			}
// 		for(var i=0; i<data_a.length; i++){
// 			console.log("data_a["+i+"] is "+data_a[i]);
// 		}

		// 敵番号の横にメダル数を表示
		var ark_medal=[]; // 各船番ごとの最高メダル数を格納
		for(var i=0; i<=vs_number; i++){ ark_medal[i]=-1; }
		for(var i=1; i<data_a.length; i++){
			if(parseInt(ark_medal[data_a[i][0]]) < parseInt(data_a[i][2])){
				ark_medal[data_a[i][0]] = data_a[i][2];
			}
		}
		for(var i=1; i<ark_medal.length; i++){
			switch (ark_medal[i]) {
			  case "0":
				$("#"+i).html('<img src="img/medal_0.png" border="0" alt="●">');
				break;
			  case "1":
				$("#"+i).html('<img src="img/medal_1.png" border="0" alt="○">');
				break;
			  case "2":
				$("#"+i).html('<img src="img/medal_2.png" border="0" alt="○○"><img src="img/medal_1.png" border="0" alt="○">');
				break;
			  case "3":
				$("#"+i).html('<img src="img/medal_3.png" border="0" alt="○○○"><img src="img/medal_2.png" border="0" alt="○○"><img src="img/medal_1.png" border="0" alt="○">');
				break;
			}
		}

		// 敵番号-メダル数の横に何回攻めたかを表示
		for(var i=1; i<data_a.length; i++){
			$("#attack_"+data_a[i][0]).append('<img src="img/attack_ico.png" border="0" alt="★">');
		}

		// 合計メダル数の表示
		var f_results = [];
		for(var i=0; i<vs_number; i++){ // 同じ船番を2度数えないようにフラグ群を作る
			f_results.push(0);
		}
		var sum=0;
		for(var i=1; i<data_a.length; i++){
			if(!f_results[data_a[i][0]]){
				sum += parseInt(data_a[i][2]);
				f_results[data_a[i][0]] = 1;
			}
		}
		$("#Total_result").append(sum +"枚")
		$(".progress-bar").append(floatFormat((sum/(vs_number * 3)), 2)*100+"%");
		$(".progress-bar").css({"width": + floatFormat((sum/(vs_number * 3)), 2)*100+"%"});

		// データ取得(SP【ギルメン詳細】)------------------------------------------------------------------
		$.getJSON("https://spreadsheets.google.com/feeds/cells/1pBlpeDH8YSE7HlZdd814mYr8ckq_A-5k9KH8DUfXDmo/omooebr/public/values?alt=json", function(ddb){
			var row = 13; // SPの列数
			db=ddb;
			 console.log(db);
			 for(var i = 0; i < (db.feed.entry.length)/row; i++) {
				var tmp=[];
				for(var j=0; j < row; j++){
					tmp[j]=db.feed.entry[(i*row)+j].gs$cell.$t;
					tmp[j].toString();
				}
				data_b[i]=tmp;
			 }
			// tab3の書きこみ------------------------------------------------------------------
			var entryM = []; // ギルバトに参加してる人のデータを格納
			for(var i=1; i<data_b.length; i++){
				if(data_b[i][2] == "○"){
					entryM.push(data_b[i]);
				}
			}
			var entryMName = {}; // ギルバトに参加してるギルメンの名前をハッシュ化して入れた配列
			for(var i=0; i<entryM.length; i++){
				var nm = entryM[i][0];
				entryMName[nm] = i;
			}
			var entryMResult = data_a; // ギルメンの戦果を名前順に格納した配列
			console.log("entryMResult is");
			console.log(entryMResult);
			entryMResult.sort(function(a,b){
				if( entryMName[a[1]] < entryMName[b[1]] ) return -1;
				if( entryMName[a[1]] > entryMName[b[1]] ) return 1;
				return 0;
			});
			var f_entryMResult = []; // 各メンバーが何戦したかを判定する数値を格納した配列
			for(var i=0; i<entryM.length; i++){
				f_entryMResult.push(0);
			}
			var tmp;
			for(var i=1; i<data_a.length; i++){
				tmp = entryMResult[i][1];
				console.log(tmp)
				f_entryMResult[entryMName[tmp]] += 1;
			}
			console.log(entryMName)
			console.log(f_entryMResult);

			var ii=1;
			for(var i=0; i<entryM.length; i++){
				if(f_entryMResult[i] == 0){ // まだ一戦もしてない∨準備日の時
					$('#tab2>table>tbody').append('<tr><td>'+entryM[i][0]+'</td><td>'+entryM[i][5]+' '+entryM[i][6]+'</td>'
													+'<td></td><td></td>');
				}else if(f_entryMResult[i] == 1){ // １戦した場合
					$('#tab2>table>tbody').append('<tr><td>'+entryM[i][0]+'</td><td>'+entryM[i][5]+' '+entryM[i][6]+'</td>'
													+'<td>No.'+entryMResult[ii][0]+' '+entryMResult[ii][2]+'枚</td><td></td>');
					ii += 1;
				}else if(f_entryMResult[i] == 2){ // ２戦した場合
					$('#tab2>table>tbody').append('<tr><td>'+entryM[i][0]+'</td><td>'+entryM[i][5]+' '+entryM[i][6]+'</td>'
													+'<td>No.'+entryMResult[ii][0]+' '+entryMResult[ii][2]+'枚</td>'
													+'<td>No.'+entryMResult[ii+1][0]+' '+entryMResult[ii+1][2]+'枚</td>');
					ii += 2;
				}
			}


			// tab3の書きこみ------------------------------------------------------------------
			for(var i=1; i<data_b.length; i++){
				$('#tab3>table>tbody').append('<tr><td>'+data_b[i][0]+'</td>'
												+'<td>'+data_b[i][5]+' '+data_b[i][6]+'</td>'
												+'<td>'+data_b[i][3]+'</td></tr>');
			}
		});

	});

	// 最初のタブ表示の選択を行う
	Onstep();
	if(f_vs_time == 0){
		$('.nav-tabs li').removeClass("active");
		$('.tab-pane').removeClass("active");
		$('.nav-tabs li:first-child').addClass("active");
		$('#tab1').addClass("active");
	}else if(f_vs_time == 1){
		$('.nav-tabs li').removeClass("active");
		$('.tab-pane').removeClass("active");
		$('.nav-tabs li:nth-child(2)').addClass("active");
		$('#tab2').addClass("active");
	}else if(f_vs_time == 2){
		$('.nav-tabs li').removeClass("active");
		$('.tab-pane').removeClass("active");
		$('.nav-tabs li:last-child').addClass("active");
		$('#tab3').addClass("active");
	}

    // 一秒ごとの処理
	setInterval("Onstep()",1000);
});

function floatFormat( number, n ) { // 小数点の計算
	var _pow = Math.pow( 10 , n ) ;

	return Math.round( number * _pow ) / _pow ;
}

// 戦闘日は、準備日の時は「開始まであと○○」、準備日終わったら「終了まであと○○」という形にする
function Onstep(){ // 準備日、戦闘日表示関数
    var time=[];
    nowtime = new Date();
    if(f_vs_time == -1){
    	
    }
    if(f_vs_time == 0){ // 準備日の時
        time_diff = readytime.getTime() - nowtime.getTime(); // 時間差
        if(time_diff <= time23){
            f_vs_time = 1;
        }
        time[0] = Math.floor(time_diff / (1000 * 60 * 60 *24)); // 日付変換
        time[1] = Math.floor((time_diff-time[0]*86400000) / (1000 * 60 * 60)); // 時間変換
        time[2] = Math.floor((time_diff-time[0]*86400000-time[1]*3600000) / (1000 * 60)); // 分変換
        time[3] = Math.floor((time_diff-time[0]*86400000-time[1]*3600000-time[2]*60000) / 1000 ); // 秒変換
        $('#vs_time').html("準備日終了まであと："+ time[0] +"日"+ time[1] +"時間"+ time[2] +"分"+ time[3] +"秒");
    }
    else if(f_vs_time == 1){ // 戦闘日の時
        time_diff = vstime.getTime() - nowtime.getTime(); // 時間差
        if(time_diff <= time23){
            f_vs_time = 2;
        }
        time[0] = Math.floor(time_diff / (1000 * 60 * 60 *24)); // 日付変換
        time[1] = Math.floor((time_diff-time[0]*86400000) / (1000 * 60 * 60)); // 時間変換
        time[2] = Math.floor((time_diff-time[0]*86400000-time[1]*3600000) / (1000 * 60)); // 分変換
        time[3] = Math.floor((time_diff-time[0]*86400000-time[1]*3600000-time[2]*60000) / 1000 ); // 秒変換
        $('#vs_time').html("戦闘日終了まであと："+ time[0] +"日"+ time[1] +"時間"+ time[2] +"分"+ time[3] +"秒");
    }else if(f_vs_time == 2){
        $('#vs_time').html("戦闘日終了");
    }
}

// 方舟の操作関数----------------------------------------------------------------------------------------
function Ark_window() {
    var getListAItems = document.getElementsByClassName( "ark_enemy" );
    for( var i = 0; i < getListAItems.length; i++ ){
        getListAItems[i].onclick = 
            function(){
                ark_enum = this.innerHTML; // 何番の船をクリックしたか取得
                console.log("ark_enum "+ark_enum);

                // モーダルウィンドウ用の操作群------------------------------------------------------
                $("#Enemy_ark_out").css({"display": "block"});
                //キーボード操作などにより、オーバーレイが多重起動するのを防止する
                $(this).blur() ;	//ボタンからフォーカスを外す
                if($("#modal-overlay")[0]) return false ;		//新しくモーダルウィンドウを起動しない
                //オーバーレイ用のHTMLコードを、[body]内の最後に生成する
                $("body").append('<div id="modal-overlay"></div>');
                //[$modal-overlay]をフェードインさせる
                $("#modal-overlay").fadeIn("slow");
                $("#Enemy_ark_out").fadeIn("slow");
                centeringModalSyncer();
                // 本体の表示-----------------------------------------------------------------------
                var arkFlag=0; // 攻撃済みか判定するフラグ
                $('#number').html("No."+ ark_enum);
                var Enemy_ark_data=[];
				for(var i=1; i<data_a.length; i++){ // ⇛どの添字が同じ番号かを入れる二次元配列(Enemy_arkmemo)に格納
					if(ark_enum == parseInt(data_a[i][0])){
						Enemy_ark_data.push(data_a[i]);
						if(!arkFlag){
							arkFlag=1;
						}
					}
				}
				if(arkFlag){
					for(var i=0; i<Enemy_ark_data.length; i++){
						console.log("Enemy_ark_data["+i+"] is "+Enemy_ark_data[i]);
					}
					$("#name").html("攻撃者名："+ Enemy_ark_data[Enemy_ark_data.length-1][1]);// 攻撃者名
					$("#result").html("メダル数："+ Enemy_ark_data[Enemy_ark_data.length-1][2]);// 戦果
					$("#time").html("攻撃した時間："+ Enemy_ark_data[Enemy_ark_data.length-1][3]);// 時間
					$("#count").html("何戦目："+ Enemy_ark_data[Enemy_ark_data.length-1][4]);// 何戦目か
				}
            };
    }
}

// モーダルウィンドウを閉じる関数
function Ark_window_close() {
	f_log=0;
	$("#Enemy_ark_out").fadeOut("slow");

	$("#modal-overlay").fadeOut("slow");
	$("#modal-overlay").unbind() // unbind()…対象の要素にそれまで設定されていたイベントをクリアする
	$("#modal-overlay").remove(); //フェードアウト後、[#modal-overlay]をHTML(DOM)上から削除
	// コンテンツテキストの初期化
	$("#name").html("まだ攻めていません");// 攻撃者名
	$("#result").html("");// 戦果
	$("#time").html("");// 時間
	$("#count").html("");// 何戦目か
	$("#log").html('<a class="btn btn-primary" onClick="logDisplay()" data-toggle="collapse" href="#logpanel">過去ログ表示/非表示</a><div id="logpanel" class="panel panel-default"></div>');// ログ
}

//センタリングをする関数
function centeringModalSyncer(){
	// 真ん中配置：(ウィンドウの幅∨高さ - コンテンツの幅∨高さ) /2
	var pxleft = (($(window).width() - $("#Enemy_ark_out").outerWidth(true))/2);
    var pxtop = (($(window).height() - $("#Enemy_ark_out").outerHeight(true))/4);
	$("#Enemy_ark_out").css({"left": pxleft + "px",});
	$("#Enemy_ark_out").css({"top": pxtop + "px",});
}

function logDisplay(){ // ログの表示関数
	if(f_log == 0){
		var enemy_ark_data=[];
		for(var i=0; i<data_a.length; i++){ // ⇛どの添字が同じ番号かを入れる二次元配列(Enemy_arkmemo)に格納
			if(ark_enum == parseInt(data_a[i][0])){
				enemy_ark_data.push(data_a[i]);
			}
		}
		console.log(enemy_ark_data);
		$("#log").css({
			"height": 300+"px",
			"overflow":"auto",
		});
		$("#log").children("#logpanel").append('<div class="panel-heading">'+ enemy_ark_data.length +'人が戦っています</div>');// ログ
		if(enemy_ark_data.length >= 2){ // ログが0,1個以外なら表示
			for(var i=0; i<enemy_ark_data.length; i++){
				$("#log").children("#logpanel").append('<div class="panel-heading">'+ parseInt(i+1) +'人目</div>');// 何人目？
				$("#log").children("#logpanel").append('<div class="panel-body">攻撃者名：'+ enemy_ark_data[i][1] +'</div>');// 攻撃者名
				$("#log").children("#logpanel").append('<div class="panel-body">メダル数：'+ enemy_ark_data[i][2] +'</div>');
				$("#log").children("#logpanel").append('<div class="panel-body">攻撃した時間：'+ enemy_ark_data[i][3] +'</div>');
				$("#log").children("#logpanel").append('<div class="panel-body">何戦目：'+ enemy_ark_data[i][4] +'</div');
			}
		}
		console.log("f_log is "+f_log)
		f_log = 1;
	}
}

