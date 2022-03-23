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
          <select class="form-select" v-model="item.poweredBy" @change="getEquipmentUnitValue(index, $event)">
            <option selected disabled="disabled">Please select fuel type</option>
            <option v-for="(key) in poweredBy" :key="key.fuelType" :value="key.tco2e" :name="key.inputUnit">
              {{ key.fuelType }}
            </option>
          </select>
        </td>
        <td>
          <input class="form-control readonly" type="text" v-model="item.unitType" disabled>
        </td>
        <td>
          <input class="form-control" type="number" v-model="item.totalValue" @input="commitValueChange(index, item)">
        </td>
        <td>
          <input class="form-control" type="number" v-model="item.distanceTravelled" @input="commitValueChange(index, item)">
        </td>
        <td>
          <select id="transport-mode" class="form-select" v-model="item.modeOfTransportation" @change="commitValueChange(index, item)">
            <option selected>Please Select</option>
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
import {roundValue} from "@/imports/util/roundValue";

export default defineComponent({
  name: 'EquipmentStep',
  components: {StepInformationCard},
  data() {
    return {
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
        return this.$store.getters.getUsedEquipment
      },
      set(value) {
        this.$store.commit('updateUsedEquipment', value);
      }
    },
    step: function () {
      return (this.$route.params.step) ?? 'equipment';
    }
  },
  methods: {
    commitValueChange: function (index, payload) {
      this.$store.commit('updateSingleEquipmentByKey', [index, payload]);
      this.getEquipmentEmissionsData();
    },
    getEquipmentUnitValue: function (index, event) {
      let options = event.target.options;
      if (options.selectedIndex > -1) {
        let name = options[options.selectedIndex].getAttribute('name');
        this.$store.commit('updateUsedEquipmentUnitName', {index, name});
      }
    },
    getEquipmentEmissionsData: function () {
      const savedEquipment = this.equipment;
      let totalEquipmentEmissions = 0;

      savedEquipment.forEach(equipment => {
        const baseEmissionsByPowerType = equipment.poweredBy;
        const baseEmissionsByModeOfTransportation = equipment.modeOfTransportation;
        const totalValue = equipment.totalValue;
        const distanceTravelled = equipment.distanceTravelled;

        if (
          (baseEmissionsByPowerType && !Number.isNaN(baseEmissionsByPowerType) )
          && (baseEmissionsByModeOfTransportation && !Number.isNaN(baseEmissionsByModeOfTransportation))
          && (totalValue && !Number.isNaN(totalValue) )
          && (distanceTravelled && !Number.isNaN(distanceTravelled))
        ) {
          const vehicleEmissions = (baseEmissionsByModeOfTransportation * distanceTravelled) / 0.62137;
          const equipmentEmission = baseEmissionsByPowerType * totalValue;
          const equipmentEmissions = (vehicleEmissions + equipmentEmission) / 1000;
          totalEquipmentEmissions += equipmentEmissions;
        }
      });

      this.$store.commit('updateEquipmentStepEmissions', totalEquipmentEmissions);
    },
    getInformationCardData: function () {
      this.infoBlockIcon = require('@/assets/images/calculator/steps/wrench.svg');
      this.infoBlockTitle = 'Equipment used for works';
      this.infoBlockContent = 'List any materials you will directly use to complete your works for this project.';
    },
    getFuelTypeData: function () {
      return get('/static/fuel-emissions-input-data.json', {baseURL: window.location.origin})
        .then((response) => {
          this.poweredBy = response.data;
        })
        .catch((error) => {
          throw error.response.data;
        });
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
    addRowItem: function() {
      this.$store.commit('updateUsedEquipment', {
        "equipmentName": null,
        "poweredBy": null,
        "unitType": null,
        "totalValue": null,
        "distanceTravelled": null,
        "modeOfTransportation": null
      });
    },
    removeRowItem: function(index) {
      this.$store.commit('removeSingleEquipmentByKey', index)
    }
  },
  mounted() {
    this.getInformationCardData();
    this.getFuelTypeData();
    this.getTransportModeTypeData();
  },
})
</script>