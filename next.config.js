// next.config.js
const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const withPostCSSFlexbugsFixes = require("postcss-flexbugs-fixes");
const withPostCSSPresetEnv = require("postcss-preset-env");
const purgeCSS = require("@fullhuman/postcss-purgecss")
const cache = require("./cache")
module.exports = withPlugins([
  [
    withPWA,
    {
      pwa: {
        // disable: process.env.NODE_ENV === 'development',
        dest: "public",
        runtimeCaching: cache,
        buildExcludes: [
          /middleware-manifest\.json$/,
          /_middleware\.js$/,
          /_middleware\.js\.map$/,
          /middleware-runtime\.js$/,
          /middleware-runtime\.js\.map$/,
        ],
      },
    },
  ],
  withPostCSSFlexbugsFixes,
  [
    withPostCSSPresetEnv,
    {
      "autoprefixer": {
        "flexbox": "no-2009"
      },
      "stage": 3,
      "features": {
        "custom-properties": false
      }
    }
  ],
  [
    purgeCSS,
    {
      content: [
          './pages/**/*.{js,jsx,ts,tsx}',
          './components/**/*.{js,jsx,ts,tsx}'
      ],
      css: [
        './styles/*.scss',
        './components/*.scss'
    ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: ["html", "body"]
    }
  ],
],
{
  i18n: {
    locales: ['en','ur','kmr'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  future: {webpack5: true,},
  compress: true,
  target: "serverless",
});