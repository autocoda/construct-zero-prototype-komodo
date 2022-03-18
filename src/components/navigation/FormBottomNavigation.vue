<template>
  <div class="col-12">
    <div :class="[
      {'justify-content-end': disableBack},
      {'justify-content-between': !disableBack && !disableNext},
      'd-flex button-navigation mt-3']"
    >
      <button
        v-if="!disableBack"
        class="btn btn-outline-dark"
        @click="$emit('back')"
      >
        <img src="@/assets/images/calculator/navigation/v-icon-right.svg" alt="Previous Icon"> Previous
      </button>
      <button
        v-if="!disableNext"
        class="btn btn-primary"
        @click="$emit('next')"
      >
        Next <img src="@/assets/images/calculator/navigation/v-icon-left.svg" alt="Next Icon">
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'FormBottomNavigation',
  props: {
    'disableNext': {type: Boolean, required: false},
    'disableBack': {type: Boolean, required: false},
    'back': {type: Function},
    'next': {type: Function}
  },
  emits: ["next", "back"]
})
</script>