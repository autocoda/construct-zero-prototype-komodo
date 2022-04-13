<template>
  <StepInformationCard
    :info-block-icon="infoBlockIcon"
    :info-block-title="infoBlockTitle"
    :info-block-content="infoBlockContent"
    :info-block-help-text="infoBlockHelpText"
  />

  <table class="table table-responsive equipment-table">
    <caption class="visually-hidden">Equipment Table</caption>
    <thead class="thead">
      <tr>
        <th class="first-column">Equipment</th>
        <th>Powered By</th>
        <th>Unit</th>
        <th>Total Value</th>
        <th>Distance travelled to site (miles)</th>
        <th>Mode of Transportation</th>
        <th>&nbsp;</th>
      </tr>
    </thead>
    <tbody class="tbody">
      <tr v-for="(item, index) in equipment" :key="index">
        <td class="first-column">
          <input class="form-control" type="text" v-model="item.equipmentName" @input="commitValueChange(index, item)">
        </td>
        <td>
          <select class="form-select" v-model="item.poweredBy" @change="getEquipmentUnitValue(index, item, $event)">
            <option selected disabled="disabled">Please select fuel type</option>
            <option v-for="(key) in poweredBy" :key="key.fuelType" :value="key.tco2e" :name="key.inputUnit" :data-power-type="key.fuelTypeId">
              {{ key.fuelType }}
            </option>
          </select>
        </td>
        <td class="readonly-column">
          <input class="form-control readonly" type="text" v-model="item.measureUnitType" disabled>
        </td>
        <td>
          <input class="form-control input-number" type="number" v-model="item.itemCount" @input="commitValueChange(index, item)">
        </td>
        <td>
          <input
            :class="[
              'form-control input-number',
              {'invisible' : hasTransportExcluded(item.powerType) }
            ]"
            type="number"
            v-model="item.transportDistance"
            @input="commitValueChange(index, item)"
          >
        </td>
        <td>
          <select
            id="transport-mode"
            :class="[
              'form-select',
              {'invisible' : hasTransportExcluded(item.powerType) }
            ]"
            v-model="item.transportModeEmissions"
            @click="commitValueChange(index, item)"
          >
            <option selected disabled="disabled">Please select transport mode</option>
            <option v-for="(value, key) in transportMethod" :key="key" :value="value">{{ key }}</option>
          </select>
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
  name: 'EquipmentStep',
  components: {StepInformationCard},
  data() {
    return {
      powerTypesWithTransportExcluded: ['gas', 'water', 'grid-electricity'],
      poweredBy: '',
      transportMethod: '',
      infoBlockContent: '',
      infoBlockTitle: '',
      infoBlockIcon: '',
      infoBlockHelpText: '',
    }
  },
  computed: {
    equipment: {
      get() {
        return this.$store.getters.getEquipment
      },
      set(value) {
        this.$store.commit('updateEquipment', value);
      }
    },
    step: function () {
      return (this.$route.params.step) ?? 'equipment';
    },
  },
  methods: {
    hasTransportExcluded: function (powerType) {
      return this.powerTypesWithTransportExcluded.includes(powerType);
    },
    commitValueChange: function (index, payload) {
      this.$store.commit('updateSingleEquipmentByKey', [index, payload]);
      this.getEquipmentEmissionsData();
    },
    getEquipmentUnitValue: function (index, item, event) {
      let options = event.target.options;
      if (options.selectedIndex > -1) {
        let name = options[options.selectedIndex].getAttribute('name');
        let itemEmissions = options[options.selectedIndex].getAttribute('value');
        let powerType = options[options.selectedIndex].getAttribute('data-power-type');

        this.$store.commit('updateEquipmentPowerUnitName', [index, name]);
        this.$store.commit('updateEquipmentPowerType', [index, powerType]);
        this.$store.commit('updateEquipmentPowerTypeEmissions', [index, Number(itemEmissions)]);

        this.commitValueChange(index, item);
      }
    },
    getItemEmissions: function (index, item) {
      let excludesTransportEmissions = this.hasTransportExcluded(item.powerType);

      //-- Item requires transport data
      if (!excludesTransportEmissions && item.transportDistance === '') {
        this.$store.commit('updateEquipmentDataCompletion', [index, false]);

        return 0;
      }

      //-- Item does not require transport data
      if (excludesTransportEmissions && item.itemCount && item.powerTypeEmissions) {
        return item.itemCount * item.powerTypeEmissions.toPrecision(12);
      }

      //-- Incomplete - powered by required transport data, thi marks items as unusable for emission calculation
      if (!excludesTransportEmissions && !item.transportDistance && !item.transportModeEmissions) {
        this.$store.commit('updateEquipmentDataCompletion', [index, false]);

        return 0;
      }

      //-- Item has all fields filled
      if (!excludesTransportEmissions && item.powerTypeEmissions && item.itemCount && item.transportDistance && item.transportModeEmissions) {
        const transportDistanceInKm = item.transportDistance * 1.609344;
        const vehicleEmissions = (transportDistanceInKm.toPrecision(12) * item.transportModeEmissions.toPrecision(12) * item.itemCount);
        const equipmentEmission = item.itemCount * item.powerTypeEmissions.toPrecision(12);

        return (vehicleEmissions + equipmentEmission);
      }

      return 0;
    },
    getEquipmentEmissionsData: function () {
      let totalEquipmentEmissions = 0;

      this.equipment.forEach((item, index) => {
        let itemEmissions = this.getItemEmissions(index, item);

        if (itemEmissions !== 0) {
          this.$store.commit('updateEquipmentEmissions', [index, itemEmissions]);
          this.$store.commit('updateEquipmentDataCompletion', [index, true]);
          this.$store.commit('updateStepsCompleted', ['equipment', true]);
        }

        if (item.completed === false) {
          this.$store.commit('updateStepsCompleted', ['equipment', false]);
        }

        totalEquipmentEmissions += itemEmissions
      });

      if (this.equipment.length === 0) {
        this.$store.commit('updateStepsCompleted', ['equipment', false]);
      }

      this.$store.commit('updateEquipmentStepEmissions', totalEquipmentEmissions);
    },
    getInformationCardData: function () {
      this.infoBlockIcon = require('@/assets/images/calculator/steps/wrench.svg');
      this.infoBlockTitle = 'Equipment used for works';
      this.infoBlockContent = 'List any equipment you will directly use to complete your works for this project.';
    },
    getFuelTypeData: function () {
      return get('/static/fuel-emissions-input-data.json')
        .then((response) => {
          this.poweredBy = response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    },
    getTransportModeTypeData: function () {
      return get('/static/transport-mode-input-data.json')
        .then((response) => {
          this.transportMethod = response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
    },
    addRowItem: function () {
      this.$store.commit('updateEquipment', {
        "equipmentName": null,
        "powerTypeEmissions": null,
        "powerType": null,
        "measureUnitType": null,
        "itemCount": null,
        "transportDistance": null,
        "transportModeEmissions": null,
        "emissions": null,
        "completed": false
      });
    },
    removeRowItem: function (index) {
      this.$store.commit('removeSingleEquipmentByKey', index);
      this.getEquipmentEmissionsData();
    }
  },
  mounted() {
    this.getInformationCardData();
    this.getFuelTypeData();
    this.getTransportModeTypeData();
  },
})
</script>