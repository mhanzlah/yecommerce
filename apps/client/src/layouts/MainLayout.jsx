import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";

const MainLayout = () => {
  const [darkHeader, setDarkHeader] = useState(false);

  return (
    <div>
      <Header dark={darkHeader} />

      <div className="mt-16">
        <Outlet context={{ setDarkHeader }} />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
