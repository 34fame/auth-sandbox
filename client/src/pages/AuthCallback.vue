<template></template>

<script>
import { Loading, LocalStorage, Notify, Platform } from 'quasar'

import { instance as axios } from 'boot/axios'
import * as auth from 'src/services/auth0'
import { loginWithCustomToken, logout } from 'src/services/firebase'

export default {
   name: 'AuthCallback',

   methods: {
      async callback() {
         Loading.show()

         try {
            /**
             * At this point the user has authenticated via the Auth0 Universal Login page
             * and has then been redirected back to here to complete the login process.  We
             * now need to collect and store the access and identity tokens provided by Auth0.
             */
            let tokens
            if (Platform.is.cordova) {
               tokens = LocalStorage.getItem('tokens')
            } else {
               tokens = await auth.tokens()
            }

            /**
             * Here we are adding the Auth0 access token to our Axios instance.  This will
             * ensure that all calls to our server API will be authenticated.
             *
             * The server will use Auth0 libraries to validate the access token and therefore
             * authorize our calls.  If someone else tries to call our server APIs, they will
             * receive a 401 Unauthorized response.
             *
             * At a minimum, this is how we will protect the server API call for retrieving
             * our Firebase custom token (discussed below).
             */
            axios.defaults.headers.common.Authorization = `Bearer ${tokens.accessToken}`

            /**
             * Now that we have our Auth0 access token we can get the user's profile
             * from Auth0.  We need this profile information to associate them with
             * a user in our application.
             */
            const profile = await auth.profile(tokens.accessToken)
            LocalStorage.set('profile', profile)

            /**
             * If our app is using the Firebase Client SDK we will need to create an authenticated
             * session with Firebase.  Since we are using Auth0 to authenticate the user, we will need
             * to create our Firebase session using "custom tokens".
             *
             * The first step REQUIRES using the Firebase Admin SDK (which can only be run on a server).
             * This call is protected in this manner because Firebase has no way to verify the user has
             * previously authenticated.  It is trusting that the app has properly handled this.
             *
             * The server call will return to us a Firebase access token.  Firebase considers this to be
             * a "custom token" in their documentation.  With this token we can authenticate the client
             * using the "signInWithCustomToken" method provided by the Firebase Client SDK.
             */
            let customToken
            let result = await axios.get('/auth/token')
            if (result.statusText === 'OK') {
               customToken = result.data.firebaseToken
            } else {
               Notify.create({ color: 'negative', message: 'server failed to return firebase token' })
               this.$router.push({ name: 'logout' })
            }
            await loginWithCustomToken(customToken)
            LocalStorage.set('firebaseSession', true)

            LocalStorage.set('loggedIn', true)
            this.$router.push({ name: 'home' })
         } catch (err) {
            Notify.create({ color: 'negative', message: 'an error occurred during login process' })
            console.error('AuthCallback', err)
            this.$router.push({ name: 'logout' })
         } finally {
            Loading.hide()
         }
      },
   },

   mounted() {
      this.callback()
   },
}
</script>
