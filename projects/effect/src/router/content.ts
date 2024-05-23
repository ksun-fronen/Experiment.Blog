import { RouterView } from "vue-router";

/* 文章路由 */
export default [ {
  children: [ {
    component: {
      render() {
        return "123";
      },
    },
    path: ":id",
  } ],
  component: RouterView,
  path: "/blog",
} ];
