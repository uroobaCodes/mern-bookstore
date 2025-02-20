// book-store app

import { createBrowserRouter } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar.jsx";
import HomePage from "../pages/home/HomePage.jsx";
import BookDetail from "../pages/bookDetail/BookDetail.jsx";
import Footer from "../components/footer/Footer.jsx";
import Login from "../pages/login/Login.jsx";
import Register from "../pages/register/Register.jsx";
import CartPage from "../pages/cartPage/CartPage.jsx";
import CheckoutPage from "../pages/checkout/CheckoutPage.jsx";
import OrdersPage from "../pages/orders/OrdersPage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import AddNewBook from "../pages/dashboard/AddNewBook.jsx";
import EditBook from "../pages/dashboard/EditBook.jsx";
import ManageBooks from "../pages/dashboard/ManageBooks.jsx";
import Admin from "../pages/admin/Admin.jsx";
import AdminPrivateRoute from "./AdminPrivateRoute.jsx";
import Projections from "../pages/dashboard/Projections.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <HomePage />
      </div>
    ),
  },
  {
    path: "/orders",
    element: (
      <PrivateRoute>
        <div>
          <NavBar />
          <OrdersPage />
        </div>
      </PrivateRoute>
    ),
  },

  {
    path: "/login",
    element: (
      <div>
        <NavBar />

        <Login />
      </div>
    ),
  },
  {
    path: "/register",
    element: (
      <div>
        <NavBar />
        <Register />
      </div>
    ),
  },
  {
    path: "/cart",
    element: (
      <div>
        <NavBar />
        <CartPage />
      </div>
    ),
  },
  {
    path: "/checkout",
    element: (
      <PrivateRoute>
        <div>
          <NavBar />
          <CheckoutPage />
        </div>
      </PrivateRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <div>
        <NavBar />
        <Admin />
      </div>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <AdminPrivateRoute>
        <div>
          {/* <NavBar /> */}
          <Dashboard />
        </div>
      </AdminPrivateRoute>
    ),
    children: [
      { path: "", element: <Projections /> },
      { path: "add-new-book", element: <AddNewBook /> },
      { path: "manage-books", element: <ManageBooks /> },
      { path: "edit-book/:id", element: <EditBook /> },
    ],
  },
  {
    path: "/books/:id",
    element: (
      <div>
        <NavBar />
        <BookDetail />
      </div>
    ),
  },
]);

export default router;
