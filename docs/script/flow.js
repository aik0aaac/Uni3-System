if(!('localStorage' in window) && (window.localStorage === null)) {　// ローカルストレージが使えるか否か判定
    alert("対応していないブラウザです\n"
            +"ブラウザを変えて再アクセスしてください");
}
if(!(window.JSON)){
    lert("対応していないブラウザです\n"
            +"ブラウザを変えて再アクセスしてください");
}

function Confirm_enemydata(){
    // 方舟の管理用データの定義
    arks_enemy = [ // ex..arks_enemy[0][1] = 敵の名前 ({"a_name":"","result":"NULL","time":"NULL"})
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null], // 10
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null], // 20
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null], // 30
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],// 40
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null],
        ["", null, null], // 50
    ];
    console.log("arks_enemy is "+ JSON.stringify(arks_enemy));
    localStorage.setItem("S_arks_enemy", JSON.stringify(arks_enemy));

    // 入力した値の取得
    localStorage.setItem('S_name',Enemy_data.name.value);  // テキストエリアの値をLocalStorageに取得
    var enemy_name = localStorage.S_name; // LocalStorageから値を取得
    localStorage.setItem('S_year',Enemy_data.year.value);
    var time_year = localStorage.S_year;
    localStorage.setItem('S_month',Enemy_data.month.value);
    var time_month = localStorage.S_month;
    localStorage.setItem('S_day',Enemy_data.day.value);
    var time_day = localStorage.S_day;
    localStorage.setItem('S_hour',Enemy_data.hour.value);
    var time_hour = localStorage.S_hour;
    localStorage.setItem('S_minute',Enemy_data.minute.value);
    var time_minute = localStorage.S_minute;
    localStorage.setItem('S_number',Enemy_data.number.value);
    var vs_number = localStorage.S_number;

    // 入力不足のチェック
    if(enemy_name == ""||time_year  == "0"||time_month == "0"||time_day == "0"||time_hour == "0"||time_minute == ""||vs_number == "0"){
        alert("入力不足があります。");
    	return false;
    }
    // おかしな入力じゃないかチェック
    if(time_minute < 0 || time_minute > 60){
        alert("「○分」の項目に誤りがあります");
    	return false;
    }

    // 確認用ダイアログボックスのメッセージ内容
    var msg = "対戦相手のギルド名："+ enemy_name +"\n"
            +"マッチング日"+ time_year +"年"+ time_month +"月"+ time_day +"日"+ time_hour +"時"+ time_minute +"分\n"
            +"対戦数："+ vs_number + "\n\n"
            +"上記でよろしいですか？";
    // 確認用ダイアログボックスの表示 ⇒ 大丈夫なら「main.html」へ
    if( window.confirm( msg ) == true ) {
        document.location.href = "main.html";    
    }    
}