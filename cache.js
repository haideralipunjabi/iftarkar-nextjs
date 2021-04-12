'use strict'

module.exports = [
  // if you are customizing your runtime cache rules, please note that the
  // first item in the runtime cache configuration array MUST be "start-url"
  {
    // MUST be the same as "start_url" in manifest.json
    urlPattern: '/',
    // use NetworkFirst or NetworkOnly if you redirect un-authenticated user to login page
    // use StaleWhileRevalidate if you want to prompt user to reload when new version available
    handler: 'StaleWhileRevalidate',
    options: {
      // don't change cache name
      cacheName: 'start-url',
      expiration: {
        maxEntries: 100,
      }
    }
  },
  {
    urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'google-fonts',
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 365 * 24 * 60 * 60 // 365 days
      }
    }
  },
  {
    urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'static-font-assets',
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 365 * 24 * 60 * 60 // 7 days
      }
    }
  },
  {
    urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-image-assets',
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 365 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: /\.(?:js)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-js-assets',
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 365 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: /\.(?:css|less)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-style-assets',
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 365 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: /\.(?:json|xml|csv)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-data-assets',
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 365 * 60 * 60 // 24 hours
      }
    }
  },
  {
    urlPattern: /\/api\/.*$/i,
    handler: 'NetworkFirst',
    method: 'GET',
    options: {
      cacheName: 'apis',
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: 24 * 60 * 60 // 24 hours
      },
      networkTimeoutSeconds: 10 // fall back to cache if api does not response within 10 seconds
    }
  },
  {
    urlPattern: new RegExp('/*'),
    handler: 'StaleWhileRevalidate',
    options: {
      // don't change cache name
      cacheName: 'extra',
      expiration: {
        maxEntries: 100,
      }
    }
     
  }
]