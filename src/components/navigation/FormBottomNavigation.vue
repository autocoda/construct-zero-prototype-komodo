<template>
  <div class="col-12">
    <div :class="[
      {'justify-content-end': disableBack},
      {'justify-content-between': !disableBack && !disableNext},
      'd-flex button-navigation mt-3'
    ]"
    >
      <button
        v-if="!disableBack"
        class="btn btn-outline-dark back"
        @click="$emit('back')"
      >
        <svg class="icon" width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <title>Previous Icon</title>
          <path class="path" d="M5 9.65625L5.9375 8.71875L2.875 5.65625H13.6562V4.34375H2.875L5.9375 1.28125L5 0.34375L0.34375 5L5 9.65625Z" fill="#222222" />
        </svg>
        Previous
      </button>
      <button
        v-if="!disableNext"
        class="btn btn-primary next"
        @click="$emit('next')"
      >
        Next
        <svg class="icon" width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <title>Next Icon</title>
          <path class="path"  d="M9 0.34375L8.0625 1.28125L11.125 4.34375H0.34375V5.65625H11.125L8.0625 8.71875L9 9.65625L13.6562 5L9 0.34375Z" fill="#FFFFFF" />
        </svg>

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
    'back': {type: Boolean},
    'next': {type: Boolean}
  },
  emits: ["next", "back"],
})
</script>