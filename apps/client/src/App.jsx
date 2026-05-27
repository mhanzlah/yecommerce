import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Loader from "./components/Loader";
import Layout from "./layouts/Layout";

import AdminRoute from "./components/AdminRoute";
import GuestRoute from "./components/GuestRoute";
import ProtectedRoute from "./components/ProtectedRoute";

const Admin = lazy(() => import("./pages/Admin"));
const Shop = lazy(() => import("./pages/Shop"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Account = lazy(() => import("./pages/Account"));
const Product = lazy(() => import("./pages/Product"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Layout />}>

              <Route index element={<Shop />} />

              <Route path="contact" element={<Contact />} />

              <Route element={<GuestRoute />}>
                <Route path="login" element={<Login />} />
                <Route path="sign-up" element={<SignUp />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path="account" element={<Account />} />

                <Route element={<AdminRoute />}>
                  <Route path="admin" element={<Admin />} />
                </Route>
              </Route>

              <Route path="/category/:category" element={<Shop />} />

              <Route path="product/:slug" element={<Product />} />

              <Route path=":parent" element={<Shop />} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  )
}

export default App