import { useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import RootPage from "./pages/rootLayout";
import HomePage from "./pages/homePage";
import SettingsPage from "./pages/settingsPage";
import Screenshots from "./components/Screenshots";
import DatabaseLayout from "./pages/databaseLayout";
import PlaybackVideos from "./components/PlaybackVideos";
// import LoginPage from "./pages/loginPage";
import Login from "./components/LoginAuthentication";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "database",
          element: <DatabaseLayout />,
          children: [
            { index: true, element: <Screenshots /> },
            { path: "videos", element: <PlaybackVideos /> },
          ],
        },
        { path: "settings", element: <SettingsPage /> },
      ],
    },
    // {
    //   path: "/",
    //   element: <RootPage />,
    //   children: [
    //     { index: true, element: <HomePage /> },
    //     {
    //       path: "database",
    //       element: <DatabaseLayout />,
    //       children: [
    //         { index: true, element: <Screenshots /> },
    //         { path: "videos", element: <PlaybackVideos /> },
    //       ],
    //     },
    //     { path: "settings", element: <SettingsPage /> },
    //   ],
    // },
  ]);

  if (!isLoggedIn) {
    return <Login onAuthSuccess={handleLoginSuccess} />;
  }

  return <RouterProvider router={router} />;
}

export default App;
