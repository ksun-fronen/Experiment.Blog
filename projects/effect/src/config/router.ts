import * as Router           from "vue-router";

const routerDirections = import.meta.glob<UseDefinition.Router.RouteRecordRaw>("../router/**/*.ts", {
  eager: true,
  import: "default",
});

const router = Router.createRouter({
  history: Router.createWebHistory(),
  routes: Object.keys(routerDirections).map((routerModuleProp) => {
    return routerDirections[routerModuleProp] || [];
  }).flat(),
});

// todo 需要给meta定义一个模型
router.afterEach((to, from) => {
  console.log("to", to, from);
});

export default router;
