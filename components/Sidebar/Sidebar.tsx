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
} from "@heroui/react";

import Link from "next/link";
import styles from "./Sidebar.module.css";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
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
      name: "Nosotros",
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
              <img
                className="h-8 w-8 rounded-full mr-5"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <p className="font-bold text-inherit">Virginia Martinez</p>
            </NavbarBrand>
          </NavbarContent>

          <div className="hidden sm:block md:block lg:block">
            {/* <SearchInput /> */}
          </div>

          <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
