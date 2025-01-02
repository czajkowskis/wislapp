<script>
import ProgressBar from '../components/ProgressBar.vue'; // Import the progress bar component
import QuizSummary from '../components/QuizSummary.vue'
export default {
  components: {
    ProgressBar,
    QuizSummary,
  },
  data() {
    return {
      lessonName: "",
      questions: [],
      incorrectQueue: [], // Queue of incorrect questions
      attemptedQuestions: new Set(), // Track questions already attempted
      choices: [],
      selectedChoice: null,
      incorrectAnswers: [],      
      attemptedQuestions: new Set(), // Track questions already attempted
      firstTimeCorrectAnswers: 0,
      correctAnswersNumber: 0,
      currentIndex: 0,
      currentQuestion: {},
      correctAudio: new Audio("/audio/correct.mp3"), // Path to correct answer sound
      incorrectAudio: new Audio("/audio/incorrect.mp3"), // Path to incorrect answer sound
      startTime: null,
      timeTaken: null,
      showSummary: false, // Controls whether the summary modal is displayed
    };
  },

  methods: {
    async fetchQuestions() {
      try {
        const questionsPath = '/data/' + this.$route.params.quizName + ".json"
        console.log(questionsPath)
        const response = await fetch(questionsPath);
        const data = await response.json();
        this.lessonName = data.lesson_name;
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
        this.handleCorrectAnswer();
      } else {
        this.handleIncorrectAnswer(userAnswer);
      }
      this.attemptedQuestions.add(this.currentQuestion)
    },
    
    handleCorrectAnswer() { 
      if(!this.incorrectQueue.includes(this.currentQuestion)){
        this.correctAnswersNumber++; //Increment number of correct answers if the user answered correctly without hints
      }
      if(!this.attemptedQuestions.has(this.currentQuestion)){
        this.firstTimeCorrectAnswers++;
      }
      this.correctAudio.play();
      setTimeout(this.nextQuestion, 1500);
    },

    handleIncorrectAnswer(userAnswer) {
        this.incorrectAudio.play();
        if (!this.incorrectQueue.includes(this.currentQuestion)) {
          // Make sure that questions in incorrect queue are unique
          this.incorrectQueue.push(this.currentQuestion);
        }
        this.incorrectAnswers.push(userAnswer);
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
        this.timeTaken = Math.floor((new Date() - this.startTime) / 1000); // Calculate time taken in seconds
        this.showSummary = true;
        return
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

    goToHome() {
      this.$router.push({ name: 'Home'});
    },

    retakeLesson() {
      this.$router.push({ name: 'Learn', params: { lessonName: this.lessonName } });
    }
  },
  mounted() {
    this.startTime = new Date();
    this.fetchQuestions();
  }
};
</script>

<template>
  <div class="container">
    <progress-bar :currentStep="this.correctAnswersNumber" :totalSteps="this.questions.length"/>
    <img :src="this.currentQuestion.photo_src"/>
    <h2>{{this.currentQuestion.english}}</h2>
    <button v-for="(choice, index) in choices" :key="index" :class="getButtonClass(choice)" @click="checkAnswer(choice)"> {{ choice }}</button>
    <quiz-summary v-if="showSummary" 
      :correctAnswers="firstTimeCorrectAnswers" 
      :totalQuestions="this.questions.length" 
      :timeTaken="timeTaken" 
      @close="goToHome"
      @retake="retakeLesson"/>
  </div>
</template>

<style scoped>
  .container {
    max-width: 80%;
    margin: 0 auto;
  }

  h2 {
    font-size: 24px;
    color: #BAC2DE;
  }

  img {
    max-width: 500px;
  }

  button {
    background: #24273A;
    color: #CDD6F4;
    font-size: 28px;
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
