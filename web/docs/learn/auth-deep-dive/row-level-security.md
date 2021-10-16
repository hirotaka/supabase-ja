---
id: auth-row-level-security
title: 'パート2：行レベルセキュリティー'
description: Supabase Auth Deep Dive Part Two - Row Level Security
---

### 概要

Supabaseダッシュボードで行レベルセキュリティーを有効にし、Postgresポリシーを記述することで、データベース・テーブルへのアクセスを制限する方法を紹介します。

### 視聴

<iframe className="w-full video-with-border" width="640" height="385" src="https://www.youtube-nocookie.com/embed/qY_iQ10IUhs" frameBorder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

### テーブルをセキュアにする

Supabaseでは、クライアント（多くの場合、Webブラウザー）から直接データにアクセスできます。そのためには、SupabaseのURLとAnonキーを以下のようにsupabase-jsに渡します。

```js
const supabase = createClient(
  'https://qwertyuiop.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
)
```

しかし、これは興味深い問題を提起しています。「もし私のanonキーがクライアントにあるならば、誰かが私のjavascriptを読んでキーを盗むことができるではないか」、答えはイエスです。ここで、Postgresのポリシーが登場します。

Postgresの「行レベルセキュリティー」ポリシーを使用して、anonキーがどのデータに対してアクセスを許可するかしないかのルールをデフォルトで設定できます。

例えば、anonキーは特定のテーブルからを許可し、書き込み、更新、削除はできないようにできます。

また、これらのルールは必要に応じて複雑にできます。例えば、anonキーは木曜日の午後4時から6時の間に挿入され、id列が偶数である行のみを削除できる、といったことです。かなり奇妙ですが、これはポリシーの威力を示しています。

例えば、リーダーボードのテーブルを作成するとします。ウェブサイトの利用者は、リーダーボードを読むことはできますが、書き込み、更新、削除はできないようします。まず、SQLでテーブルを定義し、いくつかのダミーデータを追加します。

```sql
create table leaderboard (
    name text,
    score int
);

insert into leaderboard(name, score)
values ('Paul', 100), ('Leto', 50), ('Chani', 200);
```

では、データを読むためのクライアントを設定しましょう。ここでは、実際に動作する例を示すためにreplを作成しました。[https://replit.com/@awalias/supabase-leaderboard-demo#index.js](https://replit.com/@awalias/supabase-leaderboard-demo#index.js)です。このスニペットをコピーすれば、自分のSupabaseのURLとanonキーを入力できます。

次のコードを使うことで、テーブルから自由に読みこみができて、書きこみもできることがわかります。

```js
// Writing
let { data, error } = await supabase.from('leaderboard').insert({ name: 'Bob', score: 99999 })

// Reading
let { data, error } = await supabase
  .from('leaderboard')
  .select('name, score')
  .order('score', { ascending: false })
```

それでは、アクセスを制限してみましょう。まずは、テーブルを完全に制限することから始めます。これは、SQLエディタでクエリを作成して行います。

```sql
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
```

または、Supabaseのダッシュボードから、「Auth」→「Policies」と進み、リーダーボード・テーブルにのある赤い錠をクリックして白にしてください。

![Supabaseで行レベルセキュリティーを有効にする](/img/auth-deep-dive-2.png)

読み込みや書き込みも、次のようなエラーで失敗してしまうことでしょう。

```jsx
{
  hint: null,
  details: null,
  code: '42501',
  message: 'new row violates row-level security policy for table "leaderboard"'
}
```

次に、`Authorization: Bearer`ヘッダーにanonキー（JWT）を送信してきたユーザーに対して、テーブルの読み取りを可能にするポリシーを追加する必要があります。

SQLで次のように実行します。

```sql
CREATE POLICY anon_read_leaderboard ON leaderboard
    FOR SELECT
    USING (auth.role() = 'anon');
```

`anon_read_leaderboard` here is just a name that you choose for your policy. `leaderboard` is the table name. `FOR SELECT` says that we only want this policy to apply for reads (or rather "selects" in SQL). And finally the rule itself is `auth.role() = 'anon'`.

ここでの`anon_read_leaderboard`は、ポリシーの内容に合わせて選んだ名前です。`leaderboard`はテーブル名です。`FOR SELECT`は、このポリシーを読み取り（SQLでいうところの「select」）にのみ適用させたいということです。そして最後に、ルール自体は`auth.role() = 'anon'`です。


`auth.role()`とは、Supabaseがデータベースの`auth`スキーマに注入するSQL関数`role`のことです。この関数は実際には次のようなものです。

```sql
-- リクエスト・クッキーからユーザ・ロールを取得
create or replace function auth.role() returns text as $$
  select nullif(current_setting('request.jwt.claim.role', true), '')::text;
$$ language sql stable;
```

この関数の目的は、`Authorization: Bearer`ヘッダーを介してAPIに渡されたJWTから`role`属性情報（claim）を抽出することです。

ここで使用できる他の関数は、`auth.email()`と`auth.uid()`があります。それぞれ`email`と`sub`の属性情報を取得します。

ダッシュボードを使ってポリシーを追加したい場合は、「Policy」タブの「Add Policy」をクリックして、以下のようにポリシーを作成します。

![Supabaseで読み取りのみのポリシーを追加](/img/auth-deep-dive-2-2.png)

これで、リーダーボードの読み込みはできるようになりましたが、書き込み、更新、削除はできません。これはまさに私たちが望んでいたことです。

これらの行レベルのセキュリティポリシーを回避するには、常に`service_role` APIキーを使用できることを覚えておいてください。ただし、このキーをクライアントに含めることでリークしないように細心の注意を払ってください。これは、内部の管理ツールを構築している場合や、API経由でデータを一括挿入または削除する必要がある場合に便利です。

次のガイドでは、ポリシーをユーザーアカウントと組み合わせて使用し、ユーザーごとにデータへのアクセスを制限する方法を見ていきます。[パート3：ポリシー](/docs/learn/auth-deep-dive/auth-policies)をみる。

### リソース

- JWTデバッガー：https://jwt.io/
- RESTED：https://github.com/RESTEDClient/RESTED

### 次のステップ

- [パート1：JWTs](/docs/learn/auth-deep-dive/auth-deep-dive-jwts)をみる
<!-- - Watch [Part Two: Row Level Security](/docs/learn/auth-deep-dive/auth-row-level-security) -->
- [パート3：ポリシー](/docs/learn/auth-deep-dive/auth-policies)をみる
- [パート4：GoTrue](/docs/learn/auth-deep-dive/auth-gotrue)をみる
- [パート5：Google Oauth](/docs/learn/auth-deep-dive/auth-google-oauth)をみる
- Supabaseにサインアップ：[app.supabase.io](https://app.supabase.io)
