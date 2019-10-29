"use strict";
import $ from "jquery";
import { Uni3SystemDataInterface } from "../interface/uni3SystemData_interface";

export class Uni3SystemDataModule implements Uni3SystemDataInterface {
  /**
   * 指定したGoogleスプレッドシート情報を取得する
    @param {string}bookKey 取得するGoogleSpreadSheetのブックURLキーパラメータ
    @param {string}sheetKey 取得するGoogleSpreadSheetのシートURLキーパラメータ
    @return res 取得データ群(なければnull)
   */
  public async getData(bookKey: string, sheetKey: string) {
    const getJsonTarget = `https://spreadsheets.google.com/feeds/cells/${bookKey.valueOf()}/${sheetKey.valueOf()}/public/values?alt=json`;
    console.log("getJsonTarget is:");
    console.log(getJsonTarget);

    const res = await fetch(getJsonTarget);
    if (res.status === 200) {
      return res.json();
    } else {
      this.errorHtmlDisplay();
      return null;
    }
  }

  /**
   * Googleスプレッドシートの情報を整形する関数
   * @param {any}googleSpreadSheetData GoogleSpreadSheetのデータ丸ごと
     @param {number}row GoogleSpreadSheetの列数
     @return result 整形されたデータ群
  */
  public setData(googleSpreadSheetData: any, row: number) {
    let result = [];
    // GoogleSpreadSheetデータを入れる
    for (let i = 0; i < googleSpreadSheetData.feed.entry.length / row; i++) {
      let tmp = [];
      for (let j = 0; j < row; j++) {
        tmp[j] = googleSpreadSheetData.feed.entry[i * row + j].gs$cell.$t;
        tmp[j].toString();
      }
      result[i] = tmp;
    }
    return result;
  }

  /**
   * GoogleSpreadSheet取得にエラーが出た際の処理
   * HTMLのBody要素に直接内容を書き込む
   */
  private errorHtmlDisplay() {
    $("body").html(
      '<div class="jumbotron">' +
        "<h1>エラーが発生しました!</h1>" +
        "情報が取得できませんでした。<br>" +
        '<span class="reload glyphicon glyphicon-repeat" onClick="reload()"></span>' +
        "</div>"
    );
  }
}
