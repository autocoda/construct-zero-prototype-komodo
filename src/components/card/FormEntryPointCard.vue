<template>
  <div class="mx-auto form-entry-card d-flex flex-column justify-content-center">
    <h2 class="fw-bold font-usual text-center">{{ title }}</h2>
    <img
      v-if="image.length !== 0"
      class="img-fluid mx-auto my-2"
      loading="lazy"
      :width="image.width"
      :height="image.height"
      :src="image.src"
      :alt="image.alt"
    >
    <h3 class="fw-bold font-usual text-center">{{ subTitle }}</h3>
    <div class="content my-3 text-center">
      {{ paragraph }}
    </div>
    <button class="btn btn-primary btn-form mt-4 mx-auto" @click="displayCarbonCalculator">{{ button.text }}</button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'FormEntryPointCard',
  props: {
    title: {type: String, required: false},
    subTitle: {type: String, required: false},
    paragraph: {type: String, required: false},
    image: {type: Object, required: false},
    button: {type: Object, required: false}
  },
  methods: {
    displayCarbonCalculator() {
      this.$emit("displayCarbonCalculator", true);
    },
  },
})
</script>

