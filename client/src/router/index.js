import Vue from 'vue'
import VueRouter from 'vue-router'
import { Platform } from 'quasar'
import Auth0Cordova from '@auth0/cordova'

import routes from './routes'

Vue.use(VueRouter)

function handleUrl(url) {
   Auth0Cordova.onRedirectUri(url)
}

const router = new VueRouter({
   scrollBehavior: () => ({ x: 0, y: 0 }),
   routes,
   mode: process.env.VUE_ROUTER_MODE,
   base: process.env.VUE_ROUTER_BASE,
})

export default function(/* { store, ssrContext } */) {
   if (Platform.is.cordova) {
      window.handleOpenURL = handleUrl
   }

   return router
}

export { router }
