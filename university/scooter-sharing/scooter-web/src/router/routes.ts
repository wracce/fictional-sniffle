import ContactView from "@/views/ContactView.vue";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import ProfileView from "@/views/ProfileView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ScootersView from "@/views/ScootersView.vue";
import ScooterView from "@/views/ScooterView.vue";
import type { RouteRecordRaw } from "vue-router";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    redirect(to) {
      return { name: 'home' }
    },
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      hideHeader: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      hideHeader: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
  },
  {
    path: '/scooters',
    name: 'scooters',
    component: ScootersView,
  },
  {
    path: '/scooters/:id',
    name: 'scooter',
    component: ScooterView,
  }

];

export { routes }