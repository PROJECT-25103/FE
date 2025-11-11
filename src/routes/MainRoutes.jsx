import MainLayout from "../common/layouts/MainLayout";
import HomePage from "../pages/client/home/HomePage";
import ShowtimePage from "../pages/client/ShowTimePage";

export const MainRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "showtime/:id", 
        element: <ShowtimePage />,
      },
    ],
  },
];
