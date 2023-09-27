import { createRouter, createWebHistory } from "vue-router";
import Index from "../views/index/index.vue";
import Home from "../views/home/home.vue";
import Record from "../views/record/record.vue";
import RecordDetails from "../views/record/recordDetails.vue";

const routes = [
  {
    path: "/",
    component: Index,
    children: [
      {
        path: "",
        component: Home,
      },
      {
        path: "/record",
        component: Record,
      },
      {
        path: "/recordDetails/:date/:grade/:courseId",
        component: RecordDetails,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
