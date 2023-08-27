import Button from "../Button/Button";
import styles from "./RegisterAccountTypes.module.css";
import student from "../../img/student.svg";
import parent from "../../img/parent.svg";
import teacher from "../../img/teacher.svg";
import { useEffect } from "react";

const RegisterAccountTypes = () => {
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

  return (
    <div className={styles.registerAccountTypes}>
      <h2>Hesab tipi seçin</h2>
      <div
        className={`registerAccountContainer ${styles.registerAccountContainer}`}
      >
        <Button>
          <img src={student} alt="student" />
          <h2>Şagird</h2>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </Button>
        <Button>
          <img src={parent} alt="parent" />
          <h2>Valideyn</h2>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </Button>
        <Button>
          <img src={teacher} alt="teacher" />
          <h2>Müəllim</h2>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </Button>
      </div>
    </div>
  );
};

export default RegisterAccountTypes;
