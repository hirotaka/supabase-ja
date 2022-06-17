---
id: auth-google-oauth
title: 'パート5：Google Oauth'
description: 'Supabase Auth詳細：パート5 - Google OAuthプロバイダー'
---

### 概要

SupabaseアプリケーションにGoogle OAuthログインを追加する方法を解説します。

### 視聴 

<iframe className="w-full video-with-border" width="640" height="385" src="https://www.youtube-nocookie.com/embed/_XM9ziOzWk4" frameBorder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

### 外部のOAuthプロバイダでログインする

<!-- textlint-disable ja-technical-writing/max-comma -->
Google, GitHub, Facebookなどのソーシャル・ログインと接続するのはとても簡単です。このガイドでは、Googleに接続する手順を説明します。基本的にはazure, bitbucket, github, gitlab, facebook, googleを含むすべてのプロバイダーで同じ手順になります。
<!-- textlint-enable ja-technical-writing/max-comma -->

まず、Googleの[クラウド・コンソール](https://console.cloud.google.com/home/dashboard)内にGoogleプロジェクトを作成する必要があります。他のプロバイダーでは、これを「アプリ」と呼ぶことがあり、通常はそれぞれのプロバイダーの開発者ポータルで利用できます。

![Create a new Google Project inside cloud console](/img/auth-5-1.png)

プロジェクトを作成したら、検索バーに「OAuth」と入力し、「OAuth同意画面（OAuth content screen）」を開きます。

![Open the OAuth consent screen](/img/auth-5-2.png)

「外部（External）」を選択して、残りのフォーム・フィールドの入力を進めます。

![Select External on the OAuth form](/img/auth-5-3.png)

次に、左側の「認証情報（Credentials）」ページを開きます。

![Open up Credentials page](/img/auth-5-4.png)

「認証情報を作成（CREATE CREDENTIALS）」をクリックし、選択肢から「OAuthクライアントID（OAuth client ID）」を選択します。

![Create new oauth client id credentials](/img/auth-5-5.png)

「ウェブアプリケーション」を選択します。「承認済みのリダイレクトURI（Authorized redirect URIs）」セクションに`https://<自身のを参照>.supabase.co/auth/v1/callback`を追加します。SupabaseのURLは、Supabaseのダッシュボード内のSettings → APIで確認できます。

![Add your redirect URI](/img/auth-5-6.png)

ポップアップからクライアントID（Your Client ID）とシークレット（Your Client Secret）を取得します。SupabaseダッシュボードのAuth → Settingsにあるgoogleセクションへ挿入します。

![take client id and secret](/img/auth-5-7.png)

![insert client id and secret into supabase dashboard in auth > auth](/img/auth-5-8.png)

保存します。これで、ブラウザーで以下の場所へ移動できるようになります。

```
https://<自身のを参照>.supabase.co/auth/v1/authorize?provider=google
```

そして、googleやgmailのアカウントを使って、あなたのサービスにログインしてください。

例えば、URLの最後に`redirect_to=`というクエリパラメーターを追加できます。

```
https://<自身のを参照>.supabase.co/auth/v1/authorize?provider=google&redirect_to=http://localhost:3000/welcome
```

SupabaseダッシュボードのAuth → Settingsページで入力したサイトURLを確認してください。ここで入力したURLが、同じホスト上にある必要があります（近日中に、許可リストへさらにURLを追加できる機能が追加される予定です）。

認証に成功した後、ユーザーをウェブサイトやアプリ内の特定のページにリダイレクトできます。

また、oauthプロバイダーに追加のスコープを要求できます。例えば、ユーザーのgmailアカウントに代わってメールを送信する機能が必要な場合、次のようなクエリパラメータの`scopes`を追加することで実現できます。

```
https://<自身のを参照>.supabase.co/auth/v1/authorize?provider=google&https://www.googleapis.com/auth/gmail.send
```

ただし、このような高度なスコープを要求するには、通常、アプリケーションをGoogleに認証してもらう必要があることに注意してください。

あとはUIを実装するだけですが、あらかじめ用意されているものを使いたい場合は、便利な[認証ウィジェット](https://github.com/supabase/ui/#using-supabase-ui-auth)を用意していますので、サポートしたい認証プロバイダーを有効/無効にしたりできます。

サポートが必要な場合は、beta at [supabase.com](https://supabase.com)までご連絡ください。また、機能リクエストについては、[バックエンド](https://github.com/supabase/gotrue)または[フロントエンド](https://github.com/supabase/gotrue-js)のリポジトリーでissueを開いてください。

### リソース

- JWTデバッガー：https://jwt.io/

### 次のステップ
- [パート1：JWT](/docs/learn/auth-deep-dive/auth-deep-dive-jwts)をみる
- [パート2：行単位セキュリティー](/docs/learn/auth-deep-dive/auth-row-level-security)をみる
- [パート3：ポリシー](/docs/learn/auth-deep-dive/auth-policies)をみる
- [パート4：GoTrue](/docs/learn/auth-deep-dive/auth-gotrue)をみる
<!-- - [パート5：Google Oauth](/docs/learn/auth-deep-dive/auth-google-oauth)をみる -->
- Supabaseにサインアップ：[app.supabase.com](https://app.supabase.com)
