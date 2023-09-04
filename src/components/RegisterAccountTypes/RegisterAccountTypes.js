import Button from "../Button/Button";
import styles from "./RegisterAccountTypes.module.css";
import student from "../../img/student.svg";
import parent from "../../img/parent.svg";
import teacher from "../../img/teacher.svg";
import bigOrangeEllipse from "../../img/big-orange-ellipse.svg";
import { useEffect } from "react";

const RegisterAccountTypes = ({ registerData }) => {
  useEffect(() => {
    const colors = [
      { color: "#4ae49d" },
      { color: "#ffa753" },
      { color: "#6cccff" },
    ];

    let button = document.querySelectorAll(".registerAccountContainer a");

    for (let i = 0; i < button.length; i++) {
      if (button[i]) {
        button[i].style.borderColor = colors[i].color;
      }
    }
  }, []);

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

  return (
    <div className={styles.registerAccountTypes}>
      <h2>{translate("Hesab tipi seçin")}.</h2>
      <img
        className={styles.bigOrangeEllipse}
        src={bigOrangeEllipse}
        alt="big-orange"
      />
      <div
        className={`registerAccountContainer ${styles.registerAccountContainer}`}
      >
        <Button>
          <img src={student} alt="student" />
          <h2>{translate("Şagird")}</h2>
          <p>{translate("Şagird üçün qeydiyyat")}</p>
        </Button>
        <Button>
          <img src={parent} alt="parent" />
          <h2>{translate("Valideyn")}</h2>
          <p>{translate("Valideyn üçün qeydiyyat")}</p>
        </Button>
        <Button>
          <img src={teacher} alt="teacher" />
          <h2>{translate("Müəllim")}</h2>
          <p>{translate("Müəllim üçün qeydiyyat")}</p>
        </Button>
      </div>
    </div>
  );
};

export default RegisterAccountTypes;
