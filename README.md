# MADMAX 

MADMAX：MAchine learning-baseD MAlicious domain eXhauster はユーザにとって快適な処理時間で自動的に悪性ドメイン判定を行うアプリケーションである。ユーザはFirefox-ADDONS をインストールするだけで手軽に利用することができる。

## 機能

ユーザがサイトにアクセスする際に、URL中に含まれるドメインが悪性か良性であるかを高速予測が可能な機械学習モデルELM（Extreme Learning Machine）を用いて判定を行う。
悪性ドメインであると判定された場合は警告画面を表示してユーザに対して注意喚起を行う。

機械学習を利用することにより、Denyリストを用いた検知手法では対応できない未知の脅威からユーザを守ることが可能である。

予測モデルは開発者が構築したサーバ内で動作しており、ユーザはアドオンをインストールすれば意識することなくこの高精度・高速な悪性ドメイン予測のサービスを受けることができる。この手軽さによって普及が期待でき、セキュアな世の中の実現の第一歩となる。

## アプリケーション全体図

MADMAXの構成要素としては大きく分けて、ユーザ側のFirefox-ADDONSとサーバ側の予測モデルの2つである。

![][fig_system]

[fig_system]:https://github.com/kzk-IS/MWS2020_adon/blob/master/fig_system.jpg

ユーザがブラウザ上でサイトにアクセスしようとした際、アドオンが自動で悪性サイト検知処理を行う。アドオン上のアルゴリズムとしては単純で、サイトのURLから切り出したドメインを予測サーバに入力クエリとして送信し、その予測結果を元に悪性であれば警告画面を表示し注意喚起を促す。（以前に悪性の疑いがあると判定されたとしても、アクセスが許可されているサイトはユーザホワイトリストとして保持しておき、サーバを介せずにアクセスする。） 

サーバの中ではドメインから特徴量を抽出して、予測モデルに入力として与えることにより、その出力として予測結果を得る。予測モデルは開発者によって最新のデータセットで訓練したモデルに更新することが可能であり、継続的に未知の脅威に対応することが可能である。ここでいう更新内容とは、ELMモデルで用いる学習済みパラメータのことであり、その実態であるjson形式のファイルをサーバに送信することで学習モデルの更新をすることができる。

## ELM Blocker の使い方

ユーザ側の使い方について説明する。

1. githubからアドオンをダウンロードする. 保存したいディレクトリで以下のコマンドを実行する.
```$ git clone https://github.com/kzk-IS/MWS2020_addon.git```

1. FirefoxのURLバーに`about:debugging#/runtime/this-firefox`と入力。

1. `一時的なアドオン読み込み中...`(for English ver. `Load Temporary Add-on...`)ボタンを押し、アドオンをダウンロードしたディレクトリ内の`manifest.json`を選択する。

1. `MADMAX`というアドオンが追加されていればインストール成功。


## サーバ側について

サーバの中身やその詳細については以下のリポジトリに記載している。

https://github.com/kzk-IS/MWSCUP2020_server

サーバに搭載している予測モデルの機械学習アルゴリムELM（Extreme Learning Machine）は、隠れ層をひとつ持つニューラルネットワークの一種である。開発者が収集したドメインベースの特徴量で構成されたデータセットを利用して学習された精度90.1%のELMモデルが動作している。


## 悪性ドメイン検知時の警告

MADMAXが悪性ドメインを検知した際には、ユーザのブラウザ上で以下の様な警告画面が表示される。

![][keikoku]

[keikoku]:https://github.com/kzk-IS/MWS2020_adon/blob/master/keikoku.png

Firefox(80.0.1)で正常に動作することが確認されている。


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
