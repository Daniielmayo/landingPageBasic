import { SidebarTwo } from "@/components/Sidebarcopy/Sidebar";
import React from "react";
import styles from './syles.module.css'

const LayoutPrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarTwo />
      <div className={styles['sidebar-layout']}>{children}</div>
    </>
  );
};

export default LayoutPrivateRoutes;
