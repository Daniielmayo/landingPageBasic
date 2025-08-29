"use client";
import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import IconPhoneFlip from "../icons/Home/PhoneIcon";
import IconPaperPlane from "../icons/Home/PlanetIcon";
import IconSecurity from "../icons/Home/SecurityIcon";
import styles from "./Home.module.css";
import { getProducts } from "@/services/products/getProducts";
import { Products } from "@/types/products.type";
import { useAppDispatch } from "@/store/store";
import { allProducts } from "@/store/slices/productsSlice";
import { CardProduct } from "../Card/Card";
import Link from "next/link";
import IconBagCheck from "../icons/Home/BuyICons";
import { useSession } from "next-auth/react";
import ButtonWsp from "../ButtonWsp/ButtonWsp";

export const Home = () => {
  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<Products[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        dispatch(allProducts(productsData));
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, [dispatch, session]);

  return (
    <section className={styles["homePage"]}>
      <div className={styles["home__image--banner"]}></div>

      <div className={styles["home__content--benefits"]}>
        <div className={styles["home__card--benefits"]}>
          <div className={styles["home__card-image--benefits"]}>
            <IconPaperPlane className={styles["home__icon-card--benefits"]} />
          </div>
          <h3 className={styles["home__title-card--benefits"]}>
            Envío Gratuito
          </h3>
          <p></p>
        </div>
        <div className={styles["home__card--benefits"]}>
          <div className={styles["home__card-image--benefits"]}>
            <IconBagCheck className={styles["home__icon-card--benefits"]} />
          </div>
          <h3 className={styles["home__title-card--benefits"]}>
            Garantía de la compra
          </h3>
          <p></p>
        </div>
        <div className={styles["home__card--benefits"]}>
          <div className={styles["home__card-image--benefits"]}>
            <IconSecurity className={styles["home__icon-card--benefits"]} />
          </div>
          <h3 className={styles["home__title-card--benefits"]}>
            Compra segura
          </h3>
          <p></p>
        </div>
        <div className={styles["home__card--benefits"]}>
          <div className={styles["home__card-image--benefits"]}>
            <IconPhoneFlip className={styles["home__icon-card--benefits"]} />
          </div>
          <h3 className={styles["home__title-card--benefits"]}>Soporte</h3>
          <p></p>
        </div>
      </div>

      <div className={styles["home__container--product"]}>
        <div className={styles["home__content-image--product"]}>
          <img
            src="/home/product.webp"
            alt="product"
            className={styles["home__image--product"]}
          />
        </div>
        <div className={styles["home__content-info--product"]}>
          <h2 className={styles["home__title--product"]}>
            Transfer Factor <span>Plus</span>
          </h2>
          <p className={styles["home__description--product"]}>
            Nuestro producto principal para el sistema inmunitario que impulsa
            la actividad de las células asesinas naturales (NK) y contiene una
            mezcla exclusiva de hongos y zinc para respaldar el sistema
            inmunitario*
          </p>
          <div className={styles["home__content-price--product"]}>
            <p className={styles["home__price--product"]}>$ 65.00 </p>
            <Link
              href={
                "https://usnfr.4life.com/12315890/product/transfer-factor-plus-tri-factor/89"
              }
              target="_blank"
            >
              <Button className={styles["home__button--product"]}>
                Comprar
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles["home__container--featuredProduct"]}>
        <h2 className={styles["home__title--featuredProduct"]}>
          Productos destacados
        </h2>
        <div></div>
        <>
          {products.slice(0, 6).map((product, index) => (
            <CardProduct
              src={product.imageProduct}
              title={product.nameProduct}
              price={product.price}
              description={product.descriptionProduct}
              link4lifeProduct={product.link4lifeProduct}
              key={index}
            />
          ))}
        </>
        <div className={styles["home__content-button--featuredProduct"]}>
          <Link
            href={"/products"}
            className={styles["home__button--featuredProduct"]}
          >
            <Button className={styles["button--featuredProduct"]}>
              Ver más productos
            </Button>
          </Link>
        </div>
      </div>
      <div id="buy" className={styles["home__container--buy"]}>
        <h2 className={styles["home__title--buy"]}>Comprar es facíl</h2>
        <div className={styles["home__content-buy"]}>
          <div className={styles["home__content-step--buy"]}>
            <img
              src="/home/selectProduct.svg"
              alt=""
              className={styles["home__image-step--buy"]}
            />
            <div className={styles["home__content-info--buy"]}>
              <h2 className={styles["home__title-step--buy"]}>
                1.Selecciona el producto que deseas:
              </h2>
              <p className={styles["home__paragraph--buy"]}>
                Navega por nuestros productos de nuestra tienda online. Utiliza
                la barra de búsqueda en la sección de{" "}
                <Link
                  href="/products"
                  className={styles["home__paragraph-link--buy"]}
                >
                  {" "}
                  productos
                </Link>{" "}
                para encontrar lo que buscas. Lee las descripciones detalladas y
                revisa las imágenes para asegurarte de que el producto es el
                adecuado para ti y haz click en el producto.
              </p>
            </div>
          </div>
          <div className={styles["home__content-step--buy"]}>
            <img
              src="/home/addcart.svg"
              alt=""
              className={styles["home__image-step--buy"]}
            />
            <div className={styles["home__content-info--buy"]}>
              <h2 className={styles["home__title-step--buy"]}>
                2.Agrégala a tu carrito:
              </h2>
              <p className={styles["home__paragraph--buy"]}>
                Haz clic en el botón &quot; Agregar al carrito &quot; Puedes
                seguir comprando y agregando más productos a tu carrito antes de
                proceder a la compra.
              </p>
            </div>
          </div>
          <div className={styles["home__content-step--buy"]}>
            <img
              src="/home/pay.svg"
              alt=""
              className={styles["home__image-step--buy"]}
            />
            <div className={styles["home__content-info--buy"]}>
              <h2 className={styles["home__title-step--buy"]}>
                3.Realiza tu compra:
              </h2>
              <p className={styles["home__paragraph--buy"]}>
                Ingresa tu información de envío y pago. Elige entre las
                diferentes opciones de pago disponibles. Una vez que hayas
                completado tu pedido, recibirás un correo electrónico de
                confirmación con los detalles de tu compra.
              </p>
            </div>
          </div>
          <div className={styles["home__content-step--buy"]}>
            <img
              src="/home/box.svg"
              alt=""
              className={styles["home__image-step--buy"]}
            />
            <div className={styles["home__content-info--buy"]}>
              <h2 className={styles["home__title-step--buy"]}>
                4.Recibe tu compra:
              </h2>
              <p className={styles["home__paragraph--buy"]}>
                ¡Eso es todo! Tu pedido será procesado y enviado lo antes
                posible.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["home___container--about"]} id="about">
        <img
          src="/home/about.svg"
          alt="about"
          className={styles["home__image--about"]}
        />
        <div className={styles["home__content-info--about"]}>
          <h2 className={styles["home__title--about"]}>Acerca de mí</h2>
          <p className={styles["home__paragraph--about"]}>
            Hola, soy Virginia, distribuidora autorizada de 4Life. Estoy
            comprometida con la misión de mejorar la salud y el bienestar
            general de las personas. Me apasiona ayudar a mis clientes a
            alcanzar un mejor estado de salud mediante productos científicamente
            desarrollados y de la más alta calidad.
          </p>
        </div>
      </div>
      <div className={styles["home___container--contactMe"]} id="contact">
        <img
          src="/home/contactMe.svg"
          alt="contact me"
          className={styles["home__image--contactMe"]}
        />
        <div className={styles["home__content-info--contactMe"]}>
          <h2 className={styles["home__title--contactMe"]}>¡Contáctame!</h2>
          <p className={styles["home__paragraph--contactMe"]}>
            <span className={`${styles["textItalic"]} ${styles["textBold"]}`}>
              {" "}
              ¿Quieres mejorar tu bienestar?{" "}
            </span>{" "}
            explora una nueva oportunidad de ingresos y alcanzar tu libertad
            financiera. Escríbeme para darte toda la información.
          </p>
          <ButtonWsp />
        </div>
      </div>
    </section>
  );
};
