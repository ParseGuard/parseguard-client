import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  
  layout("routes/layout.tsx", [
    route("dashboard", "routes/dashboard.tsx"),
    route("compliance", "routes/compliance.tsx"),
  ]),
] satisfies RouteConfig;
