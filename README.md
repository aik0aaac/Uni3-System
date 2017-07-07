# Uni3システム

## システム概要
ソーシャルゲーム『リトルノア(Battle Champs)』のギルド、『Uni3』で運用されたシステムです。  
ブラウザ上で稼働し、インターネット接続下なら問題なく動作します。  
※ソーシャルゲーム『リトルノア』の公式サイト：https://littlenoah.jp  
※『Uni3』は05/22をもって解散いたしましたので、現在データの個人情報にあたる部分は匿名にしております  

## アクセス方法
下記のURLにアクセスしてください。  
https://aik0aaac.github.io/Uni3-System/

## 機能
このシステムは、以下のページから構成されております。
 - メイン画面(index.html)
 - マッチングギルド入力画面(form1.html) ※以下form1と表記
 - 戦果報告入力画面(form2.html) ※以下form2と表記
 
form1はトラブルを避けるため、特定の権限者にのみURLを渡しました。  
このため、form1はメイン画面からは遷移出来ないようになっております。

### メイン画面(index.html)  
form1とform2からの情報を表示する画面です。  
また、DBにある各ギルドメンバーの援軍希望キャラや今月のギルドバトル参加数を見ることが出来ます。  
※「戦略フロー」画像は実際にギルド内で使用したものであるため、モザイクをかけています

### 戦果報告入力画面(form1.html)  
マッチングしたギルドの名前、マッチング日、方舟数、参加メンバーを入力します。  
この機能は特定の権限者のみが利用します。   

### 戦果報告入力画面(form2.html) 
自分が何番の方舟を攻めたか、攻撃者名、戦績(メダル数)、攻めた日付、何戦目かを入力します。    
この機能はギルドバトルに参加したすべてのメンバーが利用します。   

## 使用した言語、ライブラリ等
- HTML  
- CSS  
- Javascript  
  - jQuery  
  - Bootstrap  
  - Bootstrap-material-picker  
  - Mr.StickyTableHeaders  
- GAS(Google Apps Script)
- Google Spread Sheet※DBの代わりとして用いました  

## ファイル構成について
### docsフォルダ
このシステムの本体部分です。

### descriptionフォルダ
docsフォルダ内の説明等を詳しく説明した簡易的なHTMLファイルです。  
中にある「index.html」から読むことが出来ます。  
また、「このシステムをリトルノアのギルドが使用する場合」の使用方法も記載しております。  

### zakki.md
README.mdに載せなくてもいいけど制作者として伝えたいことを書いています。  
所謂「雑記」です。

## ライセンス
### 基本方針
基本は「自作」と偽らず出典等を付けてもらえればオールOKです。  
このリポジトリを外部サイトで紹介することも構いません。  
※この文言は営利/非営利目的関わらず、どちらにも適用されます。  

### 許可範囲(OKなこと)
このリポジトリをを元に一部を改変し、他の用途等で使用すること。  
※ただし出典等の表記に「参照元」としてここのURLを掲載してください  

### 無許可範囲(NGなこと)
このリポジトリを「自作」と偽り、公表・配布・もしくはそれに該当すると十分に判断できる行為  

## 作者
[Aik(アイク)](https://github.com/aik0aaac)  

## 連絡先
もしシステム全般において関してご不明な点、尋ねたい件などがございましたら、  
下記のメールアドレスかTwitterのDMにて対応いたします。  
- メールアドレス：aik0aaad@gmail.com
- Twitter：@aik0aaac

ご指摘やご意見等でも構いませんので、お気軽にどうぞ！ 

## Special Thanks!
画像提供者: 「セサミ街の悪夢」さん  

※以下の場面にて使用しております
 - メイン画面のタイトルバック
 - 各入力画面の背景
