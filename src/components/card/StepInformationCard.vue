<template>
  <div class="row">
    <div class="col-12 d-flex justify-content-between form-step-information my-3">
      <div class="d-flex flex-column form-step-text">
        <div class="d-flex flex-row fw-bold">
          <img width="21" height="21" class="me-2" :src="infoBlockIcon" :alt="infoBlockTitle + 'image'">
          {{ infoBlockTitle }}
        </div>
        <div class="d-block mt-2">{{ infoBlockContent }}</div>
      </div>
      <div v-if="infoBlockHelpText.length !== 0" class="align-items-baseline card p-3 d-flex flex-row form-step-help rounded">
        <img class="me-1" width="12" height="12" src="@/assets/images/calculator/steps/info.svg" alt="Info Icon Image">{{ infoBlockHelpText }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'StepInformationCard',
  props: {
    infoBlockTitle: {type: String, required: false},
    infoBlockIcon: {type: String, required: false},
    infoBlockContent: {type: String, required: false},
    infoBlockHelpText: {type: String, required: false},
  },
})
</script>