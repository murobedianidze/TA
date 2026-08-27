import React from "react";
import { Routes, Route } from "react-router-dom";
import { APP_ROUTES } from "./config/routes"; // დარწმუნდით, რომ სწორი გზაა

function AppRoutes() {
  return (
    <Routes>
      {APP_ROUTES.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
export default AppRoutes;
