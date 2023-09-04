import { Container } from "@mui/material";
import Footer from "../../components/Footer/Footer";
import styles from "./Register.module.css";
import ScrollToTop from "react-scroll-to-top";
import bigEllipse from "../../img/big-ellipse.svg";
import littleOrangeEllipse from "../../img/little-orange-ellipse.svg";
import greenEllipse from "../../img/green-ellipse.svg";
import littleBlueEllipse from "../../img/little-blue-ellipse.svg";
import Header from "../../components/Header/Header";
import RegisterAccountTypes from "../../components/RegisterAccountTypes/RegisterAccountTypes";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../api/constants";
import { useParams } from "react-router-dom";

const Register = () => {
  const params = useParams();
  const language = params.lang;

  const [registerData, setRegisterData] = useState({});

  useEffect(() => {
    const fetchRegisterData = async () => {
      try {
        const responseRegisterData = await fetch(
          `${BASE_URL}/api/register/${language ? language : "aze"}`
        );
        const resultRegisterData = await responseRegisterData.json();
        setRegisterData(resultRegisterData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRegisterData();
  }, [language]);

  function translate(original) {
    if (registerData.languages) {
      for (let i = 0; i < registerData.languages.length; i++) {
        if (original == registerData.languages[i].o) {
          return registerData.languages[i].t;
        }
      }
    }
    return original;
  }

  document.querySelector("head > title").innerHTML = `${translate(
    "Qeydiyyat səhifəsi"
  )}`;

  return (
    <div className={styles.register}>
      <Container className={styles.container}>
        <Header url="register" />
        <div className={styles.registerTop}>
          <div className={styles.registerTopLeft}>
            <h1>{translate("Qeydiyyat səhifəsi")}</h1>
            <p>
              {translate(
                "Zəhmət olmasa, qeydiyyatdan keçin və xidmətlərimizdən yararlanın."
              )}
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

        <RegisterAccountTypes registerData={registerData} />
        <Footer />
        <img
          className={styles.greenEllipse2}
          src={greenEllipse}
          alt="green ellipse"
        />
      </Container>
      <ScrollToTop className={styles.scrollToTop} smooth />
    </div>
  );
};

export default Register;
