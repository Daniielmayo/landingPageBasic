import { Footer } from "@/components/Footer/Footer";
import { NavbarTop } from "@/components/Navbar/navbar";

const layoutePublicRoutes = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavbarTop />
      {children}
      <Footer />
    </>
  );
};

export default layoutePublicRoutes;
