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
      <tr v-for="(item, index) in items" :key="index">
        <td class="first-column">
          <input class="form-control" type="text" v-model="item.equipment">
        </td>
        <td>
          <select id="vehicles-types-used" class="form-select" v-model="item.powered">
            <option selected>Please Select</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </td>
        <td>
          <input class="form-control" type="text" v-model="item.unit">
        </td>
        <td>
          <input class="form-control" type="text" v-model="item['total-value']">
        </td>
        <td>
          <input class="form-control" type="text" v-model="item['distance-travelled']">
        </td>
        <td>
          <select id="transport-mode" class="form-select" v-model="item['transport-mode']">
            <option selected>Please Select</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
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

export default defineComponent({
  name: 'EquipmentStep',
  components: {StepInformationCard},
  data() {
    return {
      items: [
        {
          "equipment": '',
          "powered": '',
          "unit": '',
          "total-value": '',
          "distance-travelled": '',
          "travel-mode": ''
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
      return (this.$route.params.step) ?? 'equipment'
    }
  },
  methods: {
    getInformationCardData() {
      this.infoBlockIcon = require('@/assets/images/calculator/steps/wrench.svg');
      this.infoBlockTitle = 'Equipment used for works';
      this.infoBlockContent = 'List any materials you will directly use to complete your works for this project.';
    },
    addRowItem() {
      this.items.push({
        "equipment": '',
        "powered": '',
        "unit": '',
        "total-value": '',
        "distance-travelled": '',
        "travel-mode": ''
      })
    },
    removeRowItem(index) {
      this.items.splice(index, 1)
    }
  },
  mounted() {
    this.getInformationCardData();
  },
})
</script>