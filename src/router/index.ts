import { createRouter, createWebHistory } from 'vue-router'
import FormView from '../views/FormView.vue'
import ConfirmView from '../views/ConfirmView.vue'
import CompleteView from '../views/CompleteView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView},
  { path: '/form', component: FormView},
  { path: '/confirm', component: ConfirmView },
  { path: '/complete', component: CompleteView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const protectedRoutes = ['/Form', '/confirm', '/complete'];

  if (protectedRoutes.includes(to.path) && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});