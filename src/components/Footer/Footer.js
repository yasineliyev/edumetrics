import styles from "./Footer.module.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../api/constants";

const Footer = () => {
  const params = useParams();
  const language = params.lang;

  const [footerData, setFooterData] = useState({});

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const responseFooterData = await fetch(
          `${BASE_URL}/api/${language ? language : "aze"}`
        );
        const resultFooterData = await responseFooterData.json();
        setFooterData(resultFooterData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFooterData();
  }, [language]);

  useEffect(() => {
    if (footerData.socials) {
      for (let i = 0; i < footerData.socials.length; i++) {
        try {
          const fetchIconFooter = async () => {
            const responseIconFooter = await fetch(
              `${BASE_URL}${footerData.socials[i].iconUrl}`
            );
            const resultIconFooter = await responseIconFooter.text();
            if (document.querySelectorAll(".footerIcon")[i]) {
              document.querySelectorAll(".footerIcon")[i].innerHTML =
                resultIconFooter;
            }
          };
          fetchIconFooter();
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [footerData]);

  function translate(original) {
    if (footerData.languages) {
      for (let i = 0; i < footerData.languages.length; i++) {
        if (original == footerData.languages[i].o) {
          return footerData.languages[i].t;
        }
      }
    }
    return original;
  }

  return (
    <div className={styles.footer}>
      <div className={styles.paragraph}>
        <p>
          © 2023 {footerData.companyName} -{" "}
          {translate("Bütun hüquqlar qorunur")}.
        </p>
      </div>
      <div className={styles.company}>
        <h5>{translate("ŞİRKƏT")}</h5>
        <Link to="">{translate("HAQQIMIZDA")}</Link>
        <Link to="">{translate("FƏNLƏR")}</Link>
        <Link to="">{translate("PAKETLƏR")}</Link>
      </div>
      <div className={styles.customer}>
        <h5>{translate("MÜŞTƏRİLƏR ÜÇÜN")}</h5>
        <Link to="">{translate("BLOQ")}</Link>
        <Link to="">{translate("TEZ-TEZ VERİLƏN SUALLAR")}</Link>
        <Link to="">{translate("ƏLAQƏ")}</Link>
      </div>
      <div className={styles.contact}>
        <h5>{translate("ƏLAQƏ")}</h5>
        <Link to={`tel:${footerData.companyPhone}`}>
          {footerData.companyPhone}
        </Link>
        <Link to="">{`${translate(footerData.companyAddress)}`}</Link>
        <Link
          to={`mailto:${
            footerData.companyEmail ? footerData.companyEmail : "INFO@XXXX.COM"
          }`}
        >
          {footerData.companyEmail ? footerData.companyEmail : "INFO@XXXX.COM"}
        </Link>
      </div>
      <div className={styles.socialNetwork}>
        {footerData.socials &&
          footerData.socials.map((social, index) => {
            return (
              <Link key={index} to={social.url} target="_blank">
                <div className="footerIcon"></div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Footer;
