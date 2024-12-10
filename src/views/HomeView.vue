<script>
  import { RouterLink } from 'vue-router'
  
  export default {
    data() {
      return {
        words: null
      };
    },
    mounted() {
      // Fetch JSON from the public directory
      fetch('/data/nouns.json')
        .then(response => response.json())
        .then(data => {
          this.words = data;
        })
        .catch(error => console.error('Error fetching JSON:', error));
    }
  };
</script>

<template>
  <div>
    <h1>Home View</h1>
    <pre>{{ jsonData }}</pre>
    <RouterLink :to="{name: 'Learn'}">Learn</RouterLink>
    <RouterLink :to="{name: 'Quiz'}">Quiz</RouterLink>
  </div>
</template>

