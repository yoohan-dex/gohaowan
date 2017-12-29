import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/views/Index';
import ActivityDetail from '@/views/Activity-detail';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/activities',
      name: 'Index',
      component: Index,
    },
    {
      path: '/activities/activity-detail/:id',
      name: 'Activity-detail',
      component: ActivityDetail,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});
