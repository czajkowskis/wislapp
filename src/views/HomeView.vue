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
  <div>
    <Navbar/>
    <LessonsBox/>
  </div>
</template>

