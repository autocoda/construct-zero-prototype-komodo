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
        <th class="first-column">Vehicle(s)</th>
        <th>Mode of transportation</th>
        <th>Total distance covered (miles)</th>
        <th>&nbsp;</th>
      </tr>
    </thead>
    <tbody class="tbody">
      <tr v-for="(item, index) in personnel" :key="index">
        <td class="first-column">
          <input class="form-control" type="number" v-model="item.vehicleCount" @input="commitValueChange(index, item)">
        </td>
        <td>
          <select id="vehicles-types-used" class="form-select" v-model="item.transportModeEmissions" @change="setTransportModeValue(index, $event)">
            <option selected disabled="disabled">Please select transport mode</option>
            <option v-for="(value, key) in transportMethod" :key="key" :value="value" :name="key">{{ key }}</option>
          </select>
        </td>
        <td>
          <input class="form-control" type="number" v-model="item.transportDistance" @input="commitValueChange(index, item)">
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
      :personnel-transport-emissions="personnelTransportEmissions"
      :total-transport-emissions="personnelTotalTransportEmissions"
    />
  </div>
</template>
<script>
import {defineComponent} from 'vue'
import StepInformationCard from "@/components/card/StepInformationCard.vue";
import PersonnelEmissions from "@/components/section/PersonnelEmissions";
import {get} from "axios";
import {roundValue} from "@/imports/util/roundValue";

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
    getInformationCardData() {
      this.infoBlockIcon = require('@/assets/images/calculator/steps/person.svg');
      this.infoBlockTitle = 'Personnel used for works';
      this.infoBlockContent = 'List the number of workers and their mode of transport to site. If any workers are sharing transportation, enter them into the same line.';
    },
    addRowItem() {
      this.$store.commit('updatePersonnel', {
        'vehicleCount': '',
        'transportMode': '',
        'transportModeEmissions': '',
        'transportDistance': '',
      });
    },
    removeRowItem(index) {
      this.$store.commit('removeSinglePersonnelByKey', index);
      this.updatePersonnelTotals();
    },
    updatePersonnelTotals: function () {
      const personnel = this.personnel;
      let totalTransportEmissions = 0;
      let personnelTransportMethodEmissions = 0;

      personnel.forEach(equipment => {
        const vehicleCount = equipment.vehicleCount;
        const transportModeEmissions = equipment.transportModeEmissions;
        const transportDistance = equipment.transportDistance;

        if (
          (vehicleCount && !Number.isNaN(vehicleCount) )
          && (transportModeEmissions && !Number.isNaN(transportModeEmissions))
          && (transportDistance && !Number.isNaN(transportDistance) )
        ) {

          personnelTransportMethodEmissions += (transportModeEmissions * vehicleCount) / 1000000;
          totalTransportEmissions += ((transportModeEmissions * transportDistance) / 0.62137) / 1000000 * vehicleCount;
        }
      });

      this.personnelTransportEmissions = personnelTransportMethodEmissions.toFixed(8);
      this.personnelTotalTransportEmissions = totalTransportEmissions.toFixed(8);
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
      }
    },
    getTransportModeTypeData: function () {
      return get('/static/transport-methods-input-data.json', {baseURL: window.location.origin})
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