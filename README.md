## システム概要
ソーシャルゲーム『リトルノア(Battle Champs)』のギルド、『Uni3』で運用されたシステムです。  
ブラウザ上で稼働し、インターネット接続下なら問題なく動作します。  
※『リトルノア』https://littlenoah.jp  
※『Uni3』は05/22をもって解散いたしましたので、現在データの個人情報にあたる部分は匿名にしております  

## 目的
『Uni3』ではギルドバトルに力を入れており、ギルドバトル内において  
 - 希望に基づいた援軍キャラの設定   
 - 戦果報告
 
は義務となっておりました。  
※この援軍キャラ設定や戦果報告は『リトルノア』内ではなくLINEの専用グループで行っていました  
また、「月に2回以上ギルドバトルに参加していない人は除名」という規則のもと、ギルドマスター陣が毎月ギルドバトル戦歴から一人一人のチェックを行っておりました。  
このような状況下、特に前者に関して「もっと簡単に希望援軍キャラが分かるように、また戦果報告がしやすくなる方法はないか？」と考え、考案したのがこのシステムです。

## アクセス方法
下記のURLにアクセスしてください。  
https://aik0aaac.github.io/Uni3-System/

## 機能
このシステムは、以下のページから構成されております。
 - メイン画面(index.html)
 - マッチングギルド入力画面(form1.html)
 - 戦果報告入力画面(form2.html)  
 
マッチングギルド入力画面はトラブルを避けるため、ギルドマスター陣のみにアクセスURLを渡しました。  

■ メイン画面  
マッチングギルド入力画面と戦果報告入力画面からの情報を表示する画面です。  
また、事前に入力されている各ギルドメンバーの援軍希望キャラや今月のギルバト参加数、戦略フロー画像も見ることが出来ます。   

■ 戦果報告入力画面  
マッチングしたギルドの名前、マッチング日、方舟数、参加メンバーを入力します。  
この機能はギルドマスター陣のみが利用します。   

■ 戦果報告入力画面  
自分が何番の方舟を攻めたか、攻撃者名、戦績(メダル数)、攻めた日付、何戦目かを入力します。    
この機能はギルバトに参加したすべてのメンバーが利用します。   

## 売り  
■ 対戦相手名や戦果状況の可視化    
タイトル画面に対戦相手名や準備日、戦闘日までの時間を表示し、「ギルバト状況」タブにおいて、現在の戦果状況が一目でわかります。  

■ 希望する援軍キャラの可視化    
「ギルバト参加メンバー」タブにおいて、今までLINEの文章にて示されていた援軍キャラをアイコン化して可視化することにより、一目でその人につけるべき援軍キャラが分かります。    
また、各メンバーの戦果状況も同時に分かるため、(主にギルドマスター陣向けですが)各員の戦果状況が分かります。  

■ 月ごとのギルバト参加状況の可視化  
「ギルメン詳細」タブにおいて、今月のギルバト参加数が各メンバーごとに分かります。  
また、ギルドマスターの要望より、今月のギルバト参加数が0の人は背景が赤くなっており、注意喚起も出来ます。   

■ スマホに考慮した、入力画面の入力しやすさ  
特に戦果報告入力画面において、テキスト入力欄をなくし、タップのみで操作できるようにしました。  
スマホからの入力でも簡単に行えるようになっております。

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

## 連絡先
もしシステム全般において関してご不明な点、尋ねたい件などがございましたら、下記のメールアドレスかTwitterのDMにて対応いたします。  
- メールアドレス：aik0aaad@gmail.com
- Twitter：@aik0aaac

## Special Thanks!
画像提供者: セサミ街の悪夢
※以下の場面にて使用しております
 - メイン画面のタイトルバック
 - 各入力画面の背景
