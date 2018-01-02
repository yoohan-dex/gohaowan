import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/views/Index';
import ActivityDetail from '@/views/Activity-detail';
import DyForm from '@/views/DyForm';
import ConfirmItem from '@/views/ConfirmItem';

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
    {
      path: '/activities/activity-detail/:id/action',
      name: 'Activity-action',
      component: DyForm,
    },
    {
      path: '/activities/confirm',
      name: 'Confirm-item',
      component: ConfirmItem,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    const toDepth = to.path.split('/').length;
    const fromDepth = from.path.split('/').length;
    if (fromDepth < toDepth) {
      return { x: 0, y: 0 };
    }
    return {};
  },
});
