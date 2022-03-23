<template>
  <StepInformationCard
    :info-block-icon="infoBlockIcon"
    :info-block-title="infoBlockTitle"
    :info-block-content="infoBlockContent"
    :info-block-help-text="infoBlockHelpText"
  />
  <div class="card bg-white p-4">
    <div class="row">
      <div class="col-12"><h2 class="fw-lighter text-uppercase step-heading">Personnel</h2></div>
      <div class="col-6">
        <label for="personnel-count" class="form-label">How many workers will you have on site?</label>
        <select id="personnel-count" class="form-select" v-model="personnel.count">
          <option selected disabled="disabled">Please Select</option>
          <option v-for="(value, key) in personnelDropdown" :key="key" :value="value">{{ key }}</option>
        </select>
      </div>
      <div class="col-12 my-3">
        <hr>
      </div>
      <div class="col-12">
        <h2 class="fw-lighter text-uppercase step-heading">Emissions</h2>
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-6">Embodied</div><div class="fw-bold col-6">--kg</div>
          <div class="col-6">Transport</div><div class="fw-bold col-6">--kg</div>
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
<script>
import {defineComponent} from 'vue'
import StepInformationCard from "@/components/card/StepInformationCard.vue";
import {get} from "axios";

export default defineComponent({
  name: 'PersonnelCompactStep',
  components: {StepInformationCard},
  data() {
    return {
      personnelDropdown: '',
      infoBlockContent: '',
      infoBlockTitle: '',
      infoBlockIcon: '',
      infoBlockHelpText: '',
      personnel: [{
        count: ''
      }]
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
      this.infoBlockTitle = 'Personnel user for works';
      this.infoBlockContent = 'Enter the details of the personnel that will be involved in this project.';
    },
    getTransportModeTypeData: function () {
      return get('/static/personnel-input-data.json', {baseURL: window.location.origin})
        .then((response) => {
          this.personnelDropdown = response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    },
  },
  mounted() {
    this.getInformationCardData();
    this.getTransportModeTypeData();
  }
})
</script>