<template>
  <div class="calculator-form-container">
    <FormTopNavigation />
    <div class="col-12">
      <router-view :key="$route.fullPath" />
    </div>
    <FormBottomNavigation
      :back="arrayWithBackButton.includes(step)"
      :next="arrayWithNextButton.includes(step)"
      :has-back="hasBack"
      :has-next="hasNext"
      :disable-next="willDisableNext"
      :disable-back="willDisableBack"
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
    hasNext: function () {
      return this.arrayWithNextDisabled.includes(this.step);
    },
    willDisableNext: function () {
      const stepsState = this.$store.getters.getStepsCompleted;
      return stepsState[this.step] === false;
    },
    hasBack: function () {
      return this.arrayWithBackDisabled.includes(this.step);
    },
    willDisableBack: function () {
      return false;
    }
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