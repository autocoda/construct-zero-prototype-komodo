<template>
  <div class="card bg-white p-4">
    <div class="row">
      <div class="col-12">
        <h2 class="fw-lighter text-uppercase step-heading">Emissions</h2>
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-6">Bricks</div>
          <div class="fw-bold col-6">--kg</div>
          <div class="col-6">Mortar</div>
          <div class="fw-bold col-6">--kg</div>
          <div class="col-6">Vehicles</div>
          <div class="fw-bold col-6">--kg</div>
        </div>
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-6">Total</div>
          <div class="col-6 fw-bold text-end">2 tonnes</div>
        </div>
      </div>

      <div class="col-12 my-3">
        <hr>
      </div>
      <div class="col-12">
        <h2 class="fw-lighter text-uppercase step-heading">Equipment</h2>
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-6">Equipment 1</div>
          <div class="fw-bold col-6">--kg</div>
          <div class="col-6">Equipment 2</div>
          <div class="fw-bold col-6">--kg</div>
        </div>
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-6">Total</div>
          <div class="col-6 fw-bold text-end">2 tonnes</div>
        </div>
      </div>

      <div class="col-12 my-3">
        <hr>
      </div>
      <div class="col-12">
        <h2 class="fw-lighter text-uppercase step-heading">Personnel</h2>
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-6">Embodied</div>
          <div class="fw-bold col-6">--kg</div>
          <div class="col-6">Transport</div>
          <div class="fw-bold col-6">--kg</div>
        </div>
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-6">Total</div>
          <div class="col-6 fw-bold text-end">2 tonnes</div>
        </div>
      </div>

      <div class="col-12 my-3">
        <hr>
      </div>

      <div class="col-6">
        <div class="align-items-baseline p-3 d-flex flex-row">
          <img class="me-1" width="12" height="12" src="@/assets/images/calculator/steps/info.svg" alt="Info Icon Image">
          You can return to any of the previous steps and enter more thorough information for a more accurate total before confirming.
        </div>
      </div>

      <div class="col-6">
        <div class="row">
          <div class="col-6">Total</div>
          <div class="col-6 fw-bold text-end h2 my-0">6 tonnes</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'SummaryStep',
  computed: {
    step: function () {
      return (this.$route.params.step) ?? 'summary'
    }
  }
})
</script>