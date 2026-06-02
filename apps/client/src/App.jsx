import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Loader from "./components/Loader";
import MainLayout from "./layouts/MainLayout";

const Shop = lazy(() => import("./pages/Shop"));
const Products = lazy(() => import("./pages/Products"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Shop />} />

              <Route path="/category/:parent/:child?" element={<Shop />} />

              <Route path="/product/:slug" element={<Products />} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
};

export default App;
