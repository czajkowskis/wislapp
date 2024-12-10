<template>
  <div>
    <h1>Quiz View</h1>
  </div>
  <RouterLink :to="{name: 'Learn'}">Learn</RouterLink>
  <RouterLink :to="{name: 'Quiz', params: {quizDeck: nouns_questions}}">Quiz</RouterLink>
</template>

<script>
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
