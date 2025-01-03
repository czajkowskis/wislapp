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

      currentAudio(){
        return new Audio(this.currentWord.audio_src);
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
      },
      
      playAudio() {
        this.currentAudio.play();
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
      <h1>{{ currentWord.polish }} <i @click="playAudio" class="fa-solid fa-volume-high"></i></h1>
    <h2>{{ currentWord.english }}</h2>

    <button v-if="finished === false" @click="nextWord">Now I know it!</button>
    <button v-else @click="goToQuiz">Go to Quiz</button>
  </div>
</template>

<style scoped>

  .container {
    min-width: 60%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    max-width: 60%;
  }

  h1 {
    color: #CDD6F4 ;
    margin: 30px auto;
    font-size: 64px;
    font-weight: 700;
  }

  i {
    font-size: 48px;
  }
  
  i:hover {
    cursor: pointer;
    animation: shake 0.5s ease-in-out;
  }

  @keyframes shake {
    0% { transform: rotate(0); }
    25% { transform: rotate(-10deg); }
    50% { transform: rotate(10deg); }
    75% { transform: rotate(-5deg); }
    100% { transform: rotate(0); }
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
