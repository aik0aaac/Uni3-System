/**
 * SP=Google スプレッドシートの情報を入れる関数
 * @param dd SPのデータ丸ごと
   @param row SPの列数
   @return arr 抽出されたデータ群
*/
function SetSPDate(dd, row){
        var d;
        var arr=[];
        // SPデータを入れる
        d=dd;
        for(var i = 0; i < (d.feed.entry.length)/row; i++) {
                var tmp=[];
                for(var j=0; j < row; j++){
                    tmp[j]=d.feed.entry[(i*row)+j].gs$cell.$t;
                    tmp[j].toString();
                }
                arr[i]=tmp;
        }
        return arr;
}

/**
 * 小数点の計算
 * @param number 小数点にしたい数値
   @param n 切り上げしたい桁数
   @return {number} 
*/
function floatFormat( number, n ){
	var _pow = Math.pow( 10 , n ) ;
	return Math.round( number * _pow ) / _pow ;
}


/**
 * センタリングをする関数
 * @param id 表示したいモーダルウィンドウのコンテンツのID/Class(文字列で)
*/
function centeringModalSyncer(val){
	console.log("centeringModalSyncer")
	// 真ん中配置：(ウィンドウの幅∨高さ - コンテンツの幅∨高さ) /2
	var pxleft = (($(window).width() - $(val).outerWidth(true))/2);
    var pxtop = (($(window).height() - $(val).outerHeight(true))/4);
	$(val).css({"left": pxleft + "px",});
	$(val).css({"top": pxtop + "px",});
}

/**
 * モーダルウィンドウを閉じる関数
 * @param id 表示したいモーダルウィンドウのコンテンツのID/Class(文字列で)
*/
function ModalWindow_close(val) {
	Flag_Log=0;
	$(val).fadeOut("slow");

	$("#modal-overlay").fadeOut("slow");
	$("#modal-overlay").unbind() // unbind()…対象の要素にそれまで設定されていたイベントをクリアする
	$("#modal-overlay").remove(); //フェードアウト後、[#modal-overlay]をHTML(DOM)上から削除
}

//---------------------------------------------------------
//---------------------------------------------------------
// // Now Loading画面の実装
// $(function(){
//     var h=$(window).height();

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
// var getDevice = (function(){ // スマホ(sp)、タブレット(tab)、その他(other)
//     var ua = navigator.userAgent;
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
