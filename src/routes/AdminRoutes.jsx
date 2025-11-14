import AdminLayout from "../common/layouts/AdminLayout";
import DashboardPage from "../pages/admin/DashboardPage";
import CreateMovie from "../pages/admin/movie/create/CreateMovie";
import ListMovie from "../pages/admin/movie/ListMovie";
import GenrePage from "../pages/admin/genre/GenrePage";

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
        path: "genres",
        element: <GenrePage />,
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
