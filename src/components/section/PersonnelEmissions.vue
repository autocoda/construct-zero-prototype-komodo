<template>
  <div v-if="displaySeparatorLine" class="col-12 my-3">
    <hr>
  </div>
  <div class="col-12">
    <h2 class="fw-lighter text-uppercase step-heading">Emissions</h2>
  </div>
  <div class="col-6 d-none">
    <div class="row" v-if="personnelTransportEmissions !== ''">
      <div class="col-6">Transport:</div>
      <div class="fw-bold col-6">{{ personnelTransportEmissions }}kg</div>
    </div>
  </div>
  <div class="col-6">
    <div class="row">
      <div class="col-6">Total:</div>
      <div class="col-6 fw-bold text-end">{{ totalTransportEmissions }} tonnes</div>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'PersonnelEmissions',
  props: {
    displaySeparatorLine: {default: true, type: Boolean, required: true},
    personnelTransportEmissions: {default: '--', type: [Number, String], required: false},
    totalTransportEmissions: {default: '--', type: [Number, String], required: true},
  },
})
</script>