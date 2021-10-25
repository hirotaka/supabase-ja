# 翻訳ガイド

このリポジトリではSupabeのドキュメントを日本語に翻訳する作業を行っています。Supabase公式ではなく、オープンソースライセンスに基づいて個人的に活動しています。

下記の要領で進めているので、もし、ドキュメントの翻訳に関心が在りましたら、ご協力いただけると幸いです。

## ドキュメント翻訳者向けガイド

オリジナルsupabase.ioのドキュメントサイトは[Docusaurus](https://docusaurus.io/)によって生成される静的サイトであり、英語ドキュメントが含まれています。本リポジトリはそのフォークです。`web/docs`内にあるドキュメントを日本語化しています。日本語の校正をするためにtextlintなどを含めています。日本語訳や日本語版特有の問題を見つけた場合はこのリポジトリのIssue/Pull Requestを使って報告ないし改善を提案してください。

### 環境のセットアップ

ドキュメントは`web`ディレクトリ配下にあります。Docusaurusで構築されています。リファレンスがライブラリーから自動で生成されるので、そのための手順を踏みます。

1. Git, Nodeをそれぞれ準備して、supababase-jaをフォークしてクローン
2. `cd web`
2. `npm install`で依存パッケージをインストール
3. `npm run build`でリファレンスのドキュメントを生成 
3. `npm run start`でローカルウェブサーバーが立ち上がるのを確認
4. `web/docs`配下のMarkdownファイルをテキストエディタで編集
5. ブラウザで確認

### 作業の重複を防ぐための宣言

未翻訳記事の翻訳を行いたい場合は、他の人との作業の重複を防ぐため、[こちらのIssue](https://github.com/hirotaka/supabase-ja/issues/7)で宣言をお願いします。

### スタイルの自動チェック

本プロジェクトではtextlintというスタイルチェッカを利用しており、基本的なスタイルに関する問題（全角英数を使わない、句読点の統一など）の検出が行われます。コミットの際に自動で走ります。`npm run lint:text`で手動で行うことも可能です。PRの作成の前には必ずエラーが出ないようにしてください。また、翻訳をするファイルを`.textlintignore`から削除してください。

### 全般的なこと

- 技術文書向けの[textlintルールのプリセット](https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing)に従います。
- JTFの[スタイルガイド](https://www.jtf.jp/tips/translation_quality_guidelines)に準拠します。textlintの[ルール](https://github.com/textlint-ja/textlint-rule-preset-JTF-style)がはいっておりすべてのチェックが有効になっています。
- ルールが厳しかったり、他のオープンソースプロジェクトの翻訳で採用しているスタイルと異なる事も多々あるので、随時調整してきます。何か提案がありましたら、[Discussion](https://github.com/hirotaka/supabase-ja/discussions)に投稿してください。

### 用語の統一

textlintで[text-rule-prh](https://github.com/textlint-rule/textlint-rule-prh)を使用しています。[prh.yml](web/prh.yml)に記載しています。
