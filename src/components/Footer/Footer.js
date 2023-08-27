import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../api/constants";

const Footer = () => {
  const [footerData, setFooterData] = useState({});

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const responseFooterData = await fetch(`${BASE_URL}/api/aze`);
        const resultFooterData = await responseFooterData.json();
        setFooterData(resultFooterData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFooterData();
  }, []);

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

  return (
    <div className={styles.footer}>
      <div className={styles.paragraph}>
        <p>© 2023 {footerData.companyName} - All rights reserved.</p>
      </div>
      <div className={styles.company}>
        <h5>COMPANY</h5>
        <Link to="">HAQQIMIZDA</Link>
        <Link to="">FƏNNLƏR</Link>
        <Link to="">PAKETLƏR</Link>
      </div>
      <div className={styles.customer}>
        <h5>FOR CUSTOMER</h5>
        <Link to="">BLOG</Link>
        <Link to="">FAQ</Link>
        <Link to="">CONTACT</Link>
      </div>
      <div className={styles.contact}>
        <h5>CONTACT</h5>
        <Link to={`tel:${footerData.companyPhone}`}>
          {footerData.companyPhone}
        </Link>
        <Link to="">
          {`${footerData.companyAddress}`
            .toLocaleUpperCase()
            .replaceAll("I", "İ")}
        </Link>
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
