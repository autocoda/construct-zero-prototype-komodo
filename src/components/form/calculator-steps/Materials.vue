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
          <input type="number" class="input-number form-control" id="mortar-weight" required v-model="mortar">
        </span>
      </div>
      <div class="col-6 mb-3">
        <label for="bricks-count" class="form-label">Approximately how many standard bricks will be used in this project?</label>
        <span class="bricks-count input-type-container position-relative">
          <input type="number" class="input-number form-control" id="bricks-count" required v-model="bricks">
        </span>
      </div>
      <div class="col-6 mb-3">
        <label for="vehicles-types-used" class="form-label">What type of vehicle will you be primarily using to travel to and from site?</label>
        <select id="vehicles-types-used" class="form-select" v-model="vehicle">
          <option selected disabled="disabled">Please select vehicle type</option>
          <option v-for="(value, key) in vehicleDropdownList" :key="key" :value="value">{{ key }}</option>
        </select>
      </div>
      <div class="col-6 mb-3">
        <label for="miles-travelled" class="form-label">Approximately how many miles in total will you travel during this project?</label>
        <span class="miles-travelled input-type-container position-relative">
          <input type="number" class="input-number form-control travel-distance" id="miles-travelled" required v-model="projectTravel">
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
          <div class="col-6">from Mortar</div>
          <div class="fw-bold col-6">{{ mortarEmissions }}kg</div>
          <div class="col-6">from Bricks</div>
          <div class="fw-bold col-6">{{ bricksEmissions }}kg</div>
          <div class="col-6">from Vehicles</div>
          <div class="fw-bold col-6">{{ vehicleEmissions }}kg</div>
        </div>
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-6">Total</div>
          <div class="col-6 fw-bold text-end">{{ materialsEmission }} tonnes</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent} from 'vue'
import StepInformationCard from "@/components/card/StepInformationCard.vue";
import {get} from "axios";
import {roundValue} from "@/imports/util/roundValue";

export default defineComponent({
  name: 'MaterialsStep',
  components: {StepInformationCard},
  data() {
    return {
      vehicleDropdownList: '',
      infoBlockContent: '',
      infoBlockTitle: '',
      infoBlockIcon: '',
      infoBlockHelpText: '',
    }
  },
  computed: {
    step: function () {
      return (this.$route.params.step) ?? 'materials';
    },
    mortar: {
      get() {
        return this.$store.getters.getUsedMortar
      },
      set(value) {
        this.$store.commit('updateUsedMortar', value);
      }
    },
    bricks: {
      get() {
        return this.$store.getters.getUsedBricks
      },
      set(value) {
        this.$store.commit('updateUsedBricks', value);
      }
    },
    vehicle: {
      get() {
        return this.$store.getters.getUsedVehicleType
      },
      set(value) {
        this.$store.commit('updateUsedVehicleType', value)
      }
    },
    projectTravel: {
      get() {
        return this.$store.getters.getProjectTotalTravel
      },
      set(value) {
        this.$store.commit('updateProjectTotalTravel', value)
      }
    },
    mortarEmissions: function () {
      let mortarWeight = parseFloat(this.mortar);
      let totals = (!Number.isNaN(mortarWeight))
        ? parseFloat(roundValue(mortarWeight * 0.22))
        : '--';
      this.$store.commit('updateUsedMortarEmissions', totals);

      return totals;
    },
    bricksEmissions: function () {
      let bricksCount = parseFloat(this.bricks);
      let totals = (!Number.isNaN(bricksCount))
        ? parseFloat(roundValue((bricksCount * 2.34) * 0.240))
        : '--';
      this.$store.commit('updateUsedBricksEmissions', totals);

      return totals;
    },
    vehicleEmissions: function () {
      let vehicleBaseEmissions = parseFloat(this.vehicle);
      let vehicleTravelDistance = parseFloat(this.projectTravel);
      let totals = (!Number.isNaN(vehicleBaseEmissions) && !Number.isNaN(vehicleTravelDistance))
        ? parseFloat(roundValue((vehicleBaseEmissions * vehicleTravelDistance) / 0.62137))
        : '--';
      this.$store.commit('updateUsedVehicleEmissions', totals);

      return totals;
    },
    materialsEmission: function () {
      let bricksEmissions = parseFloat(this.$store.getters.getUsedBricksEmissions);
      let mortarEmissions = parseFloat(this.$store.getters.getUsedMortarEmissions);
      let vehicleBaseEmissions = parseFloat(this.$store.getters.getUsedVehicleEmissions);
      if ((!Number.isNaN(vehicleBaseEmissions) && !Number.isNaN(mortarEmissions) && !Number.isNaN(vehicleBaseEmissions))) {
        let totals =  parseFloat((bricksEmissions + mortarEmissions + vehicleBaseEmissions) / 1000);
        this.$store.commit('updateMaterialsStepEmissions', totals);

        return totals
      }

      return '--';
    }
  },
  methods: {
    getVehicleEmissionData: function () {
      return get('/static/vehicle-input-data.json')
        .then((response) => {
          this.vehicleDropdownList = response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    },
    getInformationCardData: function () {
      this.infoBlockIcon = require('@/assets/images/calculator/steps/checklist.svg');
      this.infoBlockTitle = 'Materials used for works';
      this.infoBlockContent = 'List any materials you will directly use to complete your works for this project.';
      this.infoBlockHelpText = 'The more information you provide the more accurate your breakdown of results will be.';
    }
  },
  mounted() {
    this.getInformationCardData();
    this.getVehicleEmissionData();
  }
})
</script>