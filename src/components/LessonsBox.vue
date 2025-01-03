
<script>
  export default {
    data() {
      return {
        lessons: [],
      };
    },

    methods: {
      async fetchLessons() {
        try {
          const response = await fetch('/data/lessons.json');
          const data = await response.json();
          this.lessons = data.lessons;
        } catch (error) {
          console.error("Error loading JSON:", error);
        }
      },

      goToLesson(lessonName) { 
        this.$router.push({ name: 'Learn', params: { lessonName: lessonName } });
      }

    },

    mounted() {
      this.fetchLessons();
    }
  }
</script>

<template>
  <div class="container">
    <h1>Available Lessons</h1>
    <div class="lessons-container">
      <div class="lesson-container" v-for="(lesson, index) in lessons" :key="index" @click="goToLesson(lesson.name)"><h2>{{lesson.title}}</h2></div>
    </div>
    <button>More</button>
  </div>
</template>

<style scoped>
  .container {
    width:80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-items: center;
    background-color: #5B6078;
    border-radius: 30px;
    max-height: 70vh;
  }
  
  h1 {
    font-size: 36px;
  }

  .lessons-container {
    display: flex;
    flex-direction: column;
    justify-items: space-between;
  }

  .lesson-container {
    text-align: center;
    width: 60%;
    margin: 30px auto;
    padding: 10px 20px;
    border-radius: 30px;
    background-color: #939AB7;
    color: #ffffff;
    font-weight: 700;
    transition: all ease-in-out 0.3s;
  }

  .lesson-container:hover {
    cursor: pointer;
    background-color: #A6E3A1; 
    color: #24273A;
  }

  h2 {
    font-size: 28px;
  }

  button {
    margin: 30px auto 30px auto;
    color: #ffffff;
    width: 30%;
    background-color: #939AB7;
    font-size: 36px; 
    transition: all ease-in-out 0.3s;
  }

  button:hover{
    background-color: #A6E3A1; 
    color: #24273A;
  }
</style>
