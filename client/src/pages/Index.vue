<template>
   <q-page class="flex flex-center">
      <div class="column justify-center q-gutter-xl">
         <q-img alt="Quasar logo" src="~assets/login.png" width="256px" />
         <q-btn v-if="!loggedIn && !profile" color="secondary" label="Login" size="xl" @click="onLogin()" />
         <q-btn v-if="loggedIn || profile" color="secondary" label="Logout" size="xl" @click="onLogout()" />

         <div v-if="loggedIn && profile">
            <div class="row justify-center items-center q-gutter-md">
               <q-avatar>
                  <q-img :src="profile.picture" />
               </q-avatar>
               <span class="text-h6 text-capitalize">Welcome, {{ profile.nickname }}</span>
            </div>

            <div class="q-mt-lg row justify-center">
               <span class="text-caption">{{ firebaseToken }}</span>
            </div>
         </div>
      </div>
   </q-page>
</template>

<script>
import { LocalStorage } from 'quasar'

import * as auth from 'src/services/auth0'

export default {
   name: 'PageIndex',

   computed: {
      loggedIn() {
         return LocalStorage.has('loggedIn')
      },

      profile() {
         return LocalStorage.has('profile') ? LocalStorage.getItem('profile') : null
      },

      firebaseToken() {
         if (LocalStorage.has('firebaseSession')) {
            return 'Firebase token available'
         } else {
            return 'No Firebase token available'
         }
      },
   },

   methods: {
      onLogin() {
         auth.login()
      },

      onLogout() {
         auth.logout()
      },
   },
}
</script>
