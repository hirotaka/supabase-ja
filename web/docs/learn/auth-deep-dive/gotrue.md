---
id: auth-gotrue
title: 'パート4：GoTrue'
description: 'Supabase Auth詳細：パート4 - Gotrue概要'
---

### 概要

テーブルへのアクセスを認証されたユーザーに限定する方法、行単位ポリシー、メールアドレスのドメイン・ベースのアクセスについて解説します。

### 視聴 

<iframe className="w-full video-with-border" width="640" height="385" src="https://www.youtube.com/embed/neqfYym_84k" frameBorder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

### Gotrueサーバー

Gotrueは、NetlifyチームによってGoで書かれた認証APIサーバーです。Supabaseのフォークは次の[URL](https://github.com/supabase/gotrue)です。利用可能なAPIエンドポイントのリストは、[こちら](https://github.com/supabase/gotrue#endpoints)でご覧いただけます。

Supabaseプロジェクトをデプロイすると、このサーバーの新しいインスタンスがデータベースと一緒にデプロイされ、必要な`auth`スキーマがデータベースに注入されます。

これにより、例えば、ユーザーがログインするためのマジック・リンクのメールを簡単に送信ができます。

```bash
# <project-ref> を自身のプロジェクトで置き換えてください
# SUPABASE_KEYには自身の匿名apiキー（anon api key）を入力してください。
curl -X POST 'https://<project-ref>.supabase.co/auth/v1/magiclink' \
-H "apikey: SUPABASE_KEY" \
-H "Content-Type: application/json" \
-d '{
  "email": "someone@email.com"
}'
```

<!-- textlint-disable ja-technical-writing/sentence-length -->
Gotrueはユーザーのアクセストークンを発行し、確認、マジック・リンク、パスワード・リカバリーをメールで送信します（デフォルトではSupabaseのSMTPサーバーから送信されます。しかし、ダッシュボードのAuth → Settingsから簡単に自分の環境に接続できます）。また、サードパーティーのOAuthプロバイダーとやり取りし、基本的なユーザーのデータを取得します。
<!-- textlint-enable ja-technical-writing/sentence-length -->

最近のコミュニティーでは、ユーザーがプロバイダーとより密接にやり取りする必要がある場合に、カスタムOAuthスコープを要求する機能も組み込まれています。スコープのパラメーターは次のURLを参照してください。[https://github.com/supabase/gotrue#get-authorize](https://github.com/supabase/gotrue#get-authorize)。

例えば、gmailを使ってユーザーに代わってメールを送信したい場合、gmail.sendスコープをリクエストするように案内ができます。

```
https://sjvwsaokcugktsdaxxze.supabase.co/auth/v1/authorize?provider=google&https://www.googleapis.com/auth/gmail.send
```

もちろん、このような高度なスコープをリクエストするには、googleアプリが検証されていることを確認する必要があります。

<!-- textlint-disable ja-technical-writing/sentence-length -->
[Gotrue-js](https://github.com/supabase/gotrue-js)（および[gotrue-csharp](https://github.com/supabase/gotrue-csharp), [gotrue-py](https://github.com/j0/gotrue-py), [gotrue-kt](https://github.com/supabase/gotrue-kt), [gotrue-dart](https://github.com/supabase/gotrue-dart)）は、すべてgotrue APIエンドポイントのラッパーであり、クライアント内でのセッション管理を容易にします。
<!-- textlint-enable ja-technical-writing/sentence-length -->

しかし、gotrue-jsのすべての機能は、supabase-jsでも利用可能です。supabase-jsは、以下のような場合に、内部的にgotrue-jsを使用します。

```jsx
const { user, session, error } = await supabase.auth.signIn({
  email: 'example@email.com',
  password: 'example-password',
})
```

もし、あなたが機能をリクエストしたり、プロジェクトに直接貢献したい場合は、https://github.com/supabase/gotrue にアクセスしてください。そして、IssueやPRなどを開いてください。私たちはいつでもお手伝いします。

次回のガイドでは、外部のOAuthプロバイダーを設定する方法をご紹介します。「[パート5：Google Oauth](/docs/learn/auth-deep-dive/auth-google-oauth)」をご覧ください。

### リソース

- JWTデバッガー：https://jwt.io/

### 次のステップ

- [パート1：JWT](/docs/learn/auth-deep-dive/auth-deep-dive-jwts)をみる
- [パート2：行単位セキュリティー](/docs/learn/auth-deep-dive/auth-row-level-security)をみる
- [パート3：ポリシー](/docs/learn/auth-deep-dive/auth-policies)をみる
<!-- - [パート4：GoTrue](/docs/learn/auth-deep-dive/auth-gotrue)をみる -->
- [パート5：Google Oauth](/docs/learn/auth-deep-dive/auth-google-oauth)をみる
- Supabaseにサインアップ：[app.supabase.com](https://app.supabase.com)
