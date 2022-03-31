<template>
  <MainHeader />
  <div class="container main-container">
    <router-view />
  </div>
  <MainFooter />
</template>
<script>
import MainHeader from "@/components/header/Header";
import MainFooter from "@/components/footer/Footer";

export default {
  components: {MainHeader, MainFooter}
}
</script>