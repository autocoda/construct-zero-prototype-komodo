<template>
  <div class="form-top-navigation position-relative d-flex flex-row justify-content-between align-items-center col-auto col-12">
    <a
      :class="[anchorClass, {'active': isActiveStep('materials')}]"
      @click="switchTab({name: 'calculator-steps', params: {step: 'materials'}})"
    >
      <span :class="[badgeDefaultClass] ">1</span> Materials
    </a>
    <a
      :class="[anchorClass, {'active': isActiveStep('equipment') }]"
      @click="switchTab({name: 'calculator-steps', params: {step: 'equipment'}})"
    >
      <span :class="[badgeDefaultClass]">2</span> Equipment
    </a>
    <a
      :class="[
        anchorClass,
        {'active': isActiveStep('personnel')},
        {'active': isActiveStep('personnel-compact')},
        {'active': isActiveStep('personnel-detailed')}
      ]"
      @click="switchTab({name: 'calculator-steps', params: {step: 'personnel'}})"
    >
      <span :class="[badgeDefaultClass,]">3</span> Personnel
    </a>
    <a :class="[anchorClass, {'active': isActiveStep('summary') }]"
       @click="switchTab({name: 'calculator-steps', params: {step: 'summary'}})"
    >
      <span :class="[badgeDefaultClass, ]">4</span> Summary
    </a>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'FormTopNavigation',
  data() {
    return {
      badgeDefaultClass: 'badge d-flex align-items-center justify-content-center rounded-pill me-2',
      anchorClass: 'd-flex text-decoration-none form-step position-relative form-top-anchor'
    }
  },
  methods: {
    switchTab: function (route) {
      this.$router.push(route);
    },
    isActiveStep: function (step) {
      return this.$route.params.step === step
    }
  },
})
</script>