import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  // Public routes
  index("routes/landing.tsx"),
  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),
  
  // Protected routes
  layout("routes/layout.tsx", [
    route("dashboard", "routes/dashboard.tsx"),
    route("compliance", "routes/compliance.tsx"),
  ]),
] satisfies RouteConfig;
