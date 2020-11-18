module.exports = function(ctx) {
   return {
      supportTS: false,

      boot: ['i18n', 'axios', 'auth0'],

      css: ['app.sass'],

      extras: ['fontawesome-v5', 'roboto-font', 'material-icons'],

      build: {
         vueRouterMode: 'history',
         extendWebpack(cfg) {},
      },

      devServer: {
         https: false,
         host: '192.168.0.160',
         port: 8080,
         open: true,
      },

      framework: {
         iconSet: 'material-icons', // Quasar icon set
         lang: 'en-us', // Quasar language pack
         config: {},
         importStrategy: 'auto',

         plugins: ['SessionStorage', 'LocalStorage', 'Dialog', 'Notify', 'Loading'],
      },

      animations: 'all',

      ssr: {
         pwa: false,
      },

      pwa: {
         workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
         workboxOptions: {}, // only for GenerateSW
         manifest: {
            name: `Quasar App`,
            short_name: `Quasar App`,
            description: `A Quasar Framework app`,
            display: 'standalone',
            orientation: 'portrait',
            background_color: '#ffffff',
            theme_color: '#027be3',
            icons: [
               {
                  src: 'icons/icon-128x128.png',
                  sizes: '128x128',
                  type: 'image/png',
               },
               {
                  src: 'icons/icon-192x192.png',
                  sizes: '192x192',
                  type: 'image/png',
               },
               {
                  src: 'icons/icon-256x256.png',
                  sizes: '256x256',
                  type: 'image/png',
               },
               {
                  src: 'icons/icon-384x384.png',
                  sizes: '384x384',
                  type: 'image/png',
               },
               {
                  src: 'icons/icon-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
               },
            ],
         },
      },

      cordova: {
         // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
      },

      capacitor: {
         hideSplashscreen: true,
      },

      electron: {
         bundler: 'packager',

         packager: {},

         builder: {
            appId: 'q-ios-sandbox',
         },

         nodeIntegration: true,

         extendWebpack(/* cfg */) {},
      },
   }
}
