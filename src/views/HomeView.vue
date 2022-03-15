<template>
  <div class="calculator-home">
    <FormEntryPointCard
      v-if="isFormEntryPoint"
      @displayCarbonCalculator="displayCarbonCalculator"
      :title="formEntryPointTitle"
      :sub-title="formEntryPointSubTitle"
      :paragraph="formEntryPointParagraph"
      :image="formEntryPointImage"
      :button="formEntryPointButton"
    >
    </FormEntryPointCard>
    <div v-else>
      TEST
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FormEntryPointCard from '@/components/card/FormEntryPointCard.vue';

@Options({
  components: {
    FormEntryPointCard,
  },
  data() {
    return {
      isFormEntryPoint: true,
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
  methods: {
    displayCarbonCalculator() {
      this.isFormEntryPoint = false;
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
