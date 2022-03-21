<template>
  <MaterialsStep
    v-if="step === 'materials'"
    ref="materials"
  />
  <EquipmentStep
    v-else-if="step === 'equipment'"
    ref="equipment"
  />
  <PersonnelStep
    v-else-if="step === 'personnel'"
    ref="personnel"
  />
  <PersonnelCompactStep
    v-else-if="step === 'personnel-compact'"
    ref="personnel-compact"
  />
  <PersonnelDetailedStep
    v-else-if="step === 'personnel-detailed'"
    ref="personnel-detailed"
  />
  <SummaryStep
    v-else-if="step === 'summary'"
    ref="summary"
  />
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import EquipmentStep from "@/components/form/calculator-steps/Equipment.vue";
import MaterialsStep from "@/components/form/calculator-steps/Materials.vue";
import PersonnelStep from "@/components/form/calculator-steps/Personnel.vue";
import PersonnelCompactStep from "@/components/form/calculator-steps/personnel-sub-steps/PersonnelCompactStep.vue";
import PersonnelDetailedStep from "@/components/form/calculator-steps/personnel-sub-steps/PersonnelDetailedStep.vue";
import SummaryStep from "@/components/form/calculator-steps/Summary.vue";

@Options({
  components: {
    EquipmentStep, MaterialsStep, PersonnelStep, PersonnelCompactStep, PersonnelDetailedStep, SummaryStep
  },
  computed: {
    step: function () {
      return (this.$route.params.step) ?? 'materials'
    }
  }
})

export default class CalculatorSteps extends Vue {}
</script>