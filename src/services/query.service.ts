// import VueRouter from "vue-router";
//
// function readInt($route: Route, key: string, defaultValue = 0): number {
//   const str = $route.query[key];
//   if (str && str.length > 0) {
//     return parseInt(str.toString(), 10);
//   } else {
//     return defaultValue;
//   }
// }
//
// function readBool($route: Route, key: string, defaultValue = false): boolean {
//   const str = $route.query[key];
//   if (str !== null && str !== undefined) {
//     return Boolean(str) || str === "true";
//   } else {
//     return defaultValue;
//   }
// }
//
// function readStr($route: Route, key: string, defaultValue = ""): string {
//   const str = $route.query[key];
//   if (str && str.length > 0) {
//     return str.toString();
//   } else {
//     return defaultValue;
//   }
// }
//
// export default {
//   getPage($route: Route): number {
//     return readInt($route, "page", 1);
//   },
//
//   // pushChanges($route: Route, $router: VueRouter, req: QueryChange) {
//   //     const q = { ...$route.query };
//   //     if (req.page) {
//   //         q['page'] = req.page.toString();
//   //     }
//   //     if (req.sort) {
//   //         q['sortField'] = req.sort.field;
//   //         q['sortAsc'] = req.sort.asc;
//   //     }
//   //     $router.push({ path: $route.path, query: q });
//   // },
//
//   pushClearParams($route: Route, $router: VueRouter) {
//     $router.push({ path: $route.path, query: {} });
//   },
// };
