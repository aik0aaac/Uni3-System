"use strict";
import $ from "jquery";
import { ModalInterface } from "../interface/modal_interface";
import { CommonModule } from "./common_module";
const commonModule = new CommonModule();

export class ModalModule implements ModalInterface {
  private CurrentScrollY: any;
  /**
   * モーダルウィンドウ表示関数
   * @param element 表示したいモーダルウィンドウのコンテンツのID/Class(文字列で)
   * @param functionNameStr モーダルウィンドウを閉じる関数名(文字列で)
   */
  public displayModalWindow(element: any, functionNameStr: string) {
    this.CurrentScrollY = $(window).scrollTop();
    $("body").css({
      position: "fixed",
      top: -1 * this.CurrentScrollY
    });
    $(element).css({
      display: "block"
    });
    //キーボード操作などにより、オーバーレイが多重起動するのを防止する
    $(this).blur(); //ボタンからフォーカスを外す
    if ($("#modal-overlay")[0]) return false; //新しくモーダルウィンドウを起動しない
    //オーバーレイ用のHTMLコードを、[body]内の最後に生成する
    $("body").append(
      '<div id="modal-overlay" onclick="' + functionNameStr + '()"></div>'
    );
    //[$modal-overlay]をフェードインさせる
    $("#modal-overlay").fadeIn("slow");
    $(element).fadeIn("slow");
    // センタリングをする
    let deviceType = commonModule.getDevice();
    console.log(deviceType);
    if (deviceType == "sp") {
      // スマホだったら、ウインドウを少し高めに設定
      $(element).css({
        top: 10 + "%"
      });
      let pxleft = ($(window).width() - $(element).outerWidth(true)) / 2;
      $(element).css({
        left: pxleft + "px"
      });
    } else {
      // その他だったら、ウインドウを中央に設定
      // ※真ん中配置：(ウィンドウの幅∨高さ - コンテンツの幅∨高さ) /2
      let pxtop = ($(window).height() - $(element).outerHeight(true)) / 4;
      $(element).css({
        top: pxtop + "px"
      });
      let pxleft = ($(window).width() - $(element).outerWidth(true)) / 2;
      $(element).css({
        left: pxleft + "px"
      });
    }
  }

  /**
   * モーダルウィンドウを閉じる関数
   * @param {any}element 表示したいモーダルウィンドウのコンテンツのID/Class(文字列で)
   */
  public closeModalWindow(element: any) {
    $(element).fadeOut("slow");
    $("#modal-overlay").fadeOut("slow");
    $("#modal-overlay").unbind(); // unbind()…対象の要素にそれまで設定されていたイベントをクリアする
    $("#modal-overlay").remove(); //フェードアウト後、[#modal-overlay]をHTML(DOM)上から削除
    $("body").attr({
      style: ""
    });
    $("html,body").prop({
      scrollTop: this.CurrentScrollY
    });
  }
}
