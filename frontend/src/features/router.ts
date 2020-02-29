import VueRouter from "vue-router";
import Lightbox from "@/components/lightbox.vue";
import Timeline from "@/components/timeline.vue";
import Albums from "@/components/albums.vue";
import Album from "@/components/album.vue";

const router = new VueRouter({
  routes: [
    {
      children: [
        {
          component: Lightbox,
          path: "/timeline/photo/:id",
          props: true,
        },
      ],
      component: Timeline,
      path: "/timeline/",
    },
    {
      component: Albums,
      path: "/albums/",
    },
    {
      children: [
        {
          component: Lightbox,
          path: "/albums/:album/photo/:id",
          props: true,
        },
      ],
      component: Album,
      path: "/albums/:id",
      props: true,
    },
    {
      path: "/",
      redirect: "/timeline/",
    },
  ],
});

export function useRouter() {
  return {router};
}
