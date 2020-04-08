import Vue from 'vue';
import Router, { Route, RouteCallback } from 'vue-router';
import Component from 'vue-class-component';

Vue.use(Router);

Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate']);

export default function createRouter() {
  const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/labs',
        name: 'labs',
        component: () => import('./views/labs/LabsExplore/LabsExplore.vue'),
      },
      {
        path: '/lab/:nid',
        name: 'lab',
        component: () => import('./views/labs/LabView/LabView.vue'),
      },
      {
        path: '/puzzles',
        name: 'puzzles',
        component: () => import('./views/puzzles/PuzzlesExplore/PuzzlesExplore.vue'),
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('./views/home/Home.vue'),
      },
      {
        path: '/',
        name: 'front',
        component: () => import('./views/front-page/FrontPage.vue'),
      },
      {
        path: '/new-player/',
        name: 'new-player',
        component: () => import('./views/players/NewPlayerView/NewPlayerView.vue'),
      },
      {
        path: '/blog',
        name: 'blog',
        component: () => import('./views/news/News.vue'),
      },
      {
        path: '/player/:uid',
        name: 'player',
        component: () => import('./views/players/PlayerView/PlayerView.vue'),
      },
    ],
  });

  router.beforeEach(async (to: Route, from: Route, next: RouteCallback<any>) => {
    const userStore = router.app.$vxm.user;
    if (!userStore.triedAuthenticating) await userStore.authenticate();
    next();
  });

  return router;
}
