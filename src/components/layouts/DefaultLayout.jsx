import { Fragment, useCallback, useState } from "react";
import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import Sticky from "components/sticky/Sticky";
import Navbar from "components/navbar/Navbar";
import { MobileNavigationBar } from "components/mobile-navigation";

// ===================================================
const DefaultLayout = ({ children, showNavbar = true }) => {
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback(fixed => setIsFixed(fixed), []);
  return (
    <Fragment>
      {/* HEADER */}
      <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={300}>
        <Header isFixed={isFixed} />
      </Sticky>

      <div className='section-after-sticky'>
        {/* NAVIGATION BAR */}
        {/* {showNavbar && <Navbar elevation={0} border={1} />} */}

        {/* BODY CONTENT */}
        {children}
      </div>

      {/* SMALL DEVICE BOTTOM NAVIGATION */}
      <MobileNavigationBar />

      {/* FOOTER */}
      <Footer />
    </Fragment>
  );
};

export default DefaultLayout;
