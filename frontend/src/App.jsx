import { createBrowserRouter, RouterProvider } from "react-router";

import RootLayout from "./components/RootLayout";
import Home from "./components/Home";
import UserList from "./components/UserList";
import User from "./components/User";
import AddUser from "./components/AddUser";

function App() {
  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "home",
          element: <Home />
        },
        {
          path: "add-user",
          element: <AddUser />
        },
        {
          path: "user",
          element: <User />
        },
        {
          path: "users-list",
          element: <UserList />
        }
      ]
    }
  ]);

  return <RouterProvider router={routerObj} />;
}

export default App;