/* **************************
 Moduleの読み込み
************************** */
import {
  ModalModule
} from "./module/modal_module";
const modalModule = new ModalModule();

import {
  CommonModule
} from "./module/common_module";
const commonModule = new CommonModule();

import {
  Uni3SystemDataModule
} from "./module/uni3SystemData_module";

//-------------------------------------------------------------------------------
// 事前準備
//-------------------------------------------------------------------------------
$(function () {
  $('#Date').bootstrapMaterialDatePicker({
    format: 'YYYY/MM/DD  HH:mm'
  });
});

//----------------------------------------------------------
// SP=Google スプレッドシートの取得
//----------------------------------------------------------
var Data_Member; // ギルメン詳細
const uni3SystemDataModule = new Uni3SystemDataModule();

async function setup() {
  // 「ギルメン詳細」を取得
  await uni3SystemDataModule.getData("1Gb1srFP5BbDeFN0mocKpwzHp7ww10FKoB3FZI6rQtUg", "od6")
    .then(data => {
      if (data !== null) {
        Data_Member = uni3SystemDataModule.setData(data, 16);
      }
    });

  $("#loader-bg").fadeOut("slow");
  Form1_SetUp();
}
setup();

//-------------------------------------------------------------------------------
// 本体
//-------------------------------------------------------------------------------
var EnemyName; // 敵ギルドの名前を入れる
var Date; // マッチング日を入れる
var VsNumber; // 対戦数を入れる
var Member = []; // 参加メンバーを入れる
var Progress_Value = 0; // 進捗状況の度合い
var Progress_Flag = [0, 0, 0, 0]; // [#Name, #Date, #Number, #Member]のフラグ
var Increment = 100 / Progress_Flag.length; // 1項目で増えるプログレスバーの量

function Form1_SetUp() {
  for (var i = 1; i < Data_Member.length; i++) {
    $('div>#Member').append('<input type="checkbox" name="Member" id="' + Data_Member[i][3] + '" value="' + i + '">');
    $('div>#Member').append('<label for="' + Data_Member[i][3] + '">' + Data_Member[i][3] +
      '<br><span style="color: #bbbbbb">' + Data_Member[i][5] + '</span></label>');
  }
  // 進捗バーの実装-----------------------------------------------
  var p_dnum = 0; // #Dateの際にカウントアップで使う
  // progressバーの実装---------------------------------
  $('#Name').focusout(function () {
    if ($('[name=Name]').val() != "") {
      if (Progress_Flag[0] == 0) {
        Progress_Value += 25;
        Progress_Flag[0] = 1;
      }
      $(".progress-bar").css({
        "width": +Progress_Value + "%"
      });
    } else {
      if (Progress_Flag[0] == 1) {
        Progress_Value -= 25;
        Progress_Flag[0] = 0;
      }
      $(".progress-bar").css({
        "width": +Progress_Value + "%"
      });
    }
  });
  $('.dtp-btn-ok').click(function () {
    p_dnum += 1;
    if ($('[name=Date]').val() != "" && p_dnum <= 3) {
      if (Progress_Flag[1] == 0) {
        Progress_Value += 25;
        Progress_Flag[1] = 1;
        p_dnum = 0;
      }
      $(".progress-bar").css({
        "width": +Progress_Value + "%"
      });
    } else {
      if (Progress_Flag[1] == 1) {
        Progress_Value -= 25;
        Progress_Flag[1] = 0;
      }
      $(".progress-bar").css({
        "width": +Progress_Value + "%"
      });
    }
  });
  $('#Number').click(function () {
    console.log(parseInt($('[name=Number]').val()))
    if ($('[name=Number]').val() != "") {
      if (Progress_Flag[2] == 0) {
        Progress_Value += 25;
        Progress_Flag[2] = 1;
      }
    }
    if ($('#Member input:checked').length == parseInt($('[name=Number]').val())) {
      if (Progress_Flag[2] == 0) {
        Progress_Value += 25;
        Progress_Flag[3] = 1;
      }
      if (Progress_Flag[3] == 0) {
        Progress_Value += 25;
        Progress_Flag[3] = 1;
      }
    }
    $(".progress-bar").css({
      "width": +Progress_Value + "%"
    });
  });
  $('#Member').click(function () {
    console.log($('#Member input:checked').length)
    if ($('#Member input:checked').length == parseInt($('#Number input:checked').val())) {
      if (Progress_Flag[3] == 0) {
        Progress_Value += 25;
        Progress_Flag[3] = 1;
      }
    } else {
      if (Progress_Flag[3] == 1) {
        Progress_Value -= 25;
        Progress_Flag[3] = 0;
      }
    }
    $(".progress-bar").css({
      "width": +Progress_Value + "%"
    });
  });

  // 現在何人選択しているか表示
  $('#Member').click(function () {
    $("#DisplayMemberLength").html($('#Member input:checked').length + "人選択中")
  });
}

//---------------------------
// プログレスバーの初期化
//---------------------------
function Reset() {
  $(".progress-bar").css({
    "width": "0%"
  });
  Progress_Flag[0] = 0;
  Progress_Flag[1] = 0;
  Progress_Flag[2] = 0;
  Progress_Flag[3] = 0;
  Progress_Value = 0;
}

//-------------------------------------------------------------------------------
// 確認画面
//-------------------------------------------------------------------------------
function ConfirmEnemyData() {
  // 入力した値の取得
  EnemyName = $('[name=Name]').val();
  Date = $('[name=Date]').val();
  VsNumber = $('#Number input:checked').val();
  $('#Member>input:checked').map(function () { // チェックボックスの値を取得
    var val = $(this).attr("id");
    Member.push(val);
  });

  displayModalWindow("#Confirm", "ConfirmWindow_close")
  // 確認用メッセージ内容-------------------------------------------------------------
  // 入力不足のチェック
  if (EnemyName == "" || Date == "" || VsNumber == "0" || Member.length != parseInt(VsNumber)) {
    $("#Confirm").append("入力不足があります。");
  } else {
    $("#Confirm>div>table>tbody").append('<tr><td class="col-sm-5">対戦相手のギルド名：</td>' +
      '<td class="col-sm-7">' + EnemyName + '</td><tr>');
    $("#Confirm>div>table>tbody").append('<tr><td class="col-sm-5">マッチング日</td><td class="col-sm-7">' +
      Date + '</td><tr>');
    $("#Confirm>div>table>tbody").append('<tr><td class="col-sm-5">対戦数：</td><td class="col-sm-7">' +
      VsNumber + '</td><tr>');
    $("#Confirm>div>table>tbody").append('<tr><td class="col-sm-5">参加メンバー：</td><' +
      'td class="col-sm-7"></td></tr>');
    for (var i = 0; i < Member.length; i++) {
      $("#Confirm").append(Member[i] + ' ');
    }
    $("#Confirm").append('<p>上記でよろしいですか？</p>');
    $("#Confirm").append('<input value="OK!" ' +
      'class="btn btn-primary my-btn2" onClick="SendData()">');
  }
}

//---------------------------
// FORMデータを送信する
//---------------------------
function SendData() {
  commonModule.waiting();
  document.getElementById("EnemyData").submit();
  ConfirmWindow_close();
}

//---------------------------
// モーダルウィンドウを閉じる関数
//---------------------------
function ConfirmWindow_close() {
  EnemyName = "";
  Date = "";
  VsNumber = "0";
  Member = [];
  ModalWindow_close("#Confirm");
  $("#Confirm").html('<button type="button" class="close" aria-label="Close">' +
    '<a id="Eao-close" onClick="ConfirmWindow_close()">&times;</a></button>');
  $("#Confirm").append('<div class="table-responsive"><table class="table"><tbody></tbody></table></div>');
}


//---------------------------
// その項目の全てのチェックボックスのチェックをON
//---------------------------
function AllChecked() {
  $('input[name="Member"]').prop('checked', true);
}
//---------------------------
// その項目の全てのチェックボックスのチェックをOFF
//---------------------------
function ResetAllChecked() {
  $('input[name="Member"]').prop('checked', false);
}
