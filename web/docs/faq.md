---
id: faq
title: FAQ
description: 'Supabaseに関するよくある質問'
---

### `[Firebaseの機能]`はもう構築できましたか

私たちはできる限り早く構築しています。そして、Firebaseが持っていないものも少しずつ追加しています。私たちが作った機能は以下のとおりです。

- 1分以内にデータベースを立ち上げ、管理するためのダッシュボードとUI。
- ユーザーのサインアップやデータベースへのアクセスルールを編集するためのユーザー認証。
- リアルタイムのデータベース・リスナー。
- JavaScriptライブラリーとAPI。
- 関数（みたいなもの）。これらはデータベースのストアドプロシージャとして存在し、SQL、JavaScript、Python、Javaで記述できます。

### リレーショナルデータベースで構築しているのに、どうしてFirebaseの代替になるのでしょうか

私たちがSupabaseを始めたのは、Firebaseの機能を愛しているからです。一方で、他の多くの人が経験したスケーリングの問題も個人的に経験しました。私たちがPostgresを選んだのは、信頼性が高く、驚異的なスケーラビリティを持っているからです。私たちの目標は、PostgresをFirebaseのように使いやすくして、ユーザビリティとスケーラビリティのどちらかを選択する必要がないようにすることです。また、一度Postgresを使い始めると、他のどのデータベースよりも好きになってもらえると確信しています。

### Supabaseをどうやってホストするのですか

Supabaseは、5つのオープンソースツールの集合体です（現在も増え続けています）。これらのツールの中には、Supabaseが作成したもの（[Realtime Server](https://github.com/supabase/realtime)など）があります。また、我々が間接的にサポートしているもの（[PostgREST](http://postgrest.org/en/v7.0.0/)など）もあります。そしてサードパーティのツール（[Kong](https://github.com/Kong/kong)など）があります。Supabaseで使用しているすべてのツールは、MIT、Apache 2.0、またはPostgreSQLライセンスです。Supabaseの構築には、[こちら](https://github.com/supabase/supabase/tree/master/docker)のdocker-composeスクリプトを利用いただけます。詳しい手順は[こちら](/docs/guides/hosting/overview)をご覧ください。

### `[他のデータベース]`はサポートしていますか

現時点では、PostgreSQLのみをサポートしています。Postgresから移行することはないでしょう。しかし、開発を開始してほしい場合は、[新しいデータベースに投票する](https://github.com/supabase/supabase/issues/6)ことができます。

### `[他の言語]`用のライブラリーはありますか

現在は、JavaScriptのライブラリーがあります。あなたの好きな言語のために、[新しいクライアントライブラリに投票する](https://github.com/supabase/supabase/issues/5)ことができます。
