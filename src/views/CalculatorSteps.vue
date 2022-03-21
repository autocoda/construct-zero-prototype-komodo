<template>
  <MaterialsStep
    v-if="isActiveStep('materials')"
    ref="materials"
  />
  <EquipmentStep
    v-else-if="isActiveStep('equipment')"
    ref="equipment"
  />
  <PersonnelStep
    v-else-if="isActiveStep('personnel')"
    ref="personnel"
  />
  <PersonnelCompactStep
    v-else-if="isActiveStep('personnel-compact')"
    ref="personnel-compact"
  />
  <PersonnelDetailedStep
    v-else-if="isActiveStep('personnel-detailed')"
    ref="personnel-detailed"
  />
  <SummaryStep
    v-else-if="isActiveStep('summary')"
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
  },
  methods: {
    isActiveStep(expectedStep: string) {
      return this.step === expectedStep;
    }
  }
})

export default class CalculatorSteps extends Vue {}
</script>