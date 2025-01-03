<script> 
  import Navbar from '../components/Navbar.vue'; // Import the progress bar component
  import LessonsBox from '../components/LessonsBox.vue'
  export default {
    components: {
      Navbar,
      LessonsBox,
    },
  }
</script>

<template>
  <div class="container">
    <Navbar/>
    <LessonsBox/>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }
</style>

