<template>
  <div class="calculator-home">
    <FormEntryCard
      @displayCarbonCalculator="displayCarbonCalculator"
      v-if="isFormEntryPoint"
      :title="splashTitle"
      :sub-title="splashSubTitle"
      :paragraph="splashParagraph"
      :image="splashImage"
      :button="splashButton"
    >
    </FormEntryCard>
    <div v-else>
      TEST
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FormEntryCard from '@/components/card/FormEntryCard.vue';

@Options({
  components: {
    FormEntryCard,
  },
  data() {
    return {
      isFormEntryPoint: true,
      splashTitle: '',
      splashSubTitle: '',
      splashParagraph: '',
      splashImage: {
        src: '',
        alt: '',
        width: '',
        height: '',
      },
      splashButton: {
        href: '',
        text: ''
      },
    }
  },
  methods: {
    displayCarbonCalculator() {
      console.log("enlarging text");
      this.isFormEntryPoint = false;
    },
    getCalculatorSplashContent() {
      this.splashTitle = 'Carbon Emissions Calculator';
      this.splashSubTitle = 'Use this calculator to help you understand your carbon usage';
      this.splashParagraph = 'Nam cursus facilisis commodo. In et ex lacinia, hendrerit nisl et, semper tortor. Proin ac dolor non ante fringilla rhoncus a nec ante.';
      this.splashImage = {
        src: require("@/assets/images/calculator/calculator.png"),
        alt: 'Calculator',
        width: '96',
        height: '89',
      };
      this.splashButton = {
        text: 'Start Calculator'
      };
    }
  },
  mounted() {
    this.getCalculatorSplashContent()
  }
})

export default class HomeView extends Vue {}
</script>
