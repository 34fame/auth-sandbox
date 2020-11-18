<template></template>

<script>
import { LocalStorage } from 'quasar'

export default {
   name: 'Logout',

   mounted() {
      LocalStorage.clear()
      this.$router.push({ name: 'home' })
   },
}
</script>
