import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import BlankLayout from "../layout/BlankLayout";
import MainLayout from "../layout/MainLayout";
import AdminPage from "../pages/AdminPage";
import CartPage from "../pages/CartPage";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import AuthRequire from "./AuthRequire";
import AdminRequire from "./AdminRequire"

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="product/:id" element={<DetailPage />} />
        <Route path="myCart" element={<CartPage />} />
        <Route path="admin" element={<AdminRequire><AdminPage/></AdminRequire>}/>
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
