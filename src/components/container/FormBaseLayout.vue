<template>
  <div class="calculator-form-container">
    <FormTopNavigation />
    <div class="col-12">
      <router-view :key="$route.fullPath" />
    </div>
    <FormBottomNavigation
      :back="arrayWithBackButton.includes(step)"
      :next="arrayWithNextButton.includes(step)"
      :disable-next="arrayWithNextDisabled.includes(step)"
      :disable-back="arrayWithBackDisabled.includes(step)"
      @back="back"
      @next="next"
    />
  </div>
</template>
<script>
import {defineComponent} from 'vue'
import FormBottomNavigation from "@/components/navigation/FormBottomNavigation.vue";
import FormTopNavigation from "@/components/navigation/FormTopNavigation.vue";

export default defineComponent({
  name: 'FormBaseLayout',
  components: {FormTopNavigation, FormBottomNavigation},
  data() {
    return {
      isClean: true,
      arrayWithBackButton: ['materials', 'equipment', 'personnel', 'personnel-compact' , 'personnel-detailed', 'summary'],
      arrayWithBackDisabled: ['materials'],
      arrayWithNextButton: ['materials', 'equipment', 'personnel', 'personnel-compact' , 'personnel-detailed', 'summary'],
      arrayWithNextDisabled: ['personnel', 'summary'],
      stepOrder: {
        "materials": {
          "next": "equipment"
        },
        "equipment": {
          'next': 'personnel',
          'back': 'materials'
        },
        "personnel": {
          'back': 'equipment'
        },
        "personnel-compact": {
          'next': 'summary',
          'back': 'personnel'
        },
        "personnel-detailed": {
          'next': 'summary',
          'back': 'personnel'
        },
        "summary": {
          'back': 'personnel',
        }
      }
    }
  },
  computed: {
    step: function () {
      return this.$route.params.step ?? 'materials'
    },
  },
  methods: {
    switchTab: function (route) {
      this.$router.push(route);
    },
    next: function () {
      const nextStep = this.stepOrder[this.$route.params.step].next;
      this.switchTab({'name': 'calculator-steps', "params": {step: nextStep}});
    },
    back: function () {
      const prevStep = this.stepOrder[this.$route.params.step].back;
      this.switchTab({'name': 'calculator-steps', "params": {step: prevStep}});
    },
  }
})
</script>