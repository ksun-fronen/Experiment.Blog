import * as Router from "vue-router";

const routerDirections = import.meta.glob<{default: any}>("../router/**/*.ts", {
  eager: true,
});

const router = Router.createRouter({
  history: Router.createWebHistory(),
  routes: Object.keys(routerDirections).map((routerModuleProp) => {
    return routerDirections[routerModuleProp].default || [];
  }).flat(),
});
console.log("router", router.getRoutes());


// todo 需要给meta定义一个模型
router.afterEach((to, from) => {
  console.log("to", to, from);
});

export default router;
