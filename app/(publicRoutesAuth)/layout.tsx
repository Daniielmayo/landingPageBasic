import { NavbarTop } from "@/components/Navbar/navbar";

const layoutePublicRoutesAuth = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavbarTop />
      {children}
    </>
  );
};

export default layoutePublicRoutesAuth;
