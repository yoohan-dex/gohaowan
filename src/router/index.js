import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/views/Index';
import setConfig from '../utils/setConfig';

import ActivityDetail from '../views/Activity-detail';
import InformationDetail from '../views/Information-detail';
import StoreDetail from '../views/StoreDetail';
import UserDetail from '../views/User-detail';
import DyForm from '../views/DyForm';
import ConfirmItem from '../views/ConfirmItem';
import SearchView from '../views/Search-view';
import BindPhone from '../views/bindPhone';
import UserInformation from '../views/User-information';
import UserLabel from '../views/User-label';
import Following from '../views/following';
import Ticket from '../views/ticket';
import Profile from '../views/User-profile';
import MyActivity from '../views/my-activity';
import MyComments from '../views/my-comments';
import MyMoment from '../views/my-moments';
import Joined from '../views/joined-list';
import TicketDetail from '../views/ticket-detail';

import MgrLogin from '../views/mgr-login';
import MgrActivities from '../views/mgr-activities';
import MgrValidator from '../views/mgr-validator';

import Agreement from '../views/agreement';
import TagActivity from '../views/tag-activity';

import Follower from '../views/follower-list';
import Fans from '../views/fans-list';

import Tobehot from '../views/tobehot';
import SubmitSuccess from '../views/submit-success';
import Moment from '../views/moment';
import HotDetail from '../views/hot-detail';
import MomentSearch from '../views/moment-search-view';

Vue.use(Router);

const router = new Router({
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
    { path: '/store-detail/:id', name: 'Store-detail', component: StoreDetail },
    {
      path: '/activity-detail/:id/action',
      name: 'Activity-action',
      component: DyForm,
    },
    {
      path: '/activity-detail/:id/users',
      name: 'activityJoined',
      component: Joined,
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
    {
      path: '/following',
      name: 'Follow',
      component: Following,
    },
    {
      path: '/user-detail/:id',
      name: 'User-detail',
      component: UserDetail,
    },
    {
      path: '/ticket',
      name: 'Ticket',
      component: Ticket,
    },
    {
      path: '/ticket/:id/:type',
      name: 'Ticket-detail',
      component: TicketDetail,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/my-activity',
      name: 'My-activity',
      component: MyActivity,
    },
    {
      path: '/my-comments',
      name: 'My-comments',
      component: MyComments,
    },
    {
      path: '/agreement',
      name: 'Agreement',
      component: Agreement,
    },
    {
      path: '/mgr-login',
      name: 'Mgr-login',
      component: MgrLogin,
    },
    {
      path: '/mgr-activites',
      name: 'Mgr-activites',
      component: MgrActivities,
    },
    {
      path: '/mgr-validator/:id',
      name: 'Mgr-validator',
      component: MgrValidator,
    },
    {
      path: '/follower/:id',
      name: 'Follower-list',
      component: Follower,
    },
    {
      path: '/fans/:id',
      name: 'Fans-list',
      component: Fans,
    },
    {
      path: '/tobehot',
      name: 'Tobehot',
      component: Tobehot,
    },
    {
      path: '/Submit-success',
      name: 'Submit-success',
      component: SubmitSuccess,
    },
    {
      path: '/moment',
      name: 'Moment',
      component: Moment,
      children: [
        {
          path: '/moment/tag',
          name: 'Moment-tag',
        },
      ],
    },
    {
      path: '/my-moments',
      name: 'My-moment',
      component: MyMoment,
    },
    {
      path: '/hot-detail/:id',
      name: 'Hot-detail',
      component: HotDetail,
    },
    {
      path: '/tag-activity/:id',
      name: 'Tag-activity',
      component: TagActivity,
    },
    {
      path: '/moment-search-view',
      name: 'Moment-search-view',
      component: MomentSearch,
    },
  ],
  mode: 'hash',
  base: '/front/',
  scrollBehavior(to, from) {
    const toDepth = to.path.split('/').length;
    const fromDepth = from.path.split('/').length;
    if (fromDepth < toDepth) {
      return { x: 0, y: 0 };
    }
    return {};
  },
});

router.afterEach(() => {
  if (window.whatdevice && !window.whatdevice.isiOS) {
    setConfig();
  }
  // alert(location.href);
});

export default router;
