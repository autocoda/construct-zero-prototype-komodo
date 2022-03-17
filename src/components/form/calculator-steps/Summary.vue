<template>
  <div class="card bg-white py-5">Summary Data</div>
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