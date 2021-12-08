module.exports = {
  plugins: {
    '@textlint/markdown': {
      extensions: ['.md', '.mdx'],
    },
  },
  rules: {
    'preset-ja-technical-writing': true,
    'preset-jtf-style': {
      '2.1.6.カタカナの長音': true,
      '2.2.1.ひらがなと漢字の使い分け': true,
    },
    prh: { rulePaths: ['./prh.yml'] },
  },
  filters: {
    comments: true,
    allowlist: {
      allow: [
        '/^<Tabs[\\s\\S]*?]}>$/m',
        '/^<Tabs[\\s\\S]*?>$/m',
        "/import ExtensionsComponent from '@site/src/components/Extensions'/",
        "/import Link from '@docusaurus/Link'/",
        '<<<<<<< HEAD',
      ],
    },
  },
}
