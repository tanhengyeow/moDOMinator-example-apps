import Vue from 'vue';
import Router from 'vue-router';

import Home from './components/Home.vue';
import Safe from './components/Safe.vue';
import DomXss from './components/DomXss.vue';
import StoredXss from './components/StoredXss.vue';
import DomCssi from './components/DomCssi.vue';
import StoredCssi from './components/StoredCssi.vue';
import NotFound from './components/NotFound.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/safe', name: 'safe', component: Safe },
    { path: '/domxss', name: 'domxss', component: DomXss },
    { path: '/storedxss', name: 'storedxss', component: StoredXss },
    { path: '/domcssi', name: 'domcssi', component: DomCssi },
    { path: '/storedcssi', name: 'storedcssi', component: StoredCssi },
    { path: '*', component: NotFound }
  ],

  scrollBehavior(to: any, from: any, savedPosition: any) {
    if (to.hash) {
      return { selector: to.hash };
    }
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  }
});

export default router;
