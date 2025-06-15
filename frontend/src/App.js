
 import CartTotal from "./components/CartTotal";
import Filter from "./components/Filter";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ProfilePage from "./components/ProfilePage";
import SingleProduct from "./components/SingleBook";
 import "./Css/navbar.css"
import Login from "./pages/Login";
import Register from "./pages/Register";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import router from "./Path";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
