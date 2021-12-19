/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const supabaseClient = require('./sidebar_spec_supabase')
const supabaseCli = require('./sidebar_spec_cli')
const dart = require('./sidebar_spec_dart')

module.exports = {
  supabaseClient: [
    {
      type: 'category',
      label: 'Javascript',
      collapsed: false,
      items: supabaseClient.docs,
    },
    // {
    //   type: 'category',
    //   label: 'Postgres',
    //   collapsed: false,
    //   items: postgres.docs,
    // },
    {
      type: 'category',
      label: 'Dart',
      collapsed: false,
      items: dart.docs,
    },
    {
      type: 'category',
      label: 'CLI',
      collapsed: false,
      items: supabaseCli.docs,
    },
  ],
  docs: [
    {
      type: 'category',
      label: '概要',
      items: [
        'about',
        'architecture',
        'guides/database',
        'guides/auth',
        'guides/storage',
        'guides/api',
        'guides/examples',
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'チュートリアル',
      collapsed: false,
      items: [
        'guides/with-angular',
        'guides/with-flutter',
        'guides/with-nextjs',
        'guides/with-react',
        'guides/with-redwoodjs',
        'guides/with-svelte',
        'guides/with-vue-3',
      ],
    },
    {
      type: 'category',
      label: '関連情報',
      collapsed: false,
      items: [
        'faq',
        'going-into-prod',
        'handbook/contributing',
        'handbook/supasquad',
        'company/terms',
        'company/privacy',
        'company/aup',
      ],
    },
  ],
  guides: [
    {
      type: 'category',
      label: 'ガイド',
      items: ['guides', 'guides/local-development'],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'データベース',
      collapsed: false,
      items: [
        'guides/database/introduction',
        'guides/database/tables',
        'guides/database/functions',
        'guides/database/full-text-search',
        // 'guides/database/json',
        // 'guides/database/arrays',
        // 'guides/database/sql-to-api',
        {
          type: 'category',
          label: '拡張',
          collapsed: true,
          items: [
            'guides/database/extensions',
            // 'guides/database/extensions/pgtap',
            'guides/database/extensions/plv8',
            'guides/database/extensions/http',
            'guides/database/extensions/uuid-ossp',
          ],
        },
        {
          type: 'category',
          label: 'Postgresに接続',
          collapsed: true,
          items: [
            'guides/database/connecting/connecting-to-postgres',
            'guides/database/connecting/direct-connections',
            'guides/database/connecting/connection-pooling',
          ],
        },
        {
          type: 'category',
          label: '設定',
          collapsed: true,
          items: [
            'guides/database/timeouts',
            'guides/database/replication',
            'guides/database/managing-passwords',
            'guides/database/managing-timezones',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '認証',
      collapsed: false,
      items: [
        'guides/auth/intro',
        {
          type: 'category',
          label: '認証',
          collapsed: true,
          items: [
            'guides/auth/auth-email',
            'guides/auth/auth-magic-link',
            'guides/auth/auth-apple',
            'guides/auth/auth-bitbucket',
            'guides/auth/auth-discord',
            'guides/auth/auth-facebook',
            'guides/auth/auth-github',
            'guides/auth/auth-gitlab',
            'guides/auth/auth-google',
            'guides/auth/auth-slack',
            'guides/auth/auth-spotify',
            'guides/auth/auth-twitter',
            'guides/auth/auth-twitch',
            'guides/auth/auth-twilio',
            'guides/auth/auth-messagebird',
          ],
        },
        {
          type: 'category',
          label: '権限',
          collapsed: true,
          items: ['guides/auth/row-level-security', 'guides/auth/managing-user-data'],
        },
        {
          type: 'category',
          label: '詳細',
          collapsed: true,
          items: [
            'learn/auth-deep-dive/auth-deep-dive-jwts',
            'learn/auth-deep-dive/auth-row-level-security',
            'learn/auth-deep-dive/auth-policies',
            'learn/auth-deep-dive/auth-gotrue',
            'learn/auth-deep-dive/auth-google-oauth',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'インテグレーション',
      collapsed: false,
      items: [
        'guides/integrations/auth0',
        'guides/integrations/draftbit',
        'guides/integrations/prisma',
        'guides/integrations/vercel',
      ],
    },
    // {
    //   type: 'category',
    //   label: 'Storage',
    //   collapsed: false,
    //   items: ['guides/storage/storage-sample'],
    // },
    {
      type: 'category',
      label: 'セルフ・ホスティング',
      collapsed: false,
      items: ['guides/hosting/overview', 'guides/hosting/platform', 'guides/hosting/docker'],
    },
  ],
  postgresServer: [
    {
      type: 'category',
      label: 'Postgres',
      collapsed: false,
      items: ['postgres/server/about'],
    },
    {
      type: 'category',
      label: 'Self hosting',
      collapsed: false,
      items: ['postgres/server/docker', 'postgres/server/aws', 'postgres/server/digitalocean'],
    },
  ],
  postgresApi: [
    {
      type: 'category',
      label: 'Postgres API',
      collapsed: false,
      items: ['postgres/api/about'],
    },
  ],
}
