<template>
  <MainHeader />
  <div class="container">
    <router-view />
  </div>
</template>
<script>
import MainHeader from "@/components/header/Header";

export default {
  components: {MainHeader}
}
</script>