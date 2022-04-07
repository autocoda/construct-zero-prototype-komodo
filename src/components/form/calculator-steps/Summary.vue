<template>
  <div class="card bg-white p-4">
    <div class="row">
      <div class="col-12 mb-4">
        <div class="row">
          <div class="col-7">
            <h2 class="fw-bold  font-usual">Your Project's Carbon Footprint</h2>
            <p>Here's a summary of the likely carbon emissions from your project according to the materials, equipment and personnel you've added.</p>
          </div>
          <div class="col-5 d-flex justify-content-end align-items-baseline">
            <img width="43" src="@/assets/images/calculator/steps/summary/leaf.svg" alt="Leaf Icon">
          </div>
        </div>
      </div>

      <div class="col-12" v-if="materialsStepEmissions !== '--'">
        <div class="row">
          <div class="col-12">
            <h2 class="fw-lighter text-uppercase step-heading">Materials</h2>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-6">Bricks:</div>
              <div class="fw-bold col-6 text-end">{{ materialsEmissions.bricksEmissions }} kg</div>
              <div class="col-6">Mortar:</div>
              <div class="fw-bold col-6 text-end">{{ materialsEmissions.mortarEmissions }} kg</div>
              <div class="col-6">Vehicles:</div>
              <div class="fw-bold col-6 text-end">{{ materialsEmissions.vehicleEmissions }} kg</div>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-6">Total:</div>
              <div class="col-6 fw-bold font-usual text-end">{{ materialsStepEmissions }} tonnes</div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12" v-if="equipmentStepEmissions">
        <div class="row">
          <div class="col-12 my-3">
            <hr>
          </div>
          <div class="col-12">
            <h2 class="fw-lighter text-uppercase step-heading">Equipment</h2>
          </div>
          <div class="col-6">
            <div class="row" v-for="(item, index) in equipmentDetailedEmissions" :key="index">
              <div class="col-12" v-if="item.completed === true">
                <div class="row">
                  <div class="col-6">{{ item.equipmentName }}</div>
                  <div class="fw-bold col-6 text-end">{{ item.emissions.toFixed(4) }} kg</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-6">Total:</div>
              <div class="col-6 fw-bold font-usual text-end">{{ equipmentStepEmissions.toFixed(4) }} tonnes</div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12" v-if="personnelStepEmissions">
        <div class="row">
          <div class="col-12 my-3">
            <hr>
          </div>
          <div class="col-12">
            <h2 class="fw-lighter text-uppercase step-heading">Personnel</h2>
          </div>
          <div class="col-6">
            <div class="row" v-for="(item, index) in personnelDetailedEmissions" :key="index">
              <div class="col-12" v-if="item.completed">
                <div class="row">
                  <div class="col-6">Transport:</div>
                  <div class="fw-bold col-6 text-end">{{ item.emissions.toFixed(2) }} kg</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-6">Total:</div>
              <div class="col-6 fw-bold font-usual text-end">{{ personnelStepEmissions.toFixed(2) }} tonnes</div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 my-3">
        <hr>
      </div>

      <div class="col-6">
        <div class="align-items-baseline d-flex flex-row">
          <img class="me-1" width="12" height="12" src="@/assets/images/calculator/steps/info.svg" alt="Info Icon Image">
          <p>You can return to any of the previous steps and enter more thorough information for a more accurate total before confirming.</p>
        </div>
      </div>

      <div class="col-6">
        <div class="row" v-if="summaryStepTotals !== '--'">
          <div class="col-3">Total:</div>
          <div class="col-9 fw-bold font-usual text-end h2 my-0">{{ summaryStepTotals }} tonnes</div>
        </div>
        <div class="row text-danger" v-else>
          <div class="col-8 offset-4">
            <div class="align-items-baseline d-flex flex-row">
              <img class="me-1" src="@/assets/images/calculator/steps/error.svg" alt="Error Icon">
              <p>
                Sorry, something went wrong with this calculation,
                <a @click="resetApplicationState()" class="cursor-pointer text-danger text-decoration-underline">please try again</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'SummaryStep',
  computed: {
    step: function () {
      return (this.$route.params.step) ?? 'summary';
    },
    materialsEmissions: function () {
      return this.$store.getters.getMaterials;
    },
    materialsStepEmissions: function () {
      return this.$store.getters.getMaterialsStepEmissions;
    },
    equipmentDetailedEmissions: function () {
      return this.$store.getters.getEquipment;
    },
    equipmentStepEmissions: function () {
      return this.$store.getters.getEquipmentStepEmissions;
    },
    personnelDetailedEmissions: function () {
      return this.$store.getters.getPersonnel;
    },
    personnelStepEmissions: function () {
      return this.$store.getters.getPersonnelStepEmissions;
    },
    summaryStepTotals: function () {
      if (this.materialsStepEmissions && this.equipmentStepEmissions && this.personnelStepEmissions) {
        this.$store.commit('updateStepsCompleted', ['summary', true]);
        return parseFloat((this.materialsStepEmissions + this.equipmentStepEmissions + this.personnelStepEmissions).toFixed(2));
      }

      return '--';
    },
  },
  methods: {
    resetApplicationState: function () {
      this.$store.dispatch('resetState');
      this.$router.push({name: 'home'});
    }
  }
})
</script>