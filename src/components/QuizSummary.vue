<template>
  <div class="modal-overlay">
    <div class="modal-content animated-modal">
      <h1>Quiz Summary</h1>
      <h2 v-if="isPassed">Great Job! Continue with other lessons now!</h2>
      <h2 v-else> You didn't do that great, maybe retake the lesson?</h2>
      <h2><strong>Correct Answers:</strong> {{ correctAnswers }} / {{ totalQuestions }}</h2>
      <h2><strong>Time Taken:</strong> {{ formattedTime }}</h2>
      <div v-if="!isPassed" class="button-container-not-passed">
        <button @click="$emit('retake')" class="retake-button">Retake the lesson</button>
        <button @click="$emit('close')" class="secondary-button">Finish</button>
      </div>
      <div v-else class="button-container-passed">
        <button @click="$emit('close')" class="finish-button">Finish</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    correctAnswers: {
      type: Number,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    timeTaken: {
      type: Number,
      required: true,
    },
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.timeTaken / 60);
      const seconds = this.timeTaken % 60;
      return `${minutes}m ${seconds}s`;
    },

    isPassed() {
      if (this.correctAnswers / this.totalQuestions < 0.5){
        return false;
      }
      return true
    }
  },
};
</script>

<style scoped>
/* Modal overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.5s ease; /* Add fade-in animation for overlay */
}

/* Modal content */
.modal-content {
  background: #5B6078;
  min-width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding: 20px 50px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: scale(0.8); /* Start smaller */
  animation: popIn 0.5s ease forwards; /* Add pop-in animation */
}

h1 {
  font-size: 36px;
}

h2 {
  font-size: 24px;
  font-weight: 400;
}

h2 strong {
  font-weight: 700;
}

.button-container-not-passed {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

button {
  font-size: 18px;
  margin: 0 20px;
  transition: all 0.3s ease-in-out;
}

.finish-button {
  margin-top: 20px;
  padding: 10px 20px;
  background: #A6DA95;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.finish-button:hover {
  background: #8FCB7C;
}

.retake-button {
  margin-top: 20px;
  padding: 10px 20px;
  background: #f5a97f;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.retake-button:hover {
  background: #e98a65;
}

.secondary-button {
  margin-top: 20px;
  padding: 10px 20px;
  background: #f4dbd6;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.secondary-button:hover{
  background: #eac4be;
}


/* Keyframes for the fade-in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Keyframes for the pop-in animation */
@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.8); /* Smaller and less visible */
  }
  to {
    opacity: 1;
    transform: scale(1); /* Full size and fully visible */
  }
}
</style>
