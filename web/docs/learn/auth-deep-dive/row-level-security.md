---
id: auth-row-level-security
title: 'パート2：行単位セキュリティー'
description: Supabase Auth詳細：パート2 - 行単位セキュリティー
---

### 概要

Supabaseダッシュボードで行単位セキュリティーを有効にし、Postgresポリシーを記述することで、データベース・テーブルへのアクセスを制限する方法を紹介します。

### 視聴

<iframe className="w-full video-with-border" width="640" height="385" src="https://www.youtube-nocookie.com/embed/qY_iQ10IUhs" frameBorder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

### テーブルをセキュアにする

Supabaseでは、クライアント（多くの場合、Webブラウザー）から直接データにアクセスできます。そのためには、SupabaseのURLと匿名キー（Anon key）を以下のように`supabase-js`に渡します。

```js
const supabase = createClient(
  'https://qwertyuiop.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
)
```

しかし、これは興味深い問題を提起しています。「もし私の匿名キーがクライアントにあるならば、誰かが私のjavascriptを読んでキーを盗むことができるではないか」、答えはイエスです。ここで、Postgresのポリシーが登場します。

Postgresの「行単位セキュリティー」ポリシーを使用して、匿名キーがどのデータに対してアクセスを許可するかしないかのルールをデフォルトで設定できます。

例えば、匿名キーは特定のテーブルからの読み込みを許可し、書き込み、更新、削除はできないようにできます。

また、これらのルールは必要に応じて複雑にできます。例えば、匿名キーは木曜日の午後4時から6時の間に挿入され、id列が偶数である行のみを削除できる、といったことです。かなり奇妙ですが、これはポリシーの威力を示しています。

例えば、リーダーボードのテーブルを作成するとします。ウェブサイトのユーザーは、リーダーボードを読むことはできますが、書き込み、更新、削除はできないようします。まず、SQLでテーブルを定義し、いくつかのダミーデータを追加します。

```sql
create table leaderboard (
    name text,
    score int
);

insert into leaderboard(name, score)
values ('Paul', 100), ('Leto', 50), ('Chani', 200);
```

では、データを読むためのクライアントを設定しましょう。ここでは、実際に動作する例を示すためにreplを作成しました。[https://replit.com/@awalias/supabase-leaderboard-demo#index.js](https://replit.com/@awalias/supabase-leaderboard-demo#index.js)にアクセスしてください。このスニペットをコピーすれば、匿名キーを入力して、自分のSupabaseのURLと繋ぐことできます。

次のコードを使うことで、テーブルから自由に読みこみができて、書きこみもできることがわかります。

```js
// 書き込み
let { data, error } = await supabase.from('leaderboard').insert({ name: 'Bob', score: 99999 })

// 読み込み
let { data, error } = await supabase
  .from('leaderboard')
  .select('name, score')
  .order('score', { ascending: false })
```

それでは、アクセスを制限してみましょう。まずは、テーブルを完全に制限することから始めます。これは、SQLエディターでクエリを作成して行います。

```sql
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
```

または、Supabaseのダッシュボードから、「Auth」→「Policies」と進み、リーダーボード・テーブルにある赤い錠をクリックして白にしてください。

![Supabaseで行単位セキュリティーを有効にする](/img/auth-deep-dive-2.png)

読み込みや書き込みも、次のようなエラーで失敗してしまうことでしょう。

```jsx
{
  hint: null,
  details: null,
  code: '42501',
  message: 'new row violates row-level security policy for table "leaderboard"'
}
```

次に、`Authorization: Bearer`ヘッダーに匿名キー（JWT）を送信してきたユーザーに対して、テーブルの読み取りを可能にするポリシーを追加する必要があります。

SQLで次のように実行します。

```sql
CREATE POLICY anon_read_leaderboard ON leaderboard
    FOR SELECT
    TO 'anon'
    USING (true);
```

ここでの`anon_read_leaderboard`は、ポリシーの内容に合わせて選んだ名前です。`leaderboard`はテーブル名です。`FOR SELECT`は、このポリシーを読み取り（SQLでいうところの「select」）にのみ適用させたいということです。`TO`は、このポリシーがPostgresの`anon`ロールにのみ適用されることを意味します。そして最後に、このルール自体は`true'` で、これは`anon`ユーザーの`selects`を許可することを意味します。

ダッシュボードを使ってポリシーを追加したい場合は、「Policy」タブの「Add Policy」をクリックして、以下のようにポリシーを作成します。

![Supabaseで読み取りのみのポリシーを追加](/img/auth-deep-dive-2-2.png)

これで、リーダーボードの読み込みはできるようになりましたが、書き込み、更新、削除はできません。これはまさに私たちが望んでいたことです。

これらの行単位セキュリティポリシーを回避するには、常に`service_role` APIキーを使用できることを覚えておいてください。ただし、このキーをクライアントに含めて漏洩しないよう細心の注意を払ってください。これは、内部の管理ツールを構築している場合や、API経由でデータを一括挿入または削除する必要がある場合に便利です。

次のガイドでは、ポリシーをユーザーアカウントと組み合わせて使用します。ユーザーごとにデータへのアクセスを制限する方法を「[パート3：ポリシー](/docs/learn/auth-deep-dive/auth-policies)」で見ていきましょう。

### リソース

- JWTデバッガー：https://jwt.io/
- RESTED：https://github.com/RESTEDClient/RESTED

### 次のステップ

- [パート1：JWT](/docs/learn/auth-deep-dive/auth-deep-dive-jwts)をみる
<!-- - Watch [Part Two: Row Level Security](/docs/learn/auth-deep-dive/auth-row-level-security) -->
- [パート3：ポリシー](/docs/learn/auth-deep-dive/auth-policies)をみる
- [パート4：GoTrue](/docs/learn/auth-deep-dive/auth-gotrue)をみる
- [パート5：Google Oauth](/docs/learn/auth-deep-dive/auth-google-oauth)をみる
- Supabaseにサインアップ：[app.supabase.com](https://app.supabase.com)
