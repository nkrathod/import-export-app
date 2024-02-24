import React, { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import ResponsiveAppBar from "./components/AppBar";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp";
import Orders from "./components/dashboard/Orders";
import Profile from "./components/Profile";
import AuthContext from "./authContext";
import AddOrder from "./components/dashboard/AddOrders";
import StickyFooter from "./components/StickyFooter";
import CustomLoader from "./components/skeleton/CustomLoader";
const DashboardLayout = lazy(() =>
  import("./components/dashboard/DashboardLayout")
);
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signin",
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/dashboard/orders",
        element: (
          <Suspense fallback={<CustomLoader />}>
            <Orders />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "/dashboard/add",
        element: <AddOrder />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  const [userDetails, setUserDeatils] = useState({});
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userDetails"));
    if (user && user.username) {
      setUserDeatils(user);
      setAuthenticated(true);
    }
  }, []);

  return (
    <div>
      <AuthContext.Provider
        value={{ authenticated, setAuthenticated, userDetails, setUserDeatils }}
      >
        <ResponsiveAppBar />
        <RouterProvider router={router} />
        <StickyFooter />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
