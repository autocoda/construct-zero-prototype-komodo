<template>
  <StepInformationCard
    :info-block-icon="infoBlockIcon"
    :info-block-title="infoBlockTitle"
    :info-block-content="infoBlockContent"
    :info-block-help-text="infoBlockHelpText"
  />
  <div class="row">
    <table class="table table-responsive equipment-table">
      <thead class="thead">
        <tr>
          <th>Person(s)</th>
          <th>Model of transportation</th>
          <th>Powered by</th>
          <th>Total distance covered (miles)</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr v-for="(item, index) in personnelDetailed" :key="index">
          <td>
            <input class="form-control" type="text" v-model="item.persons">
          </td>
          <td>
            <select id="vehicles-types-used" class="form-select" v-model="item['transport-mode']">
              <option selected>Please Select</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </td>
          <td>
            <select id="powered-by" class="form-select" v-model="item['powered-by']">
              <option selected>Please Select</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </td>
          <td>
            <input class="form-control" type="text" v-model="item['distance-covered']">
          </td>
          <td>
            <img class="vertical-align" width="9" height="12" alt="Remove row" src="@/assets/images/calculator/steps/delete.svg" @click="removeRowItem(index)">
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
  </div>
</template>
<script>
import {defineComponent} from 'vue'
import StepInformationCard from "@/components/card/StepInformationCard.vue";

export default defineComponent({
  name: 'PersonnelDetailedStep',
  components: {StepInformationCard},
  data() {
    return {
      infoBlockContent: '',
      infoBlockTitle: '',
      infoBlockIcon: '',
      infoBlockHelpText: '',
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
    }
  },
  mounted() {
    this.getInformationCardData();
  }
})
</script>