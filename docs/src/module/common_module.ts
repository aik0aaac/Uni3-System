"use strict";
import $ from "jquery";
import { CommonInterface } from "../interface/common_interface";

export class CommonModule implements CommonInterface {
  /**
   * 小数点の計算
   * @param target 小数点にしたい数値(文字列型)
     @param digit 切り上げしたい桁数
     @return {number} 
  */
  public floatFormat(target: number, digit: number) {
    const pow = Math.pow(10, digit);
    return (target * digit) / pow;
  }

  /**
   *  ユーザーのデバイスを返す
   *  @return {string} スマホ(sp)、タブレット(tab)、その他(other)
   */
  public getDevice() {
    let ua = navigator.userAgent;
    if (
      ua.indexOf("iPhone") > 0 ||
      ua.indexOf("iPod") > 0 ||
      (ua.indexOf("Android") > 0 && ua.indexOf("Mobile") > 0)
    ) {
      return "sp";
    } else if (ua.indexOf("iPad") > 0 || ua.indexOf("Android") > 0) {
      return "tab";
    } else {
      return "other";
    }
  }

  /**
   * データ送信後画面を表示
   */
  public waiting() {
    $("#Waiting-bg").fadeIn("slow");
    $("#Waiting").fadeIn("slow");
  }
}
