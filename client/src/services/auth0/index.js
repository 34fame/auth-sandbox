import { auth0js, auth0cordova } from 'boot/auth0'
import { Platform, LocalStorage } from 'quasar'

import { router } from 'src/router'

const packageId = process.env.CORDOVA_PACKAGEID
const domain = process.env.AUTH0_DOMAIN
const nativeClientId = process.env.AUTH0_NATIVE_CLIENTID

const returnTo = packageId + '://' + domain + '/cordova/' + packageId + '/callback'
const redirectUrl = 'https://' + domain + '/v2/logout?client_id=' + nativeClientId + '&returnTo=' + returnTo

function openUrl(url) {
   if (Platform.is.cordova) {
      SafariViewController.isAvailable(function(available) {
         if (available) {
            SafariViewController.show(
               {
                  url: url,
               },
               function(result) {
                  if (result.event === 'loaded') {
                     SafariViewController.hide()
                  }
               },
               function(msg) {
                  console.log('KO: ' + JSON.stringify(msg))
               }
            )
         } else {
            window.open(url, '_system')
         }
      })
   } else {
      window.open(url, '_system')
   }
}

export function login() {
   if (Platform.is.cordova) {
      const options = {
         scope: 'openid profile email',
         audience: process.env.AUTH0_AUDIENCE,
      }
      auth0cordova.authorize(options, function(err, authResult) {
         if (err) {
            console.error('auth0/login', err)
            return false
         }
         LocalStorage.set('tokens', authResult)
         router.push({ name: 'auth_callback' })
      })
   } else {
      auth0js.authorize()
   }
}

export function logout() {
   if (Platform.is.cordova || Platform.is.electron) {
      openUrl(redirectUrl)
      router.push({ name: 'logout' })
   } else {
      auth0js.logout({
         returnTo: process.env.APP_BASEURL + '/logout',
      })
   }
}

export function tokens() {
   return new Promise((response, reject) => {
      auth0js.parseHash({ hash: window.location.hash }, function(err, authResult) {
         if (err) {
            console.error('auth0/tokens', err)
            reject()
         }
         response(authResult)
      })
   })
}

export function profile(access_token) {
   return new Promise((response, reject) => {
      auth0js.client.userInfo(access_token, async (err, profile) => {
         if (err) {
            console.error('profile()', err)
            reject()
         }
         response(profile)
      })
   })
}
