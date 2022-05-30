---
id: auth-deep-dive-jwts
title: 'パート1：JWT'
description: Supabase Auth詳細：パート1 - JWT
---

### 概要

JWTの紹介とSupabase Authでの使われ方を解説します。

### 視聴

<iframe className="w-full video-with-border" width="640" height="385" src="https://www.youtube-nocookie.com/embed/v3Exg5YpJvE" frameBorder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

### JSON Web Tokens (JWTs) とは

JWTは、エンコードされ、署名されたJSONオブジェクトで、文字列として送信されます。サービスやウェブサイトのユーザーに配布され、ユーザーは後に、特定のコンテンツにアクセスする権利があることの証明として、ウェブサイトやサービスにJWTを提示できます。

「エンコード」や「署名」とは、具体的にどのようなことを指すのでしょうか。

例えば、JSONオブジェクトは、最初は次のような形をしています。

```js
{
  "sub": "0001",
  "name": "Sam Vimes",
  "iat": 1516239022,
  "exp": 1518239022
}
```

`sub`は「subject」で、通常はユーザーのUUIDを表しています。`name`は説明不要で、`iat`はトークンが作成されたときのUnixのタイムスタンプです。また、多くのJWTには`exp`があり、これはトークンが期限切れになって使用できなくなる日を表しています。これらはJWTに含まれる標準的なフィールドの一部ですが、例えば、必要なものは何でも格納できます。

```js
{
  "sub": "0002",
  "name": "Věra Hrabánková",
  "iat": 1516239022,
  "exp": 1518239022,
  "theme": {
      "primary" : "#D80C14",
      "secondary" : "#FFFFFF"
  }
}
```

ただし、トークンに保存するデータ量が多いほど、エンコードされる文字列は長くなることに注意してください。

JWTをユーザーに送信したいときは、まず`HS256`などのアルゴリズムを使ってデータをエンコードします。[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)のように、このエンコード/デコードに使用できる多くのライブラリー（そしていくつかの異なるアルゴリズム）があります。私は[ここ](https://replit.com/@awalias/jsonwebtokens#index.js)にreplを作ったので、自分で試してみてください。署名をするには以下のようにシンプルな記述をします。

```js
// from https://replit.com/@awalias/jsonwebtokens#index.js
let token = jwt.sign({ name: 'Sam Vimes' }, 'some-secret')
```

その結果、文字列は次のようになります。

```js
eyJhbGciOiJIUzI1NiJ9
  .eyJzdWIiOiIwMDAxIiwibmFtZSI6IlNhbSBWaW1lcyIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNTE4MjM5MDIyfQ
  .zMcHjKlkGhuVsiPIkyAkB2rjXzyzJsMMgpvEGvGtjvA
```

文字列は実際には3つの部品で構成されていることがわかります。それを1つずつ説明していきます。

最初のセグメント`eyJhbGciOiJIUzI1NiJ9`は「ヘッダー」として知られており、デコードすると、どのアルゴリズムでエンコードされたかがわかります。

```js
{
  "alg": "HS256"
}
```

<!-- textlint-disable ja-technical-writing/sentence-length -->
2番目のセグメント`eyJzdWIiOiwMDAxIiwibmFtZSI6IlNhbSBWaW1lcyIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNTE4MjM5MDIyfQ`には、オリジナルのペイロードが入っています。
<!-- textlint-enable ja-technical-writing/sentence-length -->

```js
{
  "sub": "0001",
  "name": "Sam Vimes",
  "iat": 1516239022,
  "exp": 1518239022
}
```

最後のセグメント`zMcHjKlkGhuVsiPIkyAkB2rjXzyzJsMMgpvEGvGtjvA`は、署名そのものです。ウェブサイトやサービス・プロバイダーが、あるユーザーから送られてきたトークンが正当なものであることを確認するために使用する部分です。この署名は、まず最初に、以下の入力に対して暗号化関数HS256を実行することで生成されます。

```js
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload)
  <jwt_secret>
)
```

[https://jwt.io](https://jwt.io)で自分のトークンの鋳造をテストできます。

ここで重要なのは、`jwt_secret`を持っている人は誰でも、新しいトークンを作成したり、既存のトークンを検証したりできるということです。より高度なJWTアルゴリズムでは、2つのシークレットを使用します。1つはトークンの作成用で、もう1つは署名されたトークンの有効性を検証するためのものです。

なぜ突然JWTが流行るのか、不思議に思われたことでしょう。その答えは、マイクロサービス・アーキテクチャーの大量導入に伴うものです。複数の異なるマイクロサービス（API、Webサイトやサーバーなど）において、ユーザーが自分の言うとおりの人物（つまり「ログインした」ユーザー）であることを簡単に検証したいという状況になったからです。従来のセッション・トークンはここでは使えません。なぜなら、各マイクロサービスが現在有効なセッション・トークンの記録を維持する必要があります。もしくは、ユーザーがリソースにアクセスしようとするたび、セッション・トークンの有効性を中央のデータベースに問い合わせる必要があるからです。この意味で、JWTベースの認証は非中央集権的です。`jwt_secret`を持つ誰もが、中央のデータベースにアクセスすることなく、トークンを検証できます。

注：JWTの欠点の1つは、セッション・トークンのように簡単には無効化できないことです。JWTが悪意のある攻撃者に漏れた場合、彼らは有効期限に達するまで、どこでもそれを利用できます。もちろん、システムのオーナーが`jwt_secret`を更新しない限りは（もちろん、誰もが既存のトークンを無効にしますが）。

### SupabaseでのJWTs

Supabaseでは、3つの異なる目的のためにJWTを発行しています。

1. `匿名キー（anon key）`：このキーはSupabase APIゲートウェイをバイパスするために使用され、クライアント・サイドのコードで使用できます。
2. `サービス・ロール・キー（service role key）`：このキーはスーパー・アドミン権限を持ち、行単位セキュリティーを回避できます。このキーをクライアント・サイドのコードに入れないでください。秘密にしておいてください。
3. `ユーザー固有のjwts`：これは、あなたのプロジェクトやサービス、ウェブサイトへログインしたユーザーに発行するトークンです。これは現代のセッション・トークンに相当するもので、ユーザーは自分固有のコンテンツやパーミッションへアクセスするために使用できます。

最初のトークンである`匿名キー`トークンは、開発者がSupabaseのデータベースとやり取りする際に、APIリクエストと一緒に送信するためのものです。

例えば、`colors`テーブルのすべての行の名前（name）をselectしたいとします。次のようなリクエストをします。

```bash
curl 'https://xscduanzzfseqszwzhcy.supabase.co/rest/v1/colors?select=name' \
-H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNDIwNTE3NCwiZXhwIjoxOTI5NzgxMTc0fQ.-NBR1WnZyQGpRLdXJfgfpszoZ0EeE6KHatJsDPLIX8c"
```

このトークンを[https://jwt.io](https://jwt.io)に入れると、次のようにデコードされることがわかります。

```js
{
  "role": "anon",
  "iss": "supabase",
  "iat": 1614205174,
  "exp": 1929781174
}
```

このJWTは、開発者のSupabaseトークンに固有の`jwt_secret`で署名されています。このシークレットは、ダッシュボードの「Settings」→「API」ページで、エンコードされた「匿名キー（anon key）」と一緒に確認できます。Supabase APIゲートウェイを通過して、開発者のプロジェクトへアクセスするために必要となります。

しかし、このシリーズの[パート2](/docs/learn/auth-deep-dive/auth-row-level-security)のテーマである「行単位セキュリティー」を有効にした場合、このキーをエンドユーザーが見ても問題ないことになります。

2つ目のキーである`サービス・ロール・キー`は、自分のサーバーや環境でのみ使用し、エンドユーザーとは決して共有してはいけません。このトークンを使って、データの一括挿入などを行うことができます。

`ユーザー・アクセス・トークン`とは、例えば、次のようにAPIを呼び出したとき発行されるJWTのことです。

```js
supabase.auth.signIn({ email: 'lao.gimmie@gov.sg', password: 'They_Live_1988!' })
```

このトークンは、`apikey`ヘッダーに加えて、`Authorization Bearer`ヘッダーも、次のように渡す必要があります。

```bash
curl 'https://xscduanzzfseqszwzhcy.supabase.co/rest/v1/colors?select=name' \
-H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNDIwNTE3NCwiZXhwIjoxOTI5NzgxMTc0fQ.-NBR1WnZyQGpRLdXJfgfpszoZ0EeE6KHatJsDPLIX8c" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjE1ODI0Mzg4LCJzdWIiOiIwMzM0NzQ0YS1mMmEyLTRhYmEtOGM4YS02ZTc0OGY2MmExNzIiLCJlbWFpbCI6InNvbWVvbmVAZW1haWwuY29tIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwifSwidXNlcl9tZXRhZGF0YSI6bnVsbCwicm9sZSI6ImF1dGhlbnRpY2F0ZWQifQ.I-_oSsJamtinGxniPETBf-ezAUwDW2sY9bJIThvdX9s"
```

このトークンには、以下のようなユーザー固有の情報が含まれているため、かなり長くなっていることがわかります。

```js
{
  "aud": "authenticated",
  "exp": 1615824388,
  "sub": "0334744a-f2a2-4aba-8c8a-6e748f62a172",
  "email": "d.l.solove@gmail.com",
  "app_metadata": {
    "provider": "email"
  },
  "user_metadata": null,
  "role": "authenticated"
}
```

JWTとは何か、そしてSupabaseのどこで使われているかを解説しました。その上で、Postgresデータベースの特定のテーブル、行、列へのアクセスを制限します。そのために、行単位セキュリティーと組み合わせてJWTを使用する方法を「[パート2：行単位セキュリティー](/docs/learn/auth-deep-dive/auth-row-level-security)」で探ってみましょう。

### リソース

- JWTデバッガ：https://jwt.io/

### 次のステップ

<!-- - Watch [Part One: JWTs](/docs/learn/auth-deep-dive/auth-deep-dive-jwts) -->

<<<<<<< HEAD
<!-- - [パート2：Part Two: Row Level Security](/docs/learn/auth-deep-dive/auth-row-level-security) -->
- [パート2：行単位セキュリティー](/docs/learn/auth-deep-dive/auth-row-level-security)
- [パート3：ポリシー](/docs/learn/auth-deep-dive/auth-policies)
- [パート4：GoTrue](/docs/learn/auth-deep-dive/auth-gotrue)
- [パート5：Google Oauth](/docs/learn/auth-deep-dive/auth-google-oauth)
- Supabaseにサインアップ：[app.supabase.io](https://app.supabase.io)
=======
- [Part Two: Row Level Security](/docs/learn/auth-deep-dive/auth-row-level-security)
- [Part Three: Policies](/docs/learn/auth-deep-dive/auth-policies)
- [Part Four: GoTrue](/docs/learn/auth-deep-dive/auth-gotrue)
- [Part Five: Google Oauth](/docs/learn/auth-deep-dive/auth-google-oauth)
- Sign up for Supabase: [app.supabase.com](https://app.supabase.com)
>>>>>>> b4d6d8534a9f838d4e363dc509a3d67657e71da7
