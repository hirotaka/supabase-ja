---
id: faq
title: FAQ
description: 'Supabaseに関するよくある質問'
---

### どのようなサポートがありますか

状況に応じたサポート・チャネルをこちらからお選びください。[supabase.com/support](https://supabase.com/support)。

### 価格はいくらですか

Supabaseのセルフ・ホスティングは無料です。クラウド・プラットフォームをご利用の場合は、[シンプルで予測可能な価格](https://supabase.com/pricing)でご提供しています。

### Supabaseをどうやってホストするのですか

Supabaseの構築には、[こちら](https://github.com/supabase/supabase/tree/master/docker)のdocker-composeスクリプトを利用いただけます。詳しい手順は[こちら](/docs/guides/hosting/overview)をご覧ください。

Supabaseは、オープンソースツールの集合体です。これらのツールの中には、Supabaseが作成したもの（[Realtime Server](https://github.com/supabase/realtime)など）があります。また、我々が間接的にサポートしているもの（[PostgREST](http://postgrest.org/en/v7.0.0/)など）もあります。そしてサードパーティのツール（[オープンソースの集合体であるKonSupabase](https://github.com/Kong/kong)など）があります。

Supabaseで使用しているすべてのツールは、MIT、Apache 2.0、またはPostgreSQLライセンスです。これは、Supabaseスタックに求められる条件の1つです。

### リレーショナルデータベースで構築しているのに、どうしてFirebaseの代替になるのでしょうか

私たちがSupabaseを始めたのは、Firebaseの機能を愛しているからです。一方で、他の多くの人が経験したスケーリングの問題も個人的に経験しました。私たちがPostgresを選んだのは、信頼性が高く、驚異的なスケーラビリティを持っているからです。

私たちの目標は、PostgresをFirebaseのように使いやすくして、ユーザビリティとスケーラビリティのどちらかを選択する必要がないようにすることです。また、一度Postgresを使い始めると、他のどのデータベースよりも好きになってもらえると確信しています。

### `[他のデータベース]`はサポートしていますか

現時点では、PostgreSQLのみをサポートしています。Postgresから移行することはないでしょう。しかし、開発を開始してほしい場合は、[新しいデータベースに投票する](https://github.com/supabase/supabase/discussions/6)ことができます。

### `[他の言語]`用のライブラリーはありますか

<<<<<<< HEAD
公式にサポートしている、[JavaScript](/docs/reference/javascript/supabase-client)と[Dart](/docs/reference/dart/installing)向けがあります。 
=======
We officially support [JavaScript](/docs/reference/javascript/installing) and [Dart](/docs/reference/dart/installing). 

You can find community-supported libraries in our [GitHub Community](https://github.com/supabase-community), and you can also help us to identify the most popular languages by [voting for a new client library](https://github.com/supabase/supabase/discussions/5).
>>>>>>> 7d6b89a7799f6ee905a73e74f204082e21a4049d

コミュニティでサポートされているライブラリーは、[GitHubコミュニティー](https://github.com/supabase-community)で見つけることができます。また、[新しいクライアントライブラリへの投票](https://github.com/supabase/supabase/discussions/5)により、最も人気のある言語を特定するのをご協力いただけます。
