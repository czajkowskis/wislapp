<script>
export default {
  data() {
    return {
      questions: [],
      incorrectQueue: [], // Queue of incorrect questions
      choices: [],
      selectedChoice: null,
      incorrectAnswers: [],
      currentIndex: 0,
      currentQuestion: {},
      correctAudio: new Audio("/audio/correct.mp3"), // Path to correct answer sound
      incorrectAudio: new Audio("/audio/incorrect.mp3"), // Path to incorrect answer sound
    };
  },

  methods: {
    async fetchQuestions() {
      try {
        const questionsPath = '/data/' + this.$route.params.quizName + ".json"
        console.log(questionsPath);
        const response = await fetch(questionsPath);
        const data = await response.json();
        this.questions = data.questions;
        this.currentQuestion = this.questions[this.currentIndex]
        this.generateChoices();
      } catch (error) {
        console.error("Error loading JSON:", error);
      }
    },

    generateChoices() {

      // Get the correct answer
      const correctAnswer = this.currentQuestion.polish;

      // Get incorrect answers
      const allTranslations = this.questions.map(question => question.polish);
      const incorrectAnswers = allTranslations
        .filter(translation => translation !== correctAnswer) // Exclude the correct answer
        .sort(() => 0.5 - Math.random()) // Shuffle the array
        .slice(0, 2); // Take the first two

      // Combine and shuffle choices
      this.choices = [correctAnswer, ...incorrectAnswers].sort(() => 0.5 - Math.random());
    },
    
    checkAnswer(userAnswer) {
      this.selectedChoice = userAnswer;
      if (userAnswer === this.currentQuestion.polish) {
        this.correctAudio.play();
        setTimeout(this.nextQuestion, 1500);
      } else {
        this.incorrectAudio.play();
        if (!this.incorrectQueue.includes(this.currentQuestion)) {
          // Make sure that questions in incorrect queue are unique
          this.incorrectQueue.push(this.currentQuestion);
        }
        this.incorrectAnswers.push(userAnswer);
      }
    },
    
    nextQuestion() {
      // Check if there are more questions in the main queue
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++;
        this.currentQuestion = this.questions[this.currentIndex];
      } 
      // Check if there are questions in the incorrect queue
      else if (this.incorrectQueue.length > 0) {
        this.currentQuestion = this.incorrectQueue.shift();
      } 
      // End the quiz if no questions remain
      else {
        this.currentQuestion = null;
      }
      this.generateChoices();
      this.selectedChoice = null;
      this.incorrectAnswers = [];
    },

    getButtonClass(choice) {
      if (this.selectedChoice === null) return ""; // No button clicked yet
        if (this.incorrectAnswers.includes(choice)) {
          return "incorrect"; // Red color for incorrect choices
        }
      if (choice === this.selectedChoice) {
        return this.selectedChoice === this.currentQuestion.polish
          ? "correct"
          : "incorrect";
      }
      return "";
    },
  },
  mounted() {
    this.fetchQuestions();
  }
};
</script>

<template>
  <div>
    <img :src="this.currentQuestion.photo_src"/>
    <h2>{{this.currentQuestion.english}}</h2>
    <button v-for="(choice, index) in choices" :key="index" :class="getButtonClass(choice)" @click="checkAnswer(choice)"> {{ choice }}</button>
  </div>
  <RouterLink :to="{name: 'Learn'}">Learn</RouterLink>

</template>

<style scoped>
  h2 {
    font-size: 30px;
    color: #BAC2DE;
  }

  img {
    max-width: 600px;
  }

  button {
    background: #24273A;
    color: #CDD6F4;
    font-size: 36px;
    font-weight: 700;
    display: inline-block;
    padding: 20px 50px;
    margin: 40px;
    min-width: 400px;
    border: 5px solid #F9E2AF;
    border-radius: 30px;
  }

  button.correct {
    color: #A6E3A1;
    border-color: #A6E3A1;
  }

  button.incorrect {
    color: #F38BA8;
    border-color: #F38BA8;
  }
</style>
