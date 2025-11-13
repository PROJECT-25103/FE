import AdminLayout from "../common/layouts/AdminLayout";
import DashboardPage from "../pages/admin/DashboardPage";
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
    ],
  },
];
