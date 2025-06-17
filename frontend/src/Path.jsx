import Main from "./pages/Main";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProfilePage from "./components/ProfilePage"; 
import SingleProduct from "./pages/SingleProduct";
import User from "./pages/User";
import Orderpage from "./pages/Orderpage";
import RestrictPath from "./pages/RestrictPath";
import { BrowserRouter, createBrowserRouter,RouterProvider, } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        element: <RestrictPath />,
        children: [
          { path: '/', element: <Home /> },
          { path: '/cart', element: <Cart /> },
          { path: '/user', element: <User /> },
          { path: '/order', element: <Orderpage /> },
          { path: '/profile', element: <ProfilePage />}
        ],
      },
      { path: '/book/:bookId', element: <SingleProduct /> },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
    ],
  },
]);
export default router