<template>
  <StepInformationCard
    :info-block-icon="infoBlockIcon"
    :info-block-title="infoBlockTitle"
    :info-block-content="infoBlockContent"
    :info-block-help-text="infoBlockHelpText"
  />
  <div class="card bg-white p-4">
    <div class="row">
      <div class="col-12"><h2 class="fw-lighter text-uppercase step-heading">Materials</h2></div>
      <div class="col-6 mb-3">
        <label for="mortar-weight" class="form-label">Approximately how many kilograms of mortar will be used in this project?</label>
        <span class="mortar-weight input-type-container position-relative">
          <input type="number" class="form-control" id="mortar-weight" required v-model="materials.mortar">
        </span>
      </div>
      <div class="col-6 mb-3">
        <label for="bricks-count" class="form-label">Approximately how many standard bricks will be used in this project?</label>
        <span class="bricks-count input-type-container position-relative">
          <input type="number" class="form-control" id="bricks-count" required v-model="materials.bricks">
        </span>
      </div>
      <div class="col-6 mb-3">
        <label for="vehicles-types-used" class="form-label">What type of vehicle will you be primarily using to travel to and from site?</label>
        <select id="vehicles-types-used" class="form-select" v-model="materials['travel-vehicle']">
          <option selected>Please Select</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div class="col-6 mb-3">
        <label for="miles-travelled" class="form-label">Approximately how many miles in total will you travel during this project?</label>
        <span class="miles-travelled input-type-container position-relative">
          <input type="number" class="form-control travel-distance" id="miles-travelled" required v-model="materials['travel-total']">
        </span>
      </div>
      <div class="col-12 my-3">
        <hr>
      </div>
      <div class="col-12">
        <h2 class="fw-lighter text-uppercase step-heading">Emissions</h2>
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-6">from Mortar</div><div class="fw-bold col-6">--kg</div>
          <div class="col-6">from Bricks</div><div class="fw-bold col-6">--kg</div>
          <div class="col-6">from Vehicles</div> <div class="fw-bold col-6">--kg</div>
        </div>
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-6">Total</div>
          <div class="col-6 fw-bold text-end">-- tonnes</div>
        </div>
      </div>
    </div>

  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import StepInformationCard from "@/components/card/StepInformationCard.vue";

export default defineComponent({
  name: 'MaterialsStep',
  components: {StepInformationCard},
  data() {
    return {
      materials: [
        {
          "mortar": '',
          "bricks": '',
          "travel-vehicle": '',
          "travel-total": '',
        }
      ],
      infoBlockContent: '',
      infoBlockTitle: '',
      infoBlockIcon: '',
      infoBlockHelpText: '',
    }
  },
  computed: {
    step: function () {
      return (this.$route.params.step) ?? 'materials'
    }
  },
  methods: {
    getInformationCardData() {
      this.infoBlockIcon = require('@/assets/images/calculator/steps/checklist.svg');
      this.infoBlockTitle = 'Materials used for works';
      this.infoBlockContent = 'List any materials you will directly use to complete your works for this project.';
      this.infoBlockHelpText = 'The more information you provide the more accurate your breakdown of results will be.';
    }
  },
  mounted() {
    this.getInformationCardData();
  }
})
</script>