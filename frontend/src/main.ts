import Vue from 'vue'
import VueRouter from 'vue-router'
import './composition-plugin'

import Album from './components/album.vue'
import Albums from './components/albums.vue'
import App from './components/app.vue'
import Lightbox from './components/lightbox.vue'
import Timeline from './components/timeline.vue'

Vue.use(VueRouter);

// eslint-disable-next-line no-new
new Vue({
  router: new VueRouter({
    routes: [
      {
        children: [
          {
            component: Lightbox,
            path: '/timeline/photo/:id',
            props: true
          }
        ],
        component: Timeline,
        path: '/timeline/'
      },
      {
        component: Albums,
        path: '/albums/'
      },
      {
        children: [
          {
            component: Lightbox,
            path: '/albums/:album/photo/:id',
            props: true
          }
        ],
        component: Album,
        path: '/albums/:id',
        props: true
      },
      {
        path: '/',
        redirect: '/timeline/'
      }
    ]
  }),
  data: {
    gitSHA: '',
    version: '1.0+dev'
  },
  el: '#main',
  render: (h) => h(App)
});
