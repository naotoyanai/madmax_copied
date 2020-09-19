# ELM Blocker 

MLaaS（Machine Learning as a Service） とFireFoxアドオンを融合した悪性ドメイン検知サービスである.
悪性サイト， またはその可能性が高いサイトを自動的にDeny リストやMLaaSによる機械学習を用いて解析し， ユーザがアクセスする前にその旨を通知するものである． これにより， ユーザが悪性サイトに接触するリスクを軽減することができる

## ELM Blocker 作成に至った背景

近年,　フィッシング詐欺をはじめとした悪性サイトによる被害が多発している. ユーザが悪性サイトにアクセスしてしまう前に被害を未然に防ぐことが重要であり, ドメインに着目した手法が有効であるとされいる

ドメインに関してDeny リストやAllow リストを利用した悪性サイト検知手法では防ぐことが困難な未知の脅威に対応するため, 機械学習を用いた手法が導入されている. 機械学習を利用した従来の悪性サイト判定システムは, MLaaS(Machine Learning as a Service)などのように一般公開されているものの, 一般ユーザがサイトにアクセスする都度サービスにドメインを入力して判定結果をえることは非常に手間のかかる作業である. 

そこで, ユーザがブラウザを用いてサイトにアクセスする際に, 独自の機械学習モデルを搭載した悪性サイト検知サーバを利用してドメインが良性か悪性かを自動的に行い, 悪性であればユーザに警告を表示するアドオン機能であるELM Blocker を作成した. これにより, 例えドメインが何かを知らないユーザであっても, 意識することなくMLaaSの技術的恩恵を受け, 悪性サイトの被害に遭うリスクを低減させることができる. 

## 工夫点（アピールポイント）

・一般ユーザでも手軽に使える様に, アドオンで意識することなくMLaaS を利用できる様にした.

・MLaaS内で動作する機械学習モデルは高速（1判定あたりXXX秒）・高精度（XXX%）なELM (Extreme Machine Learning)を利用しており, ユーザにとってタイムラグを極力感じさせずに良質な予測サービスを提供している.

  ->ELM を訓練させるために新たなドメインに関連するデータセットを作成した.

  ->ELM の高速を生かすため, tensorflowjs を用いて実装した.

## ELM Blocker の仕組み.

ELM Blocker は次の様な仕組みで動作する.

（ここにシステム全体像の画像を貼る）

### 判定アルゴリズム
![][algorithm]

*要変更
[algorithm]:https://github.com/akazs/MWS2019_F.SE/blob/master/algorithm.png

## MLaaS側の仕組みと機械学習モデル（サーバのリポジトリに書く？）
https://github.com/kzk-IS/MWSCUP2020_server

Deny リストでは対処しきれない未知の悪性ドメインを検知するため, 機械学習アルゴリズムを用いた.

サーバサイドのjavascriptであるNode.jsで実装している. これによって機械学習モデルへの入力として必要な複数の特徴量を非同期処理で並列化することができる.

また, 機械学習モデル本体には, tensorflowjsを用いることで高速予測を実現している（もっと詳しいモデルの実装方法も？）

（ここからELMの説明）

速度は1アクセスあたりXXX秒, 精度はXXX% である.

## 実行環境(2020/09/25現在)

- Firefox(69.0.1)

## インストール

以下に[インストールのデモアニメーション](https://github.com/akazs/MWS2019_F.SE#%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%AE%E3%83%87%E3%83%A2)があるので，説明と一緒に参考にして下さい．

1. 保存したいディレクトリ下で次のコマンドを実行する．`$ git clone https://github.com/kzk-IS/MWS2020_adon.git`

1. Firefoxを開き，URLバーに`about:debugging#/runtime/this-firefox`と入力する．

1. 画面内の`一時的なアドオン読み込み中...`(for English ver. `Load Temporary Add-on...`)ボタンを押し，先ほどcloneしたディレクトリの`background.js`を選択して，開く．

1. `ELM Blocker`というアドオンが追加されていれば，インストール成功．

### インストールのデモ
![][install_demo]

[install_demo]:https://github.com/kzk-IS/MWS2020_adon/blob/master/install_demo.gif

### 悪質なサイトである可能性がある時のデモ

我々のアルゴリズムで悪質なサイトである可能性があるドメイン名であると判断されたサイトにアクセスしようとしている時のデモである．
以下では，`https://fd7fs7fadf7fd.com`という架空のドメインではあるが，我々のアルゴリズムで悪性サイトのドメインであると判断したものへのアクセスを試みている．


## ライセンス

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)

## 製作者

- [kzk-IS](https://github.com/kzk-IS)
- [akazs](https://github.com/akazs)
- [nanana710](https://github.com/nanana710)
- [han9umeda](https://github.com/han9umeda)
- [takemr](https://github.com/takemr)

### アドバイザー

[矢内直人(大阪大学 大学院情報科学研究科 セキュリティ工学講座(藤原研究室) 助教)](http://www-infosec.ist.osaka-u.ac.jp/~yanai/)
