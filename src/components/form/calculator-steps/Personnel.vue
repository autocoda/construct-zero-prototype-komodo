<template>
  <StepInformationCard
    :info-block-icon="infoBlockIcon"
    :info-block-title="infoBlockTitle"
    :info-block-content="infoBlockContent"
    :info-block-help-text="infoBlockHelpText"
  />
  <div class="row">
    <div class="col-12 col-sm-6">
      <div class="card card-personnel bg-white p-3">
        <div class="card-body d-flex">
          <div class="card-text">
            <h2 class="font-usual fw-bold">Option 1</h2>
            <p>This form requires less detail and takes less time to complete, however it is less accurate and can cost you more.</p>
          </div>
          <div class="card-icon">
            <img src="@/assets/images/calculator/steps/personnel/option-1.svg" alt="Personnel Compact">
          </div>
        </div>
        <div class="card-footer bg-white border-0">
          <button
            @click="displayCompactStep"
            class="btn btn-primary text-white float-end"
          >Select</button>
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-6">
      <div class="card card-personnel bg-white p-3">
        <div class="card-body d-flex">
          <div class="card-text">
            <h2 class="font-usual fw-bold">Option 2</h2>
            <p>This form requires more detail and takes more time to complete, however it is more accurate and cost effective.</p>
          </div>
          <div class="card-icon">
            <img src="@/assets/images/calculator/steps/personnel/option-2.svg" alt="Personnel Detailed">
          </div>
        </div>
        <div class="card-footer bg-white border-0">
          <button
            @click="displayDetailedStep"
            class="btn btn-primary text-white float-end"
          >Select</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent} from 'vue'
import StepInformationCard from "@/components/card/StepInformationCard.vue";

export default defineComponent({
  name: 'PersonnelStep',
  components: {StepInformationCard},
  data() {
    return {
      infoBlockContent: '',
      infoBlockTitle: '',
      infoBlockIcon: '',
      infoBlockHelpText: '',
    }
  },
  computed: {
    step: function () {
      return (this.$route.params.step) ?? 'personnel'
    }
  },
  methods: {
    getInformationCardData() {
      this.infoBlockIcon = require('@/assets/images/calculator/steps/person.svg');
      this.infoBlockTitle = 'Personnel options';
      this.infoBlockContent = 'Please choose the amount of detail you’d like to supply on the personnel involved in this project. ';
    },
    displayCompactStep() {
      this.$router.push({'name': 'calculator-steps', 'params': {step: 'personnel-compact'}});
    },
    displayDetailedStep() {
      this.$router.push({'name': 'calculator-steps', 'params': {step: 'personnel-detailed'}});
    }
  },
  mounted() {
    this.$store.commit('updateStepsCompleted', ['personnel', true]);
    this.getInformationCardData();
  }
})
</script>