import { fireauth } from 'boot/firebase'

/**
 * This function creates an authenticated session for client using a
 * custom Firebase token.  The custom token would be generated by the
 * server using the Firebase Admin SDK.
 *
 * Subsequently, any call to Firebase using the Client SDKs will be
 * authenticated.  The Firebase Authentication user will be created with
 * a User UID from the "foreign" access token (in our case Auth0).
 *
 * @param {String} token
 */
const loginWithCustomToken = (token) => {
   return fireauth
      .signInWithCustomToken(token)
      .then((result) => {
         return result
      })
      .catch((err) => {
         console.error('services/firebase/authentication/login', err)
         return err.message
      })
}

/**
 * This function will clear any authenticated session with Firebase.
 */
const logout = () => {
   return fireauth
      .signOut()
      .then(() => {
         return true
      })
      .catch((err) => {
         console.error('services/firebase/authentication/logout', err)
         return err.message
      })
}

export { loginWithCustomToken, logout }