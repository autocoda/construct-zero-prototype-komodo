<template>
  <StepInformationCard
    :info-block-icon="infoBlockIcon"
    :info-block-title="infoBlockTitle"
    :info-block-content="infoBlockContent"
    :info-block-help-text="infoBlockHelpText"
  />

  <table class="table table-responsive equipment-table">
    <caption class="visually-hidden">Detailed Personnel Table</caption>
    <thead class="thead">
      <tr>
        <th class="first-column">Mode of transportation</th>
        <th>Vehicle(s) amount</th>
        <th>Total distance covered (miles)</th>
        <th>&nbsp;</th>
      </tr>
    </thead>
    <tbody class="tbody">
      <tr v-for="(item, index) in personnel" :key="index">
        <td class="first-column">
          <select id="vehicles-types-used" class="form-select" v-model="item.transportModeEmissions" @change="setTransportModeValue(index, $event)">
            <option selected disabled="disabled">Please select transport mode</option>
            <option v-for="(value, key) in transportMethod" :key="key" :value="value" :name="key">{{ key }}</option>
          </select>
        </td>
        <td>
          <input class="form-control input-number" type="number" v-model="item.vehicleCount" @input="commitValueChange(index, item)">
        </td>
        <td>
          <input class="form-control input-number" type="number" v-model="item.transportDistance" @input="commitValueChange(index, item)">
          <input class="form-control" type="hidden" v-model="item.transportMode">
        </td>
        <td>
          <img
            class="vertical-align remove-row cursor-pointer"
            width="9"
            height="12"
            title="Remove row"
            alt="Bin icon"
            src="@/assets/images/calculator/steps/delete.svg"
            @click="removeRowItem(index)"
          >
        </td>
      </tr>
    </tbody>
    <tfoot class="tfoot">
      <tr>
        <td colspan="7">
          <button class="btn btn-add-row float-end d-flex align-items-center" @click="addRowItem()">
            <img class="me-1" width="9" height="12" alt="Remove row" src="@/assets/images/calculator/table/icon-plus.svg"> Add row
          </button>
        </td>
      </tr>
    </tfoot>
  </table>

  <div class="row">
    <PersonnelEmissions
      :display-separator-line="false"
      :total-transport-emissions="personnelTotalTransportEmissions"
    />
  </div>
</template>
<script>
import {defineComponent} from 'vue'
import StepInformationCard from "@/components/card/StepInformationCard.vue";
import PersonnelEmissions from "@/components/section/PersonnelEmissions";
import {get} from "axios";

export default defineComponent({
  name: 'PersonnelDetailedStep',
  components: {PersonnelEmissions, StepInformationCard},
  data() {
    return {
      personnelTransportEmissions: '--',
      personnelTotalTransportEmissions: '--',
      infoBlockContent: '',
      infoBlockTitle: '',
      infoBlockIcon: '',
      infoBlockHelpText: '',
      transportMethod: '',
      vehicleDropdownList: '',
    }
  },
  computed: {
    step: function () {
      return (this.$route.params.step) ?? 'personnel';
    },
    personnel: {
      get() {
        return this.$store.getters.getPersonnel;
      },
      set(value) {
        this.$store.commit('updatePersonnel', value);
      }
    },
  },
  methods: {
    getInformationCardData() {
      this.infoBlockIcon = require('@/assets/images/calculator/steps/person.svg');
      this.infoBlockTitle = 'Personnel used for works';
      this.infoBlockContent = 'List the number of workers and their mode of transport to site. If any workers are sharing transportation, enter them into the same line.';
    },
    addRowItem() {
      this.$store.commit('updatePersonnel', {
        'vehicleCount': null,
        'transportMode': null,
        'transportModeEmissions': null,
        'transportDistance': null,
        "emissions": null,
        "completed": false
      });
    },
    removeRowItem(index) {
      this.$store.commit('removeSinglePersonnelByKey', index);
      this.updatePersonnelTotals();
    },
    getTotalVehicleEmissions: function (vehicleCount, transportModeEmissions, transportDistance) {
      if (vehicleCount && transportModeEmissions && transportDistance) {
        let milesConvertedToKmValue = transportDistance * 1.609344;
        let perItemsEmissions = milesConvertedToKmValue * transportModeEmissions / 1000000;

        return perItemsEmissions * vehicleCount;
      }
      return 0;
    },
    getTransportMethodEmissions: function (vehicleCount, transportModeEmissions) {
      if (vehicleCount && transportModeEmissions) {
        return transportModeEmissions * vehicleCount / 1000000;
      }
      return 0;
    },
    updatePersonnelTotals: function () {
      let totalTransportEmissions = 0;
      let personnelTransportMethodEmissions = 0;

      this.personnel.forEach((row, index) => {
        const vehicleCount = row.vehicleCount;
        const transportModeEmissions = row.transportModeEmissions;
        const transportDistance = row.transportDistance;
        let rowTransportModeEmissions = this.getTotalVehicleEmissions(vehicleCount, transportModeEmissions, transportDistance);

        if (rowTransportModeEmissions !== 0) {
          this.$store.commit('updatePersonnelRowEmissions', [index, rowTransportModeEmissions]);
          this.$store.commit('updatePersonnelRowDataCompletion', [index, true]);
          this.$store.commit('updateStepsCompleted', ['personnel-detailed', true]);

          personnelTransportMethodEmissions += this.getTransportMethodEmissions(vehicleCount, transportModeEmissions);
          totalTransportEmissions += this.getTotalVehicleEmissions(vehicleCount, transportModeEmissions, transportDistance);
        }

        if (row.completed === false) {
          this.$store.commit('updateStepsCompleted', ['personnel-detailed', false]);
        }
      });

      if (this.personnel.length === 0) {
        this.$store.commit('updateStepsCompleted', ['personnel-detailed', false]);
      }

      this.personnelTransportEmissions = personnelTransportMethodEmissions.toFixed(6);
      this.personnelTotalTransportEmissions = totalTransportEmissions.toFixed(6);

      this.$store.commit('updatePersonnelStepEmissions', totalTransportEmissions);
    },
    commitValueChange: function (index, payload) {
      this.$store.commit('updateSinglePersonnelByKey', [index, payload]);
      this.updatePersonnelTotals();
    },
    setTransportModeValue: function (index, event) {
      let options = event.target.options;
      if (options.selectedIndex > -1) {
        let name = options[options.selectedIndex].getAttribute('name');
        this.$store.commit('updatePersonnelTransportModeName', {index, name});
        this.updatePersonnelTotals();
      }
    },
    getTransportModeTypeData: function () {
      return get('/static/transport-methods-input-data.json')
        .then((response) => {
          this.transportMethod = response.data;
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