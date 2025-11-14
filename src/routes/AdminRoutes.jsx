import AdminLayout from "../common/layouts/AdminLayout";
import MainLayout from "../common/layouts/MainLayout";
import DashboardPage from "../pages/admin/DashboardPage";
import CreateMovie from "../pages/admin/movie/create/CreateMovie";
import ListMovie from "../pages/admin/movie/ListMovie";
import HomePage from "../pages/client/home/HomePage";

export const AdminRoutes = [
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "movies",
        children: [
          {
            index: true,
            element: <ListMovie />,
          },
          {
            path: "create",
            element: <CreateMovie />,
          },
        ],
      },
    ],
  },
];
