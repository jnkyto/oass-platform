// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Avoin Avustaja",
  tagline: "Auta meitä luomaan tulevaisuuden tekoälyavustaja!",
  url: "https://turkunlp.org/",
  trailingSlash: false,
  baseUrl: "/avoin-avustaja/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo.svg",
  staticDirectories: ["public", "static", "docs/data/img"],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "LAION-AI", // Usually your GitHub org/user name.
  projectName: "Open-Assistant", // Usually your repo name.
  deploymentBranch: "main",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "fi",
    locales: ["fi"],
  },
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],

  presets: [
    [
      "docusaurus-preset-openapi",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        api: {
          path: "docs/api/",
        },
        blog: {
          routeBasePath: "/blog",
          showReadingTime: true,
          blogTitle: "OpenAssistant Blog",
          blogDescription: "Home of the OpenAssistant blog.",
          blogSidebarTitle: "Blog Posts",
          blogSidebarCount: "ALL",
          postsPerPage: "ALL",
          feedOptions: {
            type: "all",
            title: "OpenAssistant Blog",
            description: "Home of the OpenAssistant blog.",
            language: "en",
            copyright: `Copyright © ${new Date().getFullYear()} OpenAssistant.`,
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Avoin Avustaja",
        logo: {
          alt: "Avoimen Avustajan logo",
          src: "img/logo.svg",
        },
        items: [
          {
            href: "https://avoin-avustaja.fi/",
            label: "Sovellus",
            position: "left",
          },
          /*{
            href: "https://avoin-avustaja.fi/chat",
            label: "Chat",
            position: "left",
          },*/
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Docs",
          },
          { to: "/blog", label: "Blog", position: "left" },
          { to: "/api", label: "API", position: "left" },
          {
            href: "https://github.com/TurkuNLP/Open-Assistant",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Community",
            items: [
              {
                label: "OpenAssistant Contributors Discord",
                href: "https://ykilcher.com/open-assistant-discord",
              },
              {
                label: "LAION Discord",
                href: "https://discord.com/invite/mVcgxMPD7e",
              },
              {
                label: "YK Discord",
                href: "https://ykilcher.com/discord",
              },
            ],
          },
          {
            title: "Resources",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/LAION-AI/Open-Assistant",
              },
              {
                label: "FAQ",
                href: "https://projects.laion.ai/Open-Assistant/docs/faq",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} TurkuNLP & laion.ai. Tehty käyttäen Docusaurusta.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
