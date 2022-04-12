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
              <div class="fw-bold col-6 text-end">
                {{ typeof materialsEmissions.bricksEmissions === 'number' ? materialsEmissions.bricksEmissions.toFixed(1) : '--' }} kg
              </div>
              <div class="col-6">Mortar:</div>
              <div class="fw-bold col-6 text-end">
                {{ typeof materialsEmissions.mortarEmissions === 'number' ? materialsEmissions.mortarEmissions.toFixed(1) : '--' }} kg
              </div>
              <div class="col-6">Vehicles:</div>
              <div class="fw-bold col-6 text-end">
                {{ typeof materialsEmissions.vehicleEmissions === 'number' ? materialsEmissions.vehicleEmissions.toFixed(1) : '--' }} kg
              </div>
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
                  <div class="fw-bold col-6 text-end" v-if="typeof item.emissions === 'number'">
                    {{ toFixedDecimalNotation(item.emissions * 1000) }} kg
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-6">Total:</div>
              <div class="col-6 fw-bold font-usual text-end">{{ equipmentStepEmissions }} tonnes</div>
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
              <div class="col-12" v-if="item.completed === true">
                <div class="row">
                  <div class="col-6">Transport:</div>
                  <div class="fw-bold col-6 text-end" v-if="typeof item.emissions === 'number'">
                    {{ measureUnitConvert(item.emissions) }} kg
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-6">Total:</div>
              <div class="col-6 fw-bold font-usual text-end">{{ personnelStepEmissions }} tonnes</div>
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
import {toFixedNotation} from "@/imports/util/toFixedNotation";

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
      if (typeof this.$store.getters.getMaterialsStepEmissions === "number") {
        return toFixedNotation(this.$store.getters.getMaterialsStepEmissions);
      }

      return this.$store.getters.getMaterialsStepEmissions;
    },
    equipmentDetailedEmissions: function () {
      return this.$store.getters.getEquipment;
    },
    equipmentStepEmissions: function () {
      if (typeof this.$store.getters.getEquipmentStepEmissions === "number") {
        return toFixedNotation(this.$store.getters.getEquipmentStepEmissions, 1000, 'divide');
      }

      return this.$store.getters.getEquipmentStepEmissions;
    },
    personnelDetailedEmissions: function () {
      return this.$store.getters.getPersonnel;
    },
    personnelStepEmissions: function () {
      if (typeof this.$store.getters.getPersonnelStepEmissions === "number") {
        return toFixedNotation(this.$store.getters.getPersonnelStepEmissions);
      }

      return this.$store.getters.getPersonnelStepEmissions;
    },
    summaryStepTotals: function () {
      if (
        typeof this.$store.getters.getMaterialsStepEmissions === "number"
        && typeof this.$store.getters.getEquipmentStepEmissions === "number"
        && typeof this.$store.getters.getPersonnelStepEmissions === "number"
      ) {
        this.$store.commit('updateStepsCompleted', ['summary', true]);
        let stepTotal = (
          this.$store.getters.getMaterialsStepEmissions
          + this.$store.getters.getEquipmentStepEmissions
          + this.$store.getters.getPersonnelStepEmissions
        );

        return toFixedNotation(stepTotal);
      }

      return '--';
    },
  },
  methods: {
    toFixedDecimalNotation: function (value) {
      return toFixedNotation(value);
    },
    measureUnitConvert: function (value) {
      const stepsState = this.$store.getters.getStepsCompleted;

      if (stepsState['personnel-compact'] === true) {
        return value
      }

      return toFixedNotation(value * 1000);
    },
    resetApplicationState: function () {
      this.$store.dispatch('resetState');
      this.$router.push({name: 'home'});
    }
  }
})
</script>