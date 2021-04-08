import Vue from 'vue';
import VueRouter from 'vue-router';
import Admin from '@/views/Admin.vue';
import Login from '@/views/Login.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/admin',
    component: Admin,
    name: 'Admin',
    meta: {
      isPublic: true,
    },
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      isPublic: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isSignedIn = store.getters['userStore/IsSignedIn'];

  if (!to.meta.isPublic && !isSignedIn) {
    return next({ name: 'Login' });
  }
  return next();
});

export default router;
