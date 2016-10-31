import Vue from 'vue';
import Resource from 'vue-resource';
import Router from 'vue-router';

import App from './components/App.vue';
import X5 from './components/X5.vue';
import Dxw from './components/Dxw.vue';
import Cq from './components/Cq.vue';
import Sd from './components/Sd.vue';
import Pay_success from './components/Pay_success.vue';
import Pay from './components/Pay.vue';
import Snaq from './components/Snaq.vue';


// Install plugins
Vue.use(Router);
Vue.use(Resource);

// Set up a new router
var router = new Router();

// Route config
router.map({
    '/X5':{
        name: 'X5',
        component: X5
    },
    '/Dxw':{
        name: 'Dxw',
        component: Dxw
    },
    '/Cq':{
        name: 'Cq',
        component: Cq
    },
    '/Sd':{
        name: 'Sd',
        component: Sd
    },
    '/Pay_success/:orderNum/:money/:yxqdata':{
        name: 'Pay_success',
        component: Pay_success
    },
    '/Pay/:object_id':{
        name:'Pay',
        component:Pay
    },
    'Snaq':{
        name: 'Snaq',
        component: Snaq
    }
})

// For every new route scroll to the top of the page
router.beforeEach(function () {
    window.scrollTo(0, 0)
})

// If no route is matched redirect home
router.redirect({
    '*': '/X5'
})

// Start up our app
router.start(App, 'app')
