<script>
  
  export default {
    data() {
      return {
        words: [],
        current_index: 0
      };
    },

    computed: {
      currentWord() {
        if (this.words.length > 0) {
          return this.words[this.current_index];
        }
        return {};
      },

      finished() {
        return this.current_index >= this.words.length-1;
      }
    },
    methods: {
      async fetchWords() {
        try {
          const response = await fetch('/data/nouns.json');
          const data = await response.json();
          this.words = data.words;
        } catch (error) {
          console.error("Error loading JSON:", error);
        }
      },

      nextWord() {
        if (this.current_index < this.words.length) {
          this.current_index++;
        }
      },

      goToQuiz() {
        this.$router.push({ name: "Quiz" });
      }
    },

    mounted() {
      this.fetchWords();
      console.log(this.currentWord)
    }
  }
</script>

<template>
  <div>
    <h1>{{ currentWord.polish }}</h1>
    <h2>{{ currentWord.english }}</h2>

    <button v-if="finished === false" @click="nextWord">Now I know it!</button>
    <button v-else @click="goToQuiz">Go to Quiz</button>
  </div>
</template>

<style scoped>
  h1 {
    color: #CDD6F4 ;
    font-size: 64px;
    font-weight: 700;
  }

  h2 {
    color: #CDD6F4 ;
    font-size: 48px;
    font-weight: 300;
  }

  button {
    border-radius: 30px; 
    background: #A6DA95;
    font-size: 36px;
    color: #24273A;
  }
</style>
