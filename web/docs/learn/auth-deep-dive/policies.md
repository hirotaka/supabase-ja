---
id: auth-policies
title: 'パート3：ポリシー'
description: 'Supabase Auth詳細：パート3 - ユーザー・ベースのアクセスポリシー'
---

### 概要

テーブルへのアクセスを認証されたユーザーに限定する方法、行単位ポリシー、メールアドレスのドメイン・ベースのアクセスについて解説します。

### 視聴

<iframe className="w-full video-with-border" width="640" height="385" src="https://www.youtube-nocookie.com/embed/0LvCOlELs5U" frameBorder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""/>

### ユーザー・ベースの行単位ポリシー

JWTロールに基づいてテーブルへのアクセスを制限する方法がわかったので、これをユーザー管理と組み合わせて、ユーザーがデータベースに読み書きできるデータをより詳細に制御ができます。

ここでは、Supabaseでのユーザー・セッションの仕組みを説明し、その後、ユーザー中心のポリシーの作成に移ります。

例えば、あるユーザーが初めて私たちのサービスに登録するとしましょう。一般的には、supabase-jsで以下のようなメソッドを実行します。

```jsx
// 完全なapiリファレンスはを参照するには次のURLを参照してください。/docs/reference/javascript/auth-signup
supabase.auth.signUp({ email, password })
```

デフォルトでは、ユーザーに確認メールが送信されます。ユーザーがメール内のリンクをクリックすると、サイト（ダッシュボードのAuth → SettingsでサイトのURLを指定する必要があります。デフォルトでは、http://localhost:3000 となっています）にリダイレクトされます。クエリー・パラメーターを含む完全なURLは以下のようになります。

```
http://localhost:3000/#access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjE2NDI5MDY0LCJzdWIiOiI1YTQzNjVlNy03YzdkLTRlYWYtYThlZS05ZWM5NDMyOTE3Y2EiLCJlbWFpbCI6ImFudEBzdXBhYmFzZS5pbyIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIn0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCJ9.4IFzn4eymqUNYYo2AHLxNRL8m08G93Qcg3_fblGqDjo&expires_in=3600&refresh_token=RuioJv2eLV05lgH5AlJwTw&token_type=bearer&type=signup
```

これを読みやすいように分割してみましょう。

```jsx
// ベースのurl - app.supabase.ioダッシュボードのAuth Settingsで設定したものになります
http://localhost:3000/

// クエリ・パラメーターで「?」の代わりに「#（フラグメント）」を使用していることに注意
// ユーザによって発行されたアクセス・トークンはJWT
#access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjE2NDI5MDY0LCJzdWIiOiI1YTQzNjVlNy03YzdkLTRlYWYtYThlZS05ZWM5NDMyOTE3Y2EiLCJlbWFpbCI6ImFudEBzdXBhYmFzZS5pbyIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIn0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCJ9.4IFzn4eymqUNYYo2AHLxNRL8m08G93Qcg3_fblGqDjo

// デフォルトの有効期間は60分
&expires_in=3600

// 60分の期限がきれる前に新しいaccess_token取得に使用
&refresh_token=RuioJv2eLV05lgH5AlJwTw

// APIへリクエストする際のヘッダーにAuthorization: Bearerを使用
&token_type=bearer

// トークンを何によって発行されたか。サインアップ、ログイン、パスワード・リセットまたはマジック・リンクなのか。
&type=signup
```

アクセストークンを[https://jwt.io](https://jwt.io)に入れると、次のようにデコードされます。

```jsx
{
  "aud": "authenticated",
  "exp": 1616429064,
  "sub": "5a4365e7-7c7d-4eaf-a8ee-9ec9432917ca",
  "email": "ant@supabase.io",
  "app_metadata": {
    "provider": "email"
  },
  "user_metadata": {},
  "role": "authenticated"
}
```

`authenticated`ロールはSupabaseでは特別なもので、APIに認証されたユーザーであることを伝え、要求されたリソース（テーブルや行）に追加されたポリシーとJWTを比較することを伝えます。

`sub`属性情報（claim）は、デフォルトでは`auth.users`テーブル内のユーザーの一意の識別子です。そのため、通常、JWTをデータベース内の行と照合するために使用されます。
（補足として、認証APIが正しく機能させるのに`auth`スキーマに依存しています。Supabaseデータベース内で`auth`スキーマを何らかの方法で変更することは一般的に推奨されません）。

興味のある方は、SQLエディタでクエリを実行してみてください。

```sql
select * from auth.users;
```
<!-- textlint-disable ja-technical-writing/no-unmatched-pair -->
もしsupabase-jsがあなたのサイト（この場合は、http://localhost:3000）にロードされていれば、自動的にURLからアクセス・トークンを取り出し、セッションを開始します。有効なセッションがあるかどうかは、[session()](/docs/reference/javascript/auth-session)メソッドで確認できます。
<!-- textlint-enable ja-technical-writing/no-unmatched-pair -->

```jsx
console.log(supabase.auth.session())
```

`supabase.auth.signIn({ email, password})`のようなメソッドを使ってユーザーにJWTを発行できるようになったので、今度はそのユーザーに固有のリソースを取得します。では、いくつか作ってみましょう。SQLエディターで実行してみましょう。

```sql
create table my_scores (
    name text,
    score int,
    user_id uuid not null
);

ALTER TABLE my_scores ENABLE ROW LEVEL SECURITY;

insert into my_scores(name, score, user_id)
values
  ('Paul', 100, '5a4365e7-7c7d-4eaf-a8ee-9ec9432917ca'),
  ('Paul', 200, '5a4365e7-7c7d-4eaf-a8ee-9ec9432917ca'),
  ('Leto', 50,  '9ec94326-2e2d-2ea2-22e3-3a535a4365e7');

-- 実際に試してみるには、
-- auth.usersテーブルにあるUUIDを使用します
```

ここで、ポリシーを書きます。やはりSQLで書きますが、ダッシュボードのAuth → Policiesから追加可能です。

```sql
CREATE POLICY user_update_own_scores ON my_scores
    FOR ALL
    USING (auth.uid() = user_id);
```

さて、javascript/supabase-jsの環境でアクティブなセッションがあると仮定すると、次のことができます。

```jsx
supabase.from('my_scores').select('*').then(console.log)
```

とすれば、現在ログインしているユーザーのスコアのみを受け取ることができます。また、Bashを使って次のようにもできます。

```bash
curl 'https://sjvwsaokcugktsdaxxze.supabase.co/rest/v1/my_scores?select=*' \
-H "apikey: <ANON_KEY>" \
-H "Authorization: Bearer <ACCESS_TOKEN>"
```

なお、APIゲートウェイを通過するためには、`匿名キー（anon key）`、または`サービス・ロール・キー（service role key）`が必ず必要です。これは、`apikey`ヘッダーまたは`apikey`という名前のクエリパラメーターで渡すことができます。supabase-jsでは、インスタンス化したクライアントを使用した場合自動的に渡されます。

`auth.users`テーブルとの統合に最適なスキーマの構造については、ここにもいくつかの注意点があります。

ポリシーのコツを掴んだら、少し派手なことを始めましょう。例えば、私がBlizzard社で働いていて、Blizzard社のスタッフだけが人々のハイスコアを更新できるようにしたい場合、次のように書くことができます。

```sql
create or replace function auth.email() returns text as $$
  select nullif(current_setting('request.jwt.claims', true)::json->>'email', '')::text;
$$ language sql;

create policy "Only Blizzard staff can update leaderboard"
  on my_scores
  for update using (
    right(auth.email(), 13) = '@blizzard.com'
  );
```

Supabaseには、`auth.email()`, `auth.uid()`, `auth.role()`という3つのヘルパー関数が組み込まれています。

PostgreSQLのポリシーに関する完全なドキュメントは次のURLを参照してください。[https://www.postgresql.org/docs/12/sql-createpolicy.html](https://www.postgresql.org/docs/12/sql-createpolicy.html)

これらのポリシーでいくらでも創造的にできます。

### リソース

- JWTデバッガー：[https://jwt.io](https://jwt.io%E2%80%8B)
- PostgeSQLポリシー：https://www.postgresql.org/docs/12/sql-createpolicy.html
- PostgREST行単位セキュリティー：https://postgrest.org/en/v7.0.0/auth.html

### 次のステップ

- [パート1：JWT](/docs/learn/auth-deep-dive/auth-deep-dive-jwts)をみる
- [パート2：行単位セキュリティー](/docs/learn/auth-deep-dive/auth-row-level-security)をみる
<!-- - [パート3：ポリシー](/docs/learn/auth-deep-dive/auth-policies)をみる -->
- [パート4：GoTrue](/docs/learn/auth-deep-dive/auth-gotrue)をみる
- [パート5：Google Oauth](/docs/learn/auth-deep-dive/auth-google-oauth)をみる
- Supabaseにサインアップ：[app.supabase.io](https://app.supabase.io)
