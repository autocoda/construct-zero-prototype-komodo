<template>
  <header>
    <div class="navbar navbar-dark bg-dark shadow-sm">
      <div class="container">
        <div @click="updateRoute" class="navbar-brand d-flex align-items-center cursor-pointer">
          <img class="mb-2" width="172" height="40" src="@/assets/images/logo.png" alt="Project Pay logo">
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'MainHeader',
  methods: {
    updateRoute: function () {
      let entryStepState = this.$store.getters.getStepsCompleted;
      
      if (entryStepState['landing']) {
        this.$router.push({'name': 'calculator-steps', 'params': {step: 'materials'}});
      } else {
        this.$router.push({'name': 'home'});
      }
    }
  }
})
</script>