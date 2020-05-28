import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
// eslint-disable-next-line import/extensions
// import HelloWorld from '@/components/HelloWorld';
// eslint-disable-next-line import/extensions,import/no-unresolved
import Contact from '@/components/Contact';
// eslint-disable-next-line import/extensions
import Home from '@/components/Home';
// eslint-disable-next-line import/extensions,import/no-unresolved
import AddMovie from '@/components/AddMovie';
// eslint-disable-next-line import/extensions
import Movie from '@/components/Movie';
// eslint-disable-next-line import/extensions
import Register from '@/components/Register';
// eslint-disable-next-line import/extensions
import Login from '@/components/Login';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/movies/add',
    name: 'AddMovie',
    component: AddMovie,
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: Movie,
  },
  {
    path: '/users/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/users/login',
    name: 'Login',
    component: Login,
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  // },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
