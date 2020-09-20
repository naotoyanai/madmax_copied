# ELM Blocker 

ユーザのプライバシーを保護しながら機械学習を活用して, 悪性ドメインを検知できる FireFoxアドオンである.

Webサイトにアクセスする前に自動でドメインを機械学習を用いて解析し, 悪性サイトの可能性が高いと判定した場合は警告を表示する. これによって, ユーザが悪性サイトの被害に遭う前に未然に防止することが可能である.

また, MLaaS（Machine Learning as a Service）の様な外部サービスを利用せずに, 自社の組織に機械学習モデルを搭載した簡易サーバを手軽に設置して利用することができるためプライバシーも守ることができる.

## ELM Blocker の機能

ELM Blocker はプライバシーを漏らしたくはないが, 機械学習など最先端の技術を用いて悪性サイトの被害からは守られたいという組織で広く利用することができる.

例えば、MAaaSの様な外部サービスを用いて悪性サイトを検知する場合, その組織のネットワークからアクセスされるWebサイトの傾向といった個人情報を第三者に提供・、もしくは漏洩していることになる.

そこで, 最先端の機械学習モデルを搭載したサーバを自組織内に手軽に設置し, それ組織内のどのユーザからもFirefoxのアドオンを通してMLaaSの様に活用できるシステムであるELM Blocker を開発した.


## ELM Blocker の仕組み.

ELM Blocker は次の様な仕組みで動作する.

![][systemzentaizu]

[systemzentaizu]:https://github.com/kzk-IS/MWS2020_adon/blob/master/systemzentaizu.jpg

利用する際には

### 判定アルゴリズム

*要変更（決定木みたいなんを貼る）
[algorithm]:https://github.com/kzk-IS/MWSCUP2020_adon/algorithm.png

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
