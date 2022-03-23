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
        <th class="first-column">Person(s)</th>
        <th>Model of transportation</th>
        <th>Powered by</th>
        <th>Total distance covered (miles)</th>
        <th>&nbsp;</th>
      </tr>
    </thead>
    <tbody class="tbody">
      <tr v-for="(item, index) in personnelDetailed" :key="index">
        <td class="first-column">
          <input class="form-control" type="text" v-model="item.persons">
        </td>
        <td>
          <select id="vehicles-types-used" class="form-select" v-model="item['transport-mode']">
            <option selected disabled="disabled">Please select transport mode</option>
            <option v-for="(value, key) in transportMethod" :key="key" :value="value">{{ key }}</option>
          </select>
        </td>
        <td>
          <select id="powered-by" class="form-select" v-model="item['powered-by']">
            <option selected disabled="disabled">Please Select</option>
            <option v-for="(value, key) in vehicleDropdownList" :key="key" :value="value">{{ key }}</option>
          </select>
        </td>
        <td>
          <input class="form-control" type="text" v-model="item['distance-covered']">
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
</template>
<script>
import {defineComponent} from 'vue'
import StepInformationCard from "@/components/card/StepInformationCard.vue";
import {get} from "axios";

export default defineComponent({
  name: 'PersonnelDetailedStep',
  components: {StepInformationCard},
  data() {
    return {
      infoBlockContent: '',
      infoBlockTitle: '',
      infoBlockIcon: '',
      infoBlockHelpText: '',
      transportMethod: '',
      vehicleDropdownList: '',
      personnelDetailed: [{
        'persons': '',
        'transport-mode': '',
        'powered-by': '',
        'distance-covered': '',
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
      this.infoBlockTitle = 'Personnel used for works';
      this.infoBlockContent = 'List the number of workers and their mode of transport to site. If any workers are sharing transportation, enter them into the same line.';
    },
    addRowItem() {
      this.personnelDetailed.push({
        'persons': '',
        'transport-mode': '',
        'powered-by': '',
        'distance-covered': '',
      })
    },
    removeRowItem(index) {
      this.personnelDetailed.splice(index, 1)
    },
    getTransportModeTypeData: function () {
      return get('/static/transport-mode-input-data.json', {baseURL: window.location.origin})
        .then((response) => {
          this.transportMethod = response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    },
    getVehicleEmissionData: function () {
      return get('/static/vehicle-input-data.json', {baseURL: window.location.origin})
        .then((response) => {
          this.vehicleDropdownList = response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    },
  },
  mounted() {
    this.getInformationCardData();
    this.getTransportModeTypeData();
    this.getVehicleEmissionData();
  }
})
</script>