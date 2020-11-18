import auth0 from 'auth0-js'
import Auth0Cordova from '@auth0/cordova'

const auth0js = new auth0.WebAuth({
   clientID: process.env.AUTH0_CLIENTID,
   domain: process.env.AUTH0_DOMAIN,
   redirectUri: process.env.AUTH0_REDIRECTURI,
   audience: process.env.AUTH0_AUDIENCE,
   responseType: 'token id_token',
})

const auth0cordova = new Auth0Cordova({
   clientId: process.env.AUTH0_NATIVE_CLIENTID,
   domain: process.env.AUTH0_DOMAIN,
   packageIdentifier: process.env.CORDOVA_PACKAGEID,
   responseType: 'token id_token',
})

console.log(process.env.AUTH0_DOMAIN)

// export default async ({ app, router, Vue }) => {
// }

export { auth0js, auth0cordova }
