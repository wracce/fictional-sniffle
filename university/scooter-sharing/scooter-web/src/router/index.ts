import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { routes } from "./routes";
import { authGuard } from './guard';

const history = createWebHistory(import.meta.env.BASE_URL);

const router = createRouter({history,routes});

router.beforeEach(authGuard);

export default router
