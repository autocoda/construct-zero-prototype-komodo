<template>
  <header>
    <div class="navbar navbar-dark bg-dark shadow-sm">
      <div class="container">
        <router-link to="/" class="navbar-brand d-flex align-items-center">
          <img class="mb-2" width="172" height="40" src="@/assets/images/logo.png" alt="Project Pay logo">
        </router-link>
      </div>
    </div>
  </header>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'MainHeader',
})
</script>