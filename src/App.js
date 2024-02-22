import React, { useState, useEffect } from "react";
import "./App.css";
import ResponsiveAppBar from "./components/AppBar";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import Orders from "./components/dashboard/Orders";
import Profile from "./components/Profile";
import AuthContext from "./authContext";
import AddOrder from "./components/dashboard/AddOrders";

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
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard/orders",
        element: <Orders />,
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
      </AuthContext.Provider>
    </div>
  );
}

export default App;
