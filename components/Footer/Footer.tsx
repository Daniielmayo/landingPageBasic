import Link from "next/link";
import styles from "./Footer.module.css";
import { Button } from "../Button/Button";
import IconPhoneFlip from "../icons/Footer/ContactIcons";
import IconBoxSeam from "../icons/Footer/ProductsIoons";
import { IconIconHome } from "../icons/Footer/HomeIcon";
import IconCardOutline from "../icons/Footer/BuyIcon";

export const Footer = () => {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer-container-item"]}>
        <div className={styles["footer__container"]}>
          <p className={styles["title__footer"]}>© 2024 Virginia Martinez</p>
          <p className={styles["text__footer"]}>
            Página oficial 4LIFE
            <Link
              href="https://www.4life.com/12315890"
              target="_blanc"
              className={styles["footer__link"]}
            >
              https://4life.com
            </Link>
          </p>
          <p className={styles["footer__paragraph"]}>
            Esta página esta creada para dar mayor visibilidad a los productos
            de 4LIFE como distribuidor autorizado de la marca.
          </p>
        </div>

        <div className={styles["footer__items"]}>
          <div className={styles["footer__content--items"]}>
            <Link href="/" className={styles["footer__link"]}>
              <div className={styles["footer__items--header"]}>
                <IconIconHome />
                <p>Home</p>
              </div>
            </Link>
            <Link href={"/products"} className={styles["footer__link"]}>
              <div className={styles["footer__items--header"]}>
                <IconBoxSeam />
                <p>Productos</p>
              </div>
            </Link>
            <Link href={"/#buy"} className={styles["footer__link"]}>
              <div className={styles["footer__items--header"]}>
                <IconCardOutline />
                <p>Como comprar</p>
              </div>
            </Link>
            <Link href={"/#contact"} className={styles["footer__link"]}>
              <div className={styles["footer__items--header"]}>
                <IconPhoneFlip /> <p>Contacto</p>
              </div>
            </Link>
          </div>
          <div className={styles["footer__button--items"]}>
            <Link href={"/login"}>
              <Button className={styles['footer__button-login--items']}>Iniciar Sesión</Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
