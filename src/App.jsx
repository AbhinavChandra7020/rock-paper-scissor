import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Homepage from './components/Homepage';
import Gamemode from './components/Gamemode';
import RPS from './components/RPS';
import Header from './components/Header';

const loadGameMode = ({ request }) => {
    const url = new URL(request.url);
    const mode = url.searchParams.get("mode");
    const targetPoints = parseInt(url.searchParams.get("targetPoints"), 10) || Infinity;
    return { mode, targetPoints };
};

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Wrap everything with Layout
    children: [
      { index: true, element: <Homepage /> },
      { path: "home", element: <Homepage /> },
      { path: "gamemode", element: <Gamemode /> },
      {
        path: "game",
        element: <RPS />,
        loader: loadGameMode,
      },
    ],
  },
]);

export default function App() {
    return (
      <RouterProvider router={router} />
    );
}
