import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Product from "../Pages/Product";
import SignUp from "../Pages/SignUp";
import Cart from "./Cart";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/product/:pid", element: <Product /> },
  { path: "/cart", element: <Cart /> },
];

export default routes;
