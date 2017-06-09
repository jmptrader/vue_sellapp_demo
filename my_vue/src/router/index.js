import Vue from 'vue';
import Router from 'vue-router';
import VueResource from 'vue-resource';
Vue.use(Router);
Vue.use(VueResource);

export default new Router({
  routes: [
    {path: '/seller', component: require('../components/seller/seller.vue')},
    {path: '/goods', component: require('../components/goods/goods.vue')},
    {path: '/ratings', component: require('../components/ratings/ratings.vue')}
  ]
});
