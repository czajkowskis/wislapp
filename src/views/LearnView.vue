<script>
  import ProgressBar from '../components/ProgressBar.vue'; // Import the progress bar component
  export default {
    components: {
      ProgressBar,
    },
    data() {
      return {
        words: [],
        quizName: "",
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
          const dataPath = '/data/' + this.$route.params.lessonName + ".json"
          const response = await fetch(dataPath);
          const data = await response.json();
          this.words = data.words;
          this.quizName = data.quiz_name;
          console.log(this.quizName)
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
      this.$router.push({ name: 'Quiz', params: { quizName: this.quizName } });
      }
    },

    mounted() {
      this.fetchWords();
    }
  }
</script>

<template>
  <div class="container">
    <progress-bar :currentStep="this.current_index" :totalSteps="this.words.length" />
    <h1>{{ currentWord.polish }}</h1>
    <h2>{{ currentWord.english }}</h2>

    <button v-if="finished === false" @click="nextWord">Now I know it!</button>
    <button v-else @click="goToQuiz">Go to Quiz</button>
  </div>
</template>

<style scoped>
  .container {
    margin: 0 auto;
    max-width: 60%;
  }

  h1 {
    color: #CDD6F4 ;
    margin: 30px auto;
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
