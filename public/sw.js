if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return a[e]||(s=new Promise((async s=>{if("document"in self){const a=document.createElement("script");a.src=e,document.head.appendChild(a),a.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!a[e])throw new Error(`Module ${e} didn’t register its module`);return a[e]}))},s=(s,a)=>{Promise.all(s.map(e)).then((e=>a(1===e.length?e[0]:e)))},a={require:Promise.resolve(s)};self.define=(s,n,i)=>{a[s]||(a[s]=Promise.resolve().then((()=>{let a={};const r={uri:location.origin+s.slice(1)};return Promise.all(n.map((s=>{switch(s){case"exports":return a;case"module":return r;default:return e(s)}}))).then((e=>{const s=i(...e);return a.default||(a.default=s),a}))})))}}define("./sw.js",["./workbox-747a3fdb"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/7jfvwPIuCBN3awpQSz3jE/_buildManifest.js",revision:"7jfvwPIuCBN3awpQSz3jE"},{url:"/_next/static/7jfvwPIuCBN3awpQSz3jE/_ssgManifest.js",revision:"7jfvwPIuCBN3awpQSz3jE"},{url:"/_next/static/chunks/0f1ac474-f7073c6f5869fe65b93c.js",revision:"7jfvwPIuCBN3awpQSz3jE"},{url:"/_next/static/chunks/293-5d481485bbb53a221781.js",revision:"7jfvwPIuCBN3awpQSz3jE"},{url:"/_next/static/chunks/297-b636ffd7239edb5d80f9.js",revision:"7jfvwPIuCBN3awpQSz3jE"},{url:"/_next/static/chunks/577-d1c0ac13f8221e26c37c.js",revision:"7jfvwPIuCBN3awpQSz3jE"},{url:"/_next/static/chunks/a9a7754c-afb96ae5b85be6507e38.js",revision:"7jfvwPIuCBN3awpQSz3jE"},{url:"/_next/static/chunks/cb1608f2-bd0c81627df3a5e8423c.js",revision:"7jfvwPIuCBN3awpQSz3jE"},{url:"/_next/static/chunks/commons-c5b1b4c3c2001ff79d1c.js",revision:"7jfvwPIuCBN3awpQSz3jE"},{url:"/_next/static/chunks/framework-29474be6dc3948df7c06.js",revision:"7jfvwPIuCBN3awpQSz3jE"},{url:"/_next/static/chunks/main-8119b9e13ee56b1bc06a.js",revision:"7jfvwPIuCBN3awpQSz3jE"},{url:"/_next/static/chunks/pages/404-0dddde81903afd4c9fb8.js",revision:"7jfvwPIuCBN3awpQSz3jE"},{url:"/_next/static/chunks/pages/_app-716e4b088d2d544f1302.js",revision:"7jfvwPIuCBN3awpQSz3jE"},{url:"/_next/static/chunks/pages/_error-474a8016414b1908b7b4.js",revision:"7jfvwPIuCBN3awpQSz3jE"},{url:"/_next/static/chunks/pages/about-0b982a33d3fab71c2eed.js",revision:"7jfvwPIuCBN3awpQSz3jE"},{url:"/_next/static/chunks/pages/index-94a8a01b4461633736a2.js",revision:"7jfvwPIuCBN3awpQSz3jE"},{url:"/_next/static/chunks/pages/timings-45b8001d5fec00d1cd55.js",revision:"7jfvwPIuCBN3awpQSz3jE"},{url:"/_next/static/chunks/polyfills-3d2c0f0875171918a758.js",revision:"7jfvwPIuCBN3awpQSz3jE"},{url:"/_next/static/chunks/webpack-7d0463910e4e8202fce5.js",revision:"7jfvwPIuCBN3awpQSz3jE"},{url:"/_next/static/css/ea6e55f6dd92aa1d949b.css",revision:"7jfvwPIuCBN3awpQSz3jE"},{url:"/_next/static/css/ece20971db67737f9470.css",revision:"7jfvwPIuCBN3awpQSz3jE"},{url:"/favicons/android-chrome-192x192.png",revision:"bc1a354ab3e3f7e05263cbf3303858c9"},{url:"/favicons/android-chrome-512x512.png",revision:"6ba93a05dfecba9d56f0472d8499564b"},{url:"/favicons/apple-touch-icon.png",revision:"01c6507a334fa685cfba54b68674d869"},{url:"/favicons/browserconfig.xml",revision:"e2243233b8f83f621e8217c45d913455"},{url:"/favicons/favicon-16x16.png",revision:"9638afa0bda48e3baa354d065d5de170"},{url:"/favicons/favicon-32x32.png",revision:"94fa4bcdb99b3122cc3c813af72b4ca1"},{url:"/favicons/favicon.ico",revision:"9fb314bfa824589d23accca32b522729"},{url:"/favicons/mstile-144x144.png",revision:"4256332f0dc9986a37b5e4d0d501c314"},{url:"/favicons/mstile-150x150.png",revision:"6fdac71a27176b1631cac097595b22f5"},{url:"/favicons/mstile-310x150.png",revision:"41522026b2aea6572aba4508a6c7a344"},{url:"/favicons/mstile-310x310.png",revision:"80a1f342d584f7c4455d3e092f03312a"},{url:"/favicons/mstile-70x70.png",revision:"a6b94b233408a893ab29196735209f5d"},{url:"/favicons/safari-pinned-tab.svg",revision:"01f01e8b72515de9c375f6101d3c0428"},{url:"/fonts/Jameel.ttf",revision:"4b37da11a19bd60a9432a7603aada419"},{url:"/fonts/Narqalam.ttf",revision:"b925ea9b329e65411d2e9aa8ad5e75fe"},{url:"/fonts/Nastaleeq Like.ttf",revision:"36b74a4a93aa42fa96709bf953209db9"},{url:"/icon.svg",revision:"5d59b7ed58256f5568f2f143f776e793"},{url:"/images/pdf-1.png",revision:"e2552516c31d8560471647e638715c3b"},{url:"/images/pdf-2.png",revision:"94783162435515a8f84d98f03b28838c"},{url:"/images/pdf-3.png",revision:"e8b5d0cbb9d4bd837cfac81b98f0ab73"},{url:"/images/pdf-4.png",revision:"13fef4d6de62035d03b8769ddb617417"},{url:"/logo_horizontal.svg",revision:"f25c1233a5d49b0b078567f247fed39e"},{url:"/logo_horizontal_urdu.svg",revision:"97d8b5e9cf6e52bcd9f8812727114ea9"},{url:"/manifest.json",revision:"88826e0add8991d360e2a3c4a862252f"},{url:"/og_image.png",revision:"1c09571576b201358b310a3157e84b8b"},{url:"/screenshots/screenshot1.png",revision:"dd40a866f19e1fd8defeefcba5eda38b"},{url:"/screenshots/screenshot2.png",revision:"f5b53b91ddabc4dd34ca5e85183645b6"},{url:"/screenshots/screenshot3.png",revision:"de6cacf0aa2eed02d21c34c33ccb49a6"},{url:"/screenshots/screenshot4.png",revision:"4d7b807d6913dea4bf79f3a86b34a987"},{url:"/screenshots/screenshot6.png",revision:"3f702aa60d04903e797fa5414bf57240"},{url:"/screenshots/screenshot7.png",revision:"ea9080723c700e1eeb422573f514aca4"},{url:"/screenshots/screenshot8.png",revision:"86f9de9aeccb24919a166bace6419b0e"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute("/",new e.StaleWhileRevalidate({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:100,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.CacheFirst({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:1314e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:1314e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:1314e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.StaleWhileRevalidate({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:1314e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/*/,new e.StaleWhileRevalidate({cacheName:"extra",plugins:[new e.ExpirationPlugin({maxEntries:100,purgeOnQuotaError:!0})]}),"GET")}));
