import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/views/Index';
import ActivityDetail from '@/views/Activity-detail';
import InformationDetail from '@/views/Information-detail';
import DyForm from '@/views/DyForm';
import ConfirmItem from '@/views/ConfirmItem';
import SearchView from '@/views/Search-view';
import BindPhone from '@/views/bindPhone';
import UserInformation from '@/views/User-information';
import UserLabel from '@/views/User-label';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/activity-detail/:id',
      name: 'Activity-detail',
      component: ActivityDetail,
    },
    {
      path: '/activity-detail/:id/action',
      name: 'Activity-action',
      component: DyForm,
    },
    {
      path: '/confirm',
      name: 'Confirm-item',
      component: ConfirmItem,
    },
    {
      path: '/search',
      name: 'Search-view',
      component: SearchView,
    },
    {
      path: '/information-detail/:id',
      name: 'Information-detail',
      component: InformationDetail,
    },
    {
      path: '/bind-phone',
      name: 'Bind-phone',
      component: BindPhone,
    },
    {
      path: '/user-infomation',
      name: 'User-infomation',
      component: UserInformation,
    },
    {
      path: '/user-label',
      name: 'User-label',
      component: UserLabel,
    },
  ],
  mode: 'history',
  base: '/front/',
  scrollBehavior(to, from, savedPosition) {
    const toDepth = to.path.split('/').length;
    const fromDepth = from.path.split('/').length;
    if (fromDepth < toDepth) {
      return { x: 0, y: 0 };
    }
    return {};
  },
});
