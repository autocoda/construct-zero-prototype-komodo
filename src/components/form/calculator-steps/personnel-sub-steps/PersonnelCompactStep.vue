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
      <div class="col-6 mb-3">
        <label for="personnel" class="form-label">How many workers will you have on site?</label>
        <select id="personnel" class="form-select" v-model="personnel.transportModeEmissions" @change="updatePersonnelData($event)">
          <option selected disabled="disabled">Please Select</option>
          <option 
            v-for="(value, key) in personnelDropdown" 
            :key="key" 
            :value="value"
          >
            {{ key }}</option>
        </select>
      </div>

      <PersonnelEmissions
        :display-separator-line="false"
        :personnel-transport-emissions="personnel.transportModeEmissions"
        :total-transport-emissions="personnelTransportEmissions"
      />
    </div>
  </div>
</template>
<script>
import {defineComponent} from 'vue'
import StepInformationCard from "@/components/card/StepInformationCard.vue";
import PersonnelEmissions from "@/components/section/PersonnelEmissions";
import {get} from "axios";

export default defineComponent({
  name: 'PersonnelCompactStep',
  components: {PersonnelEmissions, StepInformationCard},
  data() {
    return {
      personnelTransportEmissions: '--',
      personnelDropdown: '',
      infoBlockContent: '',
      infoBlockTitle: '',
      infoBlockIcon: '',
      infoBlockHelpText: '',
    }
  },
  computed: {
    step: function () {
      return (this.$route.params.step) ?? 'personnel'
    },
    personnel: {
      get() {
        return this.$store.getters.getPersonnel
      },
      set(value) {
        this.$store.commit('updatePersonnel', value);
      }
    },
  },
  methods: {
    updatePersonnelData: function (event) {
      let options = event.target.options;

      if (options.selectedIndex > -1) {
        let value = Number(options[options.selectedIndex].value);
        let transportEmissions = value / 1000;
        this.updatePersonnelTotals(value);
        this.personnelTransportEmissions = transportEmissions.toFixed(1);

        this.$store.commit('updateSinglePersonnelByKey', [0, {
          'vehicleCount': 1,
          'transportMode': 'Diesel Car / Small Van',
          'transportModeEmissions': value,
          'transportDistance': 400,
          "emissions": transportEmissions,
          "completed": true
        }]);
      }
    },
    updatePersonnelTotals: function (value) {
      const emissions = value / 1000;
      this.totalTransportEmissions = emissions;
      this.$store.commit('updateStepsCompleted', ['personnel-compact', true]);
      this.$store.commit('updateStepsCompleted', ['personnel-detailed', false]);
      this.$store.commit('updatePersonnelStepEmissions', emissions);
    },

    getInformationCardData: function ()  {
      this.infoBlockIcon = require('@/assets/images/calculator/steps/person.svg');
      this.infoBlockTitle = 'Personnel user for works';
      this.infoBlockContent = 'Enter the details of the personnel that will be involved in this project.';
    },
    getTransportModeTypeData: function () {
      return get('/static/personnel-input-data.json')
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