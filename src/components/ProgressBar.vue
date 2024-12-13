<script>
export default {
  props: {
    currentStep: {
      type: Number,
      required: true,
    },
    totalSteps: {
      type: Number,
      required: true,
    },
  },
  computed: {
    // Calculate the width of the progress bar based on currentStep and totalSteps
    progressBarWidth() {
      if (this.totalSteps === 0) return 0;
      return (this.currentStep / this.totalSteps) * 100;
    },
  },
};
</script>
<template>
  <div class="progress-bar-container">
    <!-- Progress Bar Background -->
    <div class="progress-bar-background">
      <div
        class="progress-bar-fill"
        :style="{ width: progressBarWidth + '%' }"
      ></div>
    </div>

    <!-- Progress Bar Text (Current Step / Total Steps) -->
    <div class="progress-bar-text">
      <span>{{ currentStep }} / {{ totalSteps }} steps</span>
    </div>
  </div>
</template>


<style scoped>
.progress-bar-container {
  width: 100%;
  margin: 20px 0 50px 0;
  text-align: center;
}

.progress-bar-background {
  width: 100%;
  height: 20px;
  background-color: #5b6078;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.progress-bar-fill {
  height: 100%;
  background-color: #A6E3A1;
  border-radius: 10px;
  transition: width 0.5s ease-in-out;
}

.progress-bar-text {
  margin-top: 10px;
  font-size: 16px;
  color: #CDD6F4;
  font-weight: bold;
}
</style>
