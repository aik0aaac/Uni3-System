/**
 * 指定したGoogleスプレッドシート情報を取得する
  @param bookKey 取得するGoogleSpreadSheetのブックURLキーパラメータ
  @param sheetKey 取得するGoogleSpreadSheetのシートURLキーパラメータ
  @return arr 取得データ群
 */
async function getGoogleSpreadSheetData(key, sheetKey) {
  const getJsonTarget =
    "https://spreadsheets.google.com/feeds/cells/" +
    key + "/" + sheetKey +
    "/public/values?alt=json";

  const res = await fetch(getJsonTarget);
  if (res.status === 200) {
    return res.json();
  } else {
    errorGoogleSpreadSheet();
    return null;
  }
}

/**
 * Google スプレッドシートの情報を入れる関数
 * @param dd GoogleSpreadSheetのデータ丸ごと
   @param row GoogleSpreadSheetの列数
   @return arr 抽出されたデータ群
*/
function SetGoogleSpreadSheetDate(dd, row) {
  let arr = [];
  // GoogleSpreadSheetデータを入れる
  d = dd;
  for (let i = 0; i < (d.feed.entry.length) / row; i++) {
    let tmp = [];
    for (let j = 0; j < row; j++) {
      tmp[j] = d.feed.entry[(i * row) + j].gs$cell.$t;
      tmp[j].toString();
    }
    arr[i] = tmp;
  }
  return arr;
}

/**
 * GoogleSpreadSheet取得にエラーが出た際の処理
 */
function errorGoogleSpreadSheet() {
  $("body").html('<div class="jumbotron">' +
    '<h1>Error!</h1>' +
    '情報が取得できませんでした。<br>' +
    '<span class="reload glyphicon glyphicon-repeat" onClick="reload()"></span>' +
    '</div>');
}

/**
 * 小数点の計算
 * @param number 小数点にしたい数値
   @param n 切り上げしたい桁数
   @return {number} 
*/
function floatFormat(number, n) {
  let _pow = Math.pow(10, n);
  return parseInt(number * _pow) / _pow;
}

/**
 *  ユーザーのデバイスを返す
 *  @return     スマホ(sp)、タブレット(tab)、その他(other)
 */
function getDevice() {
  let ua = navigator.userAgent;
  if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
    return 'sp';
  } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
    return 'tab';
  } else {
    return 'other';
  }
}

/**
 * モーダルウィンドウ表示関数
 * @param val 表示したいモーダルウィンドウのコンテンツのID/Class(文字列で)
 * @param func モーダルウィンドウを閉じる関数名(文字列で)
 */
let CurrentScrollY;

function displayModalWindow(val, func) {
  CurrentScrollY = $(window).scrollTop();
  $("body").css({
    "position": "fixed",
    "top": (-1 * CurrentScrollY)
  });
  $(val).css({
    "display": "block"
  });
  //キーボード操作などにより、オーバーレイが多重起動するのを防止する
  $(this).blur(); //ボタンからフォーカスを外す
  if ($("#modal-overlay")[0]) return false; //新しくモーダルウィンドウを起動しない
  //オーバーレイ用のHTMLコードを、[body]内の最後に生成する
  $("body").append('<div id="modal-overlay" onclick="' + func + '()"></div>');
  //[$modal-overlay]をフェードインさせる
  $("#modal-overlay").fadeIn("slow");
  $(val).fadeIn("slow");
  // センタリングをする
  let jud = getDevice();
  console.log(jud);
  if (jud == 'sp') {
    // スマホだったら、ウインドウを少し高めに設定
    $(val).css({
      "top": 10 + "%",
    });
    let pxleft = (($(window).width() - $(val).outerWidth(true)) / 2);
    $(val).css({
      "left": pxleft + "px",
    });
  } else {
    // その他だったら、ウインドウを中央に設定
    // ※真ん中配置：(ウィンドウの幅∨高さ - コンテンツの幅∨高さ) /2
    let pxtop = (($(window).height() - $(val).outerHeight(true)) / 4);
    $(val).css({
      "top": pxtop + "px",
    });
    let pxleft = (($(window).width() - $(val).outerWidth(true)) / 2);
    $(val).css({
      "left": pxleft + "px",
    });
  }

}

/**
 * モーダルウィンドウを閉じる関数
 * @param val 表示したいモーダルウィンドウのコンテンツのID/Class(文字列で)
 */
function ModalWindow_close(val) {
  $(val).fadeOut("slow");
  $("#modal-overlay").fadeOut("slow");
  $("#modal-overlay").unbind() // unbind()…対象の要素にそれまで設定されていたイベントをクリアする
  $("#modal-overlay").remove(); //フェードアウト後、[#modal-overlay]をHTML(DOM)上から削除
  $("body").attr({
    style: ''
  });
  $("html,body").prop({
    scrollTop: CurrentScrollY
  });
}

/**
 * データ送信後画面を表示
 */
function Waiting() {
  $("#Waiting-bg").fadeIn("slow");
  $("#Waiting").fadeIn("slow");
}

//---------------------------------------------------------
//---------------------------------------------------------
// // Now Loading画面の実装
// $(function(){
//     let h=$(window).height();

//     $('#my-body').css('display', 'none');
//     $('#loader-bg, #loader').height(h).css('display', 'block');
// });
// $(window).on('load', function(){
//     $('#my-body').css('display', 'block');
//     $('#loader-bg').delay(900).fadeOut(800);
//     $('#loader').delay(600).fadeOut(300);
// });
// $(function(){
//     setTimeout('loadStop()', 5000);
// });
// function loadStop(){
//     $('#my-body').css('display', 'block');
//     $('#loader-bg').delay(900).fadeOut(800);
//     $('#loader').delay(600).fadeOut(300);
// }

// // スマホの場合-------------------------------------------
// let getDevice = (function(){ // スマホ(sp)、タブレット(tab)、その他(other)
//     let ua = navigator.userAgent;
//     if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0){
//         return 'sp';
//     }else if(ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0){
//         return 'tab';
//     }else{
//         return 'other';
//     }
// })();
// if(getDevice == 'sp' || getDevice == 'tab'){
// 	console.log("aaaaaa")
// }

// function reload() {　// リロード用の関数
//   location.reload();
// };
