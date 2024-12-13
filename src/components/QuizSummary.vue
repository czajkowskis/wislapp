<template>
  <div class="modal-overlay">
    <div class="modal-content animated-modal">
      <h1>Quiz Summary</h1>
      <h2><strong>Correct Answers:</strong> {{ correctAnswers }} / {{ totalQuestions }}</h2>
      <h2><strong>Time Taken:</strong> {{ formattedTime }}</h2>
      <button @click="$emit('close')">Finish</button>
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
  padding: 20px 50px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: scale(0.8); /* Start smaller */
  animation: popIn 0.5s ease forwards; /* Add pop-in animation */
}

h1 {
  font-size: 48px;
}

h2 {
  font-size: 24px;
  font-weight: 400;
}

h2 strong {
  font-weight: 700;
}
/* Button styles */
button {
  margin-top: 20px;
  padding: 10px 20px;
  background: #A6DA95;
  color: #5B6078;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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
