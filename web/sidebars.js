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
    'reference',
    {
      type: 'category',
      label: 'JavaScript',
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
    {
      type: 'category',
      label: 'Tools',
      collapsed: false,
      items: ['reference/tools/reference-auth'],
    },
  ],
  docs: [
    {
      type: 'category',
      label: '概要',
      items: [
        'about',
        'architecture',
        'guides/hosting/platform',
        'guides/local-development',
        'guides/examples',
      ],
      collapsed: true,
    },
    {
      type: 'category',
<<<<<<< HEAD
      label: 'クイック・スタート',
      collapsed: false,
=======
      label: 'Quickstarts',
      collapsed: true,
>>>>>>> 0c3804205f62f687e1b0c2dce5c741b6702890e8
      items: [
        'guides/with-angular',
        'guides/with-expo',
        'guides/with-flutter',
        'guides/with-ionic-angular',
        'guides/with-ionic-react',
        'guides/with-ionic-vue',
        'guides/with-nextjs',
        'guides/with-nuxt-3',
        'guides/with-react',
        'guides/with-redwoodjs',
        'guides/with-solidjs',
        'guides/with-svelte',
        'guides/with-sveltekit',
        'guides/with-vue-3',
      ],
    },
    {
      type: 'category',
<<<<<<< HEAD
      label: 'データベース',
      collapsed: false,
=======
      label: 'Database',
      collapsed: true,
>>>>>>> 0c3804205f62f687e1b0c2dce5c741b6702890e8
      items: [
        'guides/database',
        'guides/database/connecting-to-postgres',
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
<<<<<<< HEAD
      label: 'API',
      collapsed: false,
=======
      label: 'APIs',
      collapsed: true,
>>>>>>> 0c3804205f62f687e1b0c2dce5c741b6702890e8
      items: ['guides/api', 'guides/api/generating-types'],
    },
    {
      type: 'category',
      label: 'Functions',
      collapsed: true,
      items: ['guides/functions'],
    },
    {
      type: 'category',
      label: 'Auth',
      collapsed: true,
      items: [
        'guides/auth',
        {
          type: 'category',
          label: '認証',
          collapsed: true,
          items: [
            'guides/auth/auth-email',
            'guides/auth/auth-magic-link',
            'guides/auth/auth-apple',
            'guides/auth/auth-azure',
            'guides/auth/auth-bitbucket',
            'guides/auth/auth-discord',
            'guides/auth/auth-facebook',
            'guides/auth/auth-github',
            'guides/auth/auth-gitlab',
            'guides/auth/auth-google',
            'guides/auth/auth-keycloak',
            'guides/auth/auth-linkedin',
            'guides/auth/auth-notion',
            'guides/auth/auth-slack',
            'guides/auth/auth-spotify',
            'guides/auth/auth-twitch',
            'guides/auth/auth-twitter',
            'guides/auth/auth-workos',
            'guides/auth/auth-zoom',
            'guides/auth/auth-twilio',
            'guides/auth/auth-vonage',
            'guides/auth/auth-messagebird',
          ],
        },
        {
          type: 'category',
          label: '認可',
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
<<<<<<< HEAD
      label: 'ストレージ',
      collapsed: false,
=======
      label: 'Storage',
      collapsed: true,
>>>>>>> 0c3804205f62f687e1b0c2dce5c741b6702890e8
      items: ['guides/storage'],
    },
    {
      type: 'category',
      label: 'Platform',
      collapsed: true,
      items: [
        'guides/platform/logs',
        'guides/platform/metrics',
        'going-into-prod',
        'guides/platform/performance',
        'guides/platform/permissions'
      ],
    },
    {
      type: 'category',
<<<<<<< HEAD
      label: 'セルフ・ホスティング',
      collapsed: false,
=======
      label: 'Self Hosting',
      collapsed: true,
>>>>>>> 0c3804205f62f687e1b0c2dce5c741b6702890e8
      items: ['guides/hosting/overview', 'guides/hosting/docker'],
    },
    {
      type: 'category',
<<<<<<< HEAD
      label: 'インテグレーション',
      collapsed: false,
=======
      label: 'Integrations',
      collapsed: true,
>>>>>>> 0c3804205f62f687e1b0c2dce5c741b6702890e8
      items: [
        'guides/integrations/appsmith',
        'guides/integrations/auth0',
        'guides/integrations/clerk',
        'guides/integrations/dashibase',
        'guides/integrations/draftbit',
        'guides/integrations/pgmustard',
        'guides/integrations/plasmic',
        'guides/integrations/prisma',
        'guides/integrations/snaplet',
        'guides/integrations/stytch',
        'guides/integrations/supertokens',
        'guides/integrations/vercel',
      ],
    },
    {
      type: 'category',
      label: 'See Also',
      collapsed: true,
      items: [
        'faq',
        'handbook/contributing',
        'handbook/supasquad',
        'company/terms',
        'company/privacy',
        'company/aup',
        'company/sla',
      ],
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
