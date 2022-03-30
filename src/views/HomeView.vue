<template>
  <div class="row">
    <FormEntryPointCard
      v-if="entryStep"
      @displayCarbonCalculator="displayCarbonCalculator"
      :title="formEntryPointTitle"
      :sub-title="formEntryPointSubTitle"
      :paragraph="formEntryPointParagraph"
      :image="formEntryPointImage"
      :button="formEntryPointButton"
    />
    <FormBaseLayout v-else />
  </div>
</template>

<script>
import {Options, Vue} from 'vue-class-component';
import FormEntryPointCard from '@/components/card/FormEntryPointCard.vue';
import FormBaseLayout from "@/components/container/FormBaseLayout.vue";

@Options({
  components: {
    FormBaseLayout,
    FormEntryPointCard,
  },
  data() {
    return {
      formEntryPointTitle: '',
      formEntryPointSubTitle: '',
      formEntryPointParagraph: '',
      formEntryPointImage: {
        src: '',
        alt: '',
        width: '',
        height: '',
      },
      formEntryPointButton: {
        href: '',
        text: ''
      },
    }
  },
  computed: {
    entryStep: {
      get() {
        return this.$store.getters.getEntryStepDisplay
      },
      set(value) {
        this.$store.commit('updateEntryStepDisplay', value);
      }
    },
  },
  methods: {
    displayCarbonCalculator() {
      this.$store.commit('updateEntryStepDisplay', false);
      this.$router.push({'name': 'calculator-steps', 'params': {step: 'materials'}});
    },
    getFormEntryPointCardContent() {
      this.formEntryPointTitle = 'Carbon Emissions Calculator';
      this.formEntryPointSubTitle = 'Use this calculator to help you understand your carbon usage';
      this.formEntryPointParagraph = 'Nam cursus facilisis commodo. In et ex lacinia, hendrerit nisl et, semper tortor. Proin ac dolor non ante fringilla rhoncus a nec ante.';
      this.formEntryPointImage = {
        src: require("@/assets/images/calculator/calculator.png"),
        alt: 'Calculator',
        width: '96',
        height: '89',
      };
      this.formEntryPointButton = {
        text: 'Start Calculator'
      };
    }
  },
  mounted() {
    this.getFormEntryPointCardContent()
  }
})

export default class HomeView extends Vue {}
</script>
