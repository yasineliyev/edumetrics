import { Container } from "@mui/system";
import Header from "../../components/Header/Header";
import styles from "./Home.module.css";
import "../../css/carousel.css";
import Button from "../../components/Button/Button";
import bigEllipse from "../../img/big-ellipse.svg";
import greenEllipse from "../../img/green-ellipse.svg";
import littleBlueEllipse from "../../img/little-blue-ellipse.svg";
import arrow from "../../img/arrow.png";
import light from "../../img/light.png";
import bigOrangeEllipse from "../../img/big-orange-ellipse.svg";
import littleOrangeEllipse from "../../img/little-orange-ellipse.svg";
import bigBlueEllipse from "../../img/big-blue-ellipse.svg";
import victory from "../../img/victory.png";
import { BASE_URL } from "../../api/constants";
import bigGreenEllipse from "../../img/big-green-ellipse.svg";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ScrollToTop from "react-scroll-to-top";
import { useParams } from "react-router-dom";

const Home = () => {
  const params = useParams();
  const language = params.lang;

  const [loading, setLoading] = useState(false);
  const [mainData, setMainData] = useState({});
  const [services, setServices] = useState([]);
  const [topics, setTopics] = useState([]);
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const responseMainData = await fetch(
          `${BASE_URL}/api/${language ? language : "aze"}`
        );
        const resultMainData = await responseMainData.json();
        setMainData(resultMainData);

        const responseServices = await fetch(`${BASE_URL}/api/getServices`);
        const resultServices = await responseServices.json();
        setServices(resultServices);

        const responseTopics = await fetch(`${BASE_URL}/api/getTopics`);
        const resultTopics = await responseTopics.json();
        setTopics(resultTopics);

        const responseLeaders = await fetch(`${BASE_URL}/api/getLeaders`);
        const resultLeaders = await responseLeaders.json();
        setLeaders(resultLeaders);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, [language]);

  useEffect(() => {
    for (let i = 0; i < services.length; i++) {
      try {
        const fetchIconServices = async () => {
          const responseIconServices = await fetch(
            `${BASE_URL}${services[i].iconUrl}`
          );
          const resultIconServices = await responseIconServices.text();
          if (document.querySelectorAll(".serviceIcon")[i]) {
            document.querySelectorAll(".serviceIcon")[i].innerHTML =
              resultIconServices;
          }
        };
        fetchIconServices();
      } catch (error) {
        console.log(error);
      }
    }
  });

  useEffect(() => {
    for (let j = 0; j < topics.length; j++) {
      const fetchIconTopics = async () => {
        if (topics[j].iconUrl) {
          const responseIconTopics = await fetch(
            `${BASE_URL}${topics[j].iconUrl}`
          );
          const resultIconTopics = await responseIconTopics.text();
          if (document.querySelectorAll(".topicIcon")[j]) {
            document.querySelectorAll(".topicIcon")[j].innerHTML =
              resultIconTopics;
          }
          if (document.querySelectorAll(".topicsContainer a")[j]) {
            document.querySelectorAll(".topicsContainer a")[
              j
            ].style.borderColor = document
              .querySelectorAll(".topicIcon")
              [j].querySelector("svg path")
              .getAttribute("fill");
          }

          if (document.querySelectorAll(".topicIcon")[j]) {
            document.querySelectorAll(".topicIcon")[
              j
            ].style.backgroundColor = `${document
              .querySelectorAll(".topicIcon")
              [j].querySelector("svg path")
              .getAttribute("fill")}11`;
          }
        } else {
          return null;
        }
      };
      fetchIconTopics();
    }
  });

  useEffect(() => {
    const colors = [
      { color: "#4ae49e" },
      { color: "#ffa753" },
      { color: "#28b5ff" },
      { color: "#f54242" },
      { color: "#ecf542" },
      { color: "#42f5d1" },
      { color: "#f542f2" },
      { color: "#f54290" },
    ];

    for (let k = 0; k < leaders.length; k++) {
      if (document.querySelectorAll(".leadersContainer a")[k]) {
        document.querySelectorAll(".leadersContainer a")[k].style.borderColor =
          colors[k].color;
      }
      if (document.querySelectorAll(".leaderResult")[k]) {
        document.querySelectorAll(".leaderResult")[k].style.color =
          colors[k].color;
      }
    }
  });

  let settings = {
    dots: true,
    arrows: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: false,
    draggable: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function translate(original) {
    if (mainData.languages) {
      for (let i = 0; i < mainData.languages.length; i++) {
        if (original == mainData.languages[i].o) {
          return mainData.languages[i].t;
        }
      }
    }
    return original;
  }

  const translateCompetitions =
    "Reallıq belədir ki, yarış və rəqabət insanların motivasiyasını yüksəldir, onların daha  səy göstərməsinə səbəb olur.";

  const translateExaminations =
    "Tez-tez sınaq imtahanlarda iştirak edən insanlara diqqət yetirdikdə, onların oxumağa daha həvəsli olduqlarını görə bilərik.";

  document.querySelector("head > title").innerHTML = `Edumetrics - ${translate(
    "Təhsil Platformamıza xoş gəlmisiniz!"
  )}`;

  return (
    <div className={styles.home}>
      <Container className={styles.container}>
        {loading ? (
          <div className={styles.loading}>
            <h2>Edumetrics</h2>
            <img src={`${BASE_URL}/api/logo`} alt="loading" />
          </div>
        ) : (
          <>
            <Header />
            <div className={styles.contact}>
              <div className={`${styles.contactLeft} contactLeft`}>
                <h1>{translate(mainData.headerText)}</h1>
                <p>
                  {translate(
                    "Siz də övladınızın inkişaf etməyini istəyirsinizsə, bizə etibar edə bilərsiniz!"
                  )}
                </p>
                <Button href="/register">
                  {translate("İNDİ QEYDİYYATDAN KEÇ")}
                </Button>
              </div>

              <div className={styles.contactRight}>
                <img
                  className={styles.bigEllipse}
                  src={bigEllipse}
                  alt="big ellipse"
                />
                <img
                  className={styles.pupilImg}
                  src={`${BASE_URL}${mainData.headerImage}`}
                  alt="pupil"
                />
                <img
                  className={styles.greenEllipse}
                  src={greenEllipse}
                  alt="green ellipse"
                />
                <img
                  className={styles.littleBlueEllipse}
                  src={littleBlueEllipse}
                  alt="little ellipse"
                />
              </div>
            </div>

            <div className={styles.exams}>
              <img
                className={styles.greenEllipse2}
                src={greenEllipse}
                alt="green ellipse"
              />
              <h2>{translate("BİZİMLƏ SINA!")}</h2>
              <img
                src={bigOrangeEllipse}
                className={styles.bigOrangeEllipse}
                alt="orange ellipse"
              />
              <div className={styles.examsBoxContainer}>
                <Button>
                  <img src={arrow} alt="yarışlar" />
                  <h3>{translate("YARIŞLAR")}</h3>
                  <p>
                    {translate(translateCompetitions) &&
                    translate(translateCompetitions).length > 140
                      ? `${translate(translateCompetitions).slice(0, 138)}...`
                      : translate(translateCompetitions)}
                  </p>
                </Button>
                <Button>
                  <img src={light} alt="sınaqlar" />
                  <h3>{translate("SINAQLAR")}</h3>
                  <p>
                    {translate(translateExaminations) &&
                    translate(translateExaminations).length > 140
                      ? `${translate(translateExaminations).slice(0, 138)}...`
                      : translate(translateExaminations)}
                  </p>
                </Button>
              </div>
              <img
                src={littleOrangeEllipse}
                className={styles.littleOrangeEllipse}
                alt="orange ellipse"
              />
            </div>

            <div className={styles.services}>
              <h2>{translate("BİZİM SERVİSLƏR")}</h2>
              <img
                src={bigGreenEllipse}
                className={styles.bigGreenEllipse}
                alt="green ellipse"
              />
              <div className={styles.servicesContainer}>
                {services &&
                  services.map((service, index) => {
                    return (
                      <Button key={index}>
                        <div
                          className={`serviceIcon ${styles.serviceIconContainer}`}
                        ></div>
                        <div className={styles.serviceContent}>
                          <h3>
                            {translate(service.name).length > 21
                              ? `${translate(service.name).slice(0, 21)}...`
                              : translate(service.name)}
                          </h3>
                          <p>
                            {translate(service.description).length > 75
                              ? `${translate(service.description).slice(
                                  0,
                                  75
                                )}...`
                              : translate(service.description)}
                          </p>
                        </div>
                      </Button>
                    );
                  })}
              </div>
            </div>

            <div className={styles.topics}>
              <h2>{translate("TOP FƏNLƏR")}</h2>
              <div className={`topicsContainer ${styles.topicsContainer}`}>
                <Slider {...(settings && { ...settings })}>
                  {topics &&
                    topics.map((topic, index) => (
                      <Button key={index}>
                        <div className={styles.topicContainer}>
                          <div
                            className={`topicIcon ${styles.topicIconContainer}`}
                          ></div>
                          <div className={styles.topicContent}>
                            <h3>{translate(topic.subject)}</h3>
                            {topic.topics &&
                              topic.topics.map((item, index) => {
                                return (
                                  <div key={index}>
                                    <p>{translate(item.topic)}</p>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </Button>
                    ))}
                </Slider>
              </div>
            </div>

            <div className={styles.leaders}>
              <h2>{translate("LİDERLƏR LÖVHƏSİ")}</h2>
              <div className={`leadersContainer ${styles.leadersContainer}`}>
                {leaders &&
                  leaders.map((leader, index) => (
                    <Button key={index}>
                      <div className={styles.leaderContainer}>
                        <div className={styles.leaderIconContainer}>
                          <img src={victory} alt="victory symbol" />
                        </div>
                        <div className={styles.leaderContent}>
                          <div className={styles.leaderImgContainer}>
                            <img
                              src={`${BASE_URL}${leader.imageUrl}`}
                              alt="leader"
                            />
                          </div>
                          <h3>
                            {translate(leader.name).length > 24
                              ? `${translate(leader.name).slice(0, 24)}...`
                              : translate(leader.name)}
                          </h3>
                          <p>{translate(leader.description)}</p>
                          <span className="leaderResult">{leader.result}</span>
                        </div>
                      </div>
                    </Button>
                  ))}
              </div>
              <img
                className={styles.bigBlueEllipse}
                src={bigBlueEllipse}
                alt="blue ellipse"
              />
            </div>

            <div className={styles.packages}>
              <h2>{translate("TƏHSİL PAKETLƏRİMİZ")}</h2>
              <div className={styles.packagesContainer}>
                <div className={styles.packageContainer}>
                  <div className={styles.packageContent}>
                    <h3>{translate("Standart Paket")}</h3>
                    <span className={styles.packagePrice}>
                      {mainData.argument1}
                      <span className={styles.packagePriceTime}>
                        {" "}
                        / {translate("Ay")}
                      </span>
                    </span>
                    <p>{translate("Standart paketimiz")}</p>
                    <Button href="/register">
                      {translate("QEYDİYYATDAN KEÇ")}
                    </Button>
                  </div>
                </div>

                <div className={styles.packageContainer}>
                  <div className={styles.packageContent}>
                    <h3>{translate("Premium Paket")}</h3>
                    <span className={styles.packagePrice}>
                      {mainData.argument2}
                      <span className={styles.packagePriceTime}>
                        {" "}
                        / {translate("Ay")}
                      </span>
                    </span>
                    <p>{translate("Premium paketimiz")}</p>
                    <Button href="/register">
                      {translate("QEYDİYYATDAN KEÇ")}
                    </Button>
                  </div>
                </div>

                <div className={styles.packageContainer}>
                  <div className={styles.packageContent}>
                    <h3>{translate("Premium -2 Paket")}</h3>
                    <span className={styles.packagePrice}>
                      {mainData.argument3}
                      <span className={styles.packagePriceTime}>
                        {" "}
                        / {translate("Ay")}
                      </span>
                    </span>
                    <p>{translate("Premium -2 paketimiz")}</p>
                    <Button href="/register">
                      {translate("QEYDİYYATDAN KEÇ")}
                    </Button>
                  </div>
                </div>
              </div>
              <img
                src={littleOrangeEllipse}
                className={styles.littleOrangeEllipse2}
                alt="orange ellipse"
              />
            </div>

            <Footer />
          </>
        )}
      </Container>
      <ScrollToTop className={styles.scrollToTop} smooth />
    </div>
  );
};

export default Home;
