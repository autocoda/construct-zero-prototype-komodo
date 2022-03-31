<template>
  <div class="form-top-navigation position-relative d-flex flex-row justify-content-between align-items-center col-auto col-12">
    <a
      :class="[
        anchorClass, isStepComplete('materials') ? 'complete': 'incomplete',
        {'active': isActiveStep('materials')}
      ]"
      @click="switchStep('materials')"
    >
      <span :class="[badgeDefaultClass]">1</span> <span class="title">Materials</span>
    </a>
    <a
      :class="[
        anchorClass, isStepComplete('equipment') ? 'complete': 'incomplete',
        {'active': isActiveStep('equipment')  }
      ]"
      @click="switchStep('equipment')"
    >
      <span :class="[badgeDefaultClass]">2</span> <span class="title">Equipment</span>
    </a>
    <a
      :class="[
        anchorClass,
        isStepComplete(['personnel', 'personnel-compact', 'personnel-detailed'],  2) ? 'complete': 'incomplete',
        {'active': isActiveStep('personnel') || isActiveStep('personnel-compact') || isActiveStep('personnel-detailed') },
      ]"
      @click="switchStep('personnel')"
    >
      <span :class="[badgeDefaultClass]">3</span> <span class="title">Personnel</span>
    </a>
    <a :class="[
         anchorClass, isStepComplete('summary')  ? 'complete': 'incomplete',
         {'active': isActiveStep('summary')}
       ]"
       @click="switchStep('summary')"
    >
      <span :class="[badgeDefaultClass]">4</span> <span class="title">Summary</span>
    </a>
  </div>
  <div class="cancel d-flex">
    <a @click="resetApplicationState()" class="cursor-pointer text-decoration-underline">Cancel</a>
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
    switchStep: function (activeStep) {
      if (this.isStepComplete(activeStep)) {
        this.$router.push({name: 'calculator-steps', params: {step: activeStep}});
      }
    },
    isActiveStep: function (step) {
      return this.$route.params.step === step;
    },
    isStepComplete: function (step, howMany = 0) {
      const completedStepsMapping = this.$store.getters.getStepsCompleted;

      if (Array.isArray(step)) {
        let count = 0;

        step.forEach(item => {
          if (completedStepsMapping[item] === true) {
            count++;
          }
        })

        return (count === howMany);
      }

      return completedStepsMapping[step] === true;
    },
    resetApplicationState: function () {
      this.$store.dispatch('resetState');
      this.$router.push({name: 'home'});
    }
  },
})
</script>