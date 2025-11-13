import AuthLayout from "../common/layouts/AuthLayout";
import MainLayout from "../common/layouts/MainLayout";
import LoginPage from "../pages/client/auth/LoginPage";
import RegisterPage from "../pages/client/auth/RegisterPage";
import HomePage from "../pages/client/home/HomePage";

export const MainRoutes = [
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage/>
      }
    ],
  },
];
