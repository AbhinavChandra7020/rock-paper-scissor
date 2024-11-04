import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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

const router = createBrowserRouter([
    { path: "/", element: <Homepage /> },
    { path: "/home", element: <Homepage /> },
    { path: "/gamemode", element: <Gamemode /> },
    {
        path: "/game",
        element: <RPS />,
        loader: loadGameMode,
    },
]);

export default function App() {
    return (
      <div>
        <Header />
        <RouterProvider router={router} />
      </div>
    );
}
