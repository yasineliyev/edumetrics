import { Container } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./Register.module.css";
import ScrollToTop from "react-scroll-to-top";
import bigEllipse from "../../img/big-ellipse.svg";
import littleOrangeEllipse from "../../img/little-orange-ellipse.svg";
import greenEllipse from "../../img/green-ellipse.svg";
import littleBlueEllipse from "../../img/little-blue-ellipse.svg";
import { Outlet } from "react-router-dom";

const Register = () => {
  return (
    <div className={styles.register}>
      <Container className={styles.container}>
        <Header />
        <div className={styles.registerTop}>
          <div className={styles.registerTopLeft}>
            <h1>Qeydiyyat səhifəsi</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
              dignissimos ipsam explicabo.
            </p>
          </div>
          <div className={styles.registerTopRight}>
            <div className={styles.ellipseContainer}>
              <img
                className={styles.bigEllipse}
                src={bigEllipse}
                alt="big ellipse"
              />
              <img
                className={styles.littleOrangeEllipse}
                src={littleOrangeEllipse}
                alt="orange ellipse"
              />
              <img
                className={styles.greenEllipse}
                src={greenEllipse}
                alt="green ellipse"
              />
              <img
                className={styles.littleBlueEllipse}
                src={littleBlueEllipse}
                alt="blue ellipse"
              />
            </div>
          </div>
        </div>

        <Outlet />
        <Footer />
      </Container>
      <ScrollToTop className={styles.scrollToTop} smooth />
    </div>
  );
};

export default Register;
