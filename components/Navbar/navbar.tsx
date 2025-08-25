"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";

import Link from "next/link";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";
import { PhotoProfile } from "../PhotoProfile/PhotoProfile";
import Image from "next/image";


export const NavbarTop = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathName = usePathname();

  const menuItems = [
    {
      name: "Inicio",
      href: "/",
    },
    {
      name: "Productos",
      href: "/products",
    },
    {
      name: "Acerca de mí",
      href: "/#about",
    },
    {
      name: "Contacto",
      href: "/#contact",
    },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="lg:flex flex-col justify-center items-center">
        <NavbarContent className={styles["navbarTop__container"]}>
          <NavbarContent>
            <NavbarBrand>
              <PhotoProfile />
              <div className="flex flex-col">
                <Image 
                src="https://asset.brandfetch.io/idK7lnk14C/idYCTmDC_y.png?updated=1709234346771" 
                alt="4life" 
                width={40}
                height={40}
                />
              <p className="font-bold text-inherit">Virginia Martinez</p>
              <p className="text-xs ">Distribuidor autorizado  </p>
              
              </div>
            </NavbarBrand>
          </NavbarContent>

          <div className="hidden sm:block md:block lg:block">
            {/* <SearchInput /> */}
          </div>

          <NavbarContent className="hidden sm:flex " justify="center">
            {menuItems.map((item, index) => (
              <NavbarItem key={index}>
                <Link
                  color="foreground"
                  href={item.href}
                  className={`${styles["navbar__button--item"]} ${
                    pathName === item.href ? styles["active"] : ""
                  }`}
                >
                  {item.name}
                </Link>
              </NavbarItem>
            ))}
          </NavbarContent>

          {/* mobile items */}
          <NavbarMenu className="mt-[0px]">
            {/* <SearchInput /> */}
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link href={item.href}>{item.name}</Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>

          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          {/* mobile items */}
        </NavbarContent>

        {/* desktop items */}
        {/* desktop items*/}
      </NavbarContent>
    </Navbar>
  );
};
