import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LearnView from '../views/LearnView.vue';
import QuizView from '../views/QuizView.vue';


const router = createRouter({
  history: createWebHistory(),
	routes: [
		{path: '/', name: 'Home', component: HomeView},
		{path: '/learn', name: 'Learn', component: LearnView},
		{path: '/quiz', name: 'Quiz', component: QuizView}
	]
});

export default router;
