# ELM Blocker 




## 機能

Webサイトにアクセスする前にアドオンが自動でドメインを機械学習を用いて解析し, 悪性サイトの可能性が高いと判定した場合は警告を表示する. これによって, ユーザが悪性サイトの被害に遭う前に未然に防止することが可能である.

MLaaS（Machine Learning as a Service）の様な外部サービスを用いて悪性サイトを検知する場合, その組織のネットワークからアクセスされるWebサイトの傾向といった個人情報を第三者に提供していることになる.
そこでプライバシー確保のため, 自社の組織内に最先端の機械学習モデルを搭載した簡易サーバを手軽に設置して利用することができる様に開発されたシステムがELM Blocker である.


## システム全体図

システムの構成要素としては大きく分けて, ユーザ側のブラウザアドオンと予測モデル用簡易サーバの2つである.

利用する際には, システム管理者が自組織内の任意の場所に簡易サーバ(1GBあれば十分である.)を設置し, 自組織内のユーザの端末にFirefox ADD-ONSをインストールしてもらう.

![][fig_system]

[fig_system]:https://github.com/kzk-IS/MWS2020_adon/blob/master/systemzentaizu.jpg

ユーザがブラウザ上でサイトにアクセスしようとした際, アドオンが自動で悪性サイト検知処理を行う. アドオン上のアルゴリズムとしては単純で, サイトのURLから切り出したドメインを予測サーバに入力クエリとして送信し, その予測結果を元に悪性であれば警告画面を表示し注意喚起を促す. 以前にアクセスしたサイトや悪性の疑いがあってもアクセスが許可されているサイトはユーザホワイトリストとして保持しておき, サーバを介せずにアクセスする. 

ELM Blockerでは機械学習モデルを更新することも可能である

最新の予測モデルに更新することも簡単であり開発者が更新した機械学習モデルのパラメータのみをjson形式でアップデートすることが可能であり, モデル自体を更新することも可能である.

分けた理由は特徴量を効率的に抽出するため


## ELM Blocker の使い方

ここでは主にユーザ側の使い方について説明する. サーバ側の設定に関してはサーバの章をご覧いただきたい。

1. githubからアドオンをダウンロードする. 保存したいディレクトリで以下のコマンドを実行する.

`$ git clone https://github.com/kzk-IS/MWS2020_addon.git`

1. Firefoxを開き， URLバーに以下を入力

`about:debugging#/runtime/this-firefox`

1. `一時的なアドオン読み込み中...`(for English ver. `Load Temporary Add-on...`)ボタンを押し，先ほどcloneしたディレクトリの`manifest.json`を選択して，開く．

1. `ELM Blocker`というアドオンが追加されていれば，インストール成功．


## サーバ側の設定について
https://github.com/kzk-IS/MWSCUP2020_server

Deny リストでは対処しきれない未知の悪性ドメインを検知するため, 機械学習アルゴリズムを用いた.

サーバサイドのjavascriptであるNode.jsで実装している. これによって機械学習モデルへの入力として必要な複数の特徴量を非同期処理で並列化することができる.

また, 機械学習モデル本体には, tensorflowjsを用いることで高速予測を実現している（もっと詳しいモデルの実装方法も？）

（ここからELMの説明）

速度は1アクセスあたりXXX秒, 精度はXXX% である.

## 実行のデモ

実行環境(2020/09/25現在)
- Firefox(77.0.1)

## ライセンス

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)

## 製作者

- [kzk-IS](https://github.com/kzk-IS)
- [akazs](https://github.com/akazs)
- [nanana710](https://github.com/nanana710)
- [han9umeda](https://github.com/han9umeda)
- [takemr](https://github.com/takemr)
- [flabrei926](https://github.com/flabrei926)

### アドバイザー

[矢内直人(大阪大学 大学院情報科学研究科 セキュリティ工学講座(藤原研究室) 助教)](http://www-infosec.ist.osaka-u.ac.jp/~yanai/)
