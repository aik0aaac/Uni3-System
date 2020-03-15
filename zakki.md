ここには「README.mdに載せなくてもいいけど制作者として伝えたい」こと、裏話等を書いています。

## 制作のきっかけ
『Uni3』ではギルドバトルに力を入れており、ギルドバトル内において  
 - 希望に基づいた援軍キャラの設定   
 - 戦果報告
 
は義務となっておりました。  
※この援軍キャラ設定や戦果報告は『リトルノア』内ではなくLINEの専用グループで行っていました  

また、「月に2回以上ギルドバトルに参加していない人は除名」という規則のもと、  
ギルドマスター陣が毎月ギルドバトル戦歴から一人一人のチェックを行っておりました。  
このような状況下、特に前者に関して  
「もっと簡単に希望援軍キャラが分かるように、また戦果報告がしやすくなる方法はないか？」と考えたのが制作のきっかけです。

## 売り
### 対戦相手名や戦果状況の可視化    
メイン画面において、タイトル画面に対戦相手名や準備日、戦闘日までの時間を表示し、「ギルバト状況」タブにおいて、現在の戦果状況が一目でわかります。  

### 希望する援軍キャラの可視化    
メイン画面において、「ギルバト参加メンバー」タブにおいて、今までLINEの文章にて示されていた援軍キャラをアイコン化して可視化することにより、一目でその人につけるべき援軍キャラが分かります。    
また、各メンバーの戦果状況も同時に分かるため、(主にギルドマスター陣向けですが)各員の戦果状況が分かります。  

### 月ごとのギルバト参加状況の可視化  
メイン画面において、「ギルメン詳細」タブにおいて、今月のギルバト参加数が各メンバーごとに分かります。  
また、ギルドマスターの要望より、今月のギルバト参加数が0の人は背景が赤くなっており、注意喚起も出来ます。   

### スマホに考慮した、入力画面の入力しやすさ  
特に戦果報告入力画面において、テキスト入力欄をなくし、タップのみで操作できるようにしました。  
スマホからの入力でも簡単に行えるようになっております。

## 何故Githubでシステムを公開したか？
理由は3つあります。

### 自前サーバーを立てずとも、Web上で公開出来るから
元来制作者自身にはサーバー関連の知識や機材が無く、かと言ってレンタルサーバーを立てるのはお金かかるし…と思っていました。(元々ソーシャルゲームのギルドシステムだったため、なるべく無料でシステムを構築したかったという背景があります)  
当時はGoogleHPを用いようとしましたが、レイアウトに縛りがあり微妙だなぁと感じて没に…。  
そんな中、Qiita記事に「Github使えばWebページ作れるよ」という記事を見つけ、「これだ！」と思いGithub運用をする決意をしました。  
記事制作者さん、ありがとうございます！  
⇒記事へのURL：http://qiita.com/budougumi0617/items/221bb946d1c90d6769e9  
他の理由も書きましたが、正直この理由が一番大きいです。  
((ぶっちゃけ本来のGithubの用途とは異なるとは思いますが…。))  
そして後からDropboxでも同様の事(HP公開)が出来ることを知り…システムを制作するにあたり、個人情報(とは言ってもリトルノアのユーザー名とLINEユーザー名、一部のユーザーのTwitterアカウント名位しか分かりませんが)をどうしても扱うという関係から、こちらの方がより安全に運用出来たかもですね。

### システムのバージョン管理が出来る
このシステムを構築するにあたって、長期の開発期間を要しました。  
そして、その期間中様々な人から意見を頂き、システムを構築していきました。  
この時、「前のシステムの方が良かった」という意見があった際にも対応できるようにしたかったため、バージョン管理が出来る物の方が都合が良かったのです。  
とは言え、結局そのような意見は出ませんでしたが…。

### 作成したコードを見てほしかったから
このシステムを開発した頃の私はプログラミング…超とはいかない(大学でプログラミングの講義受けてるから)までも、初心者の部類でした。  
- Javascriptを本格的に使用したことは無い(精々CODEPREPで入門編をちょっとかじった程度)
- jQuery？何それおいしいの？？
- Github？あ、何か聞いたことあるけど使ったことないや／(^o^)＼

とまぁ散々たる状況下でも、ここまでのシステムを作ることが出来たのです。  
こんな初心者のコードでも、もしかしたら参考にしてくれる人がいるかもしれない、助かる人がいるかもしれない。  
そんな切なる思いから、「コードを公開する」という考えに至ったのです。

## フィードバック
このシステムの運用終了後、ギルドメンバーに任意回答の簡単なアンケートを実施しました。  
主にシステムの使い心地や良かった所、改善点を聞きました。  
以下はそのアンケートの結果です。  
もしこのシステムや、同じようなレイアウト、環境等でシステムを運用する際の参考になれば幸いです。  
※なお、アンケートは13人答えてくれました。

### システムの総合的な使い心地について
- 5:非常に良い…4人
- 4:良い…6人
- 3:普通…1人
- 2:悪い…2人
- 1:非常に悪い…0人

### システムのレイアウト(デザイン)について
- 5:非常に良い…6人
- 4:良い…5人
- 3:普通…0人
- 2:悪い…2人
- 1:非常に悪い…0人

### 盛り込んでほしかった機能(任意解答)
- ギルバトマッチングを自動で検知し、自動で入力する機能
- システム制作者さんのイラスト閲覧機能
- 防衛で1番貢献した人に「はなまる」とかあれば 面白い
- 特に無い、十分な機能が揃っている感じ
- メンバー追加・削除・編集機能、援軍要望キャラ編集機能などシステムのマスターデータをスプレッドから直接触らなくても良いような機能
  ※システムを開発者以外が導入／運用していくには必ず必要になる機能だと思う

### システムの良かった所(任意解答)
- 月に誰が何回参加したかわかる、入力が簡単
- リトルノアを開かなくても戦況が見れるところ
- 文字入力などがなく、タップで全て済むところ
- 攻める場所の指定、次の動き方が分かり、良かった
- 入力が楽な所、戦果報告までのアクセスが簡単な所
- 対象端末を限定しないブラウザと既存の無料パッケージ、APIを利用した仕組みを採用していること
- ウォーティ絵などを使用してユーザーを喜ばせようとしているサービス精神
- タブや詳細ボタンなどを用いた【参照】画面のユーザビリティ
- 対戦した日時を入力するデザインが良い、直感的に迷うこともなく入力出来た

### システムの悪かった点/改善点(任意解答)
- システム導入でマスター陣の負担が減っていると思っていたがそうではなかった
- 攻撃時間入力画面が画面サイズと違うためスムーズに入力できなかった
- 戦果入力後の読み込みが遅いこと
- 船番の最終確認が出来ない、間違えてた
- 情報送信完了まで多少時間がかかるところ
- 敵船No、攻撃者名の選択がスクロールだと選択するのが面倒、かと言ってプルダウン以外の表示方法は思い浮かばない
- 攻撃した日のカレンダーは良いが、時計に関して疑問、ちょっと入力しにくい  
  スマホの画面をスクロールする事で微調整できないか？
- 開発未経験者の成果物としては立派なものだと思う。が、誰かに使ってもらうという目線で見れば少々不具合が多いこと（オブジェクト指向プログラミング、デザインパターン、テスト方法などをもう少し学んだ方が良いかも）
- 【登録】画面におけるUIをもう少し工夫する余地あり（たとえばリセットボタンとOKボタンを左と右に配置してタップミスを防ぐ、ボタンの縦幅をもっと広げる、敵船番からではなく自分の名前から選択させるなど）
- PCでの結果入力は問題ないのですがスマートフォンでの入力で不具合が発生する
- スマホで時間入力をする際、OKorCANCELのボタンが画面上に表示されず画面を拡大縮小等を数回繰り返す事によってボタンが表示されてしまう  
  ※この問題は自分の古いスマホだけに起こる問題の可能性もあるが、一先ず報告まで
- 現systemは、入力者をシステム側で把握出来ない為、他人が自分の結果を間違えて入力する事も可能なのではないか？  
  また何戦目項目等も間違っていてもスルーされてしまわないか？  
  データ集計、収集は正確さが命です。  
  少しでも入力間違いを回避出来る様にするシステム構築が大切と考えます。  
  この為、LOGINの際、ID PASS等を設ける事によって他人が間違って入力するミスが回避出来ます。  
  またこの事によって入力者の選択、何戦目の項目を減らす事が出来ます。  
  出来るだけ入力項目は少ない方が入力ミス軽減に繋がり精度の良いデータ収集になります。  