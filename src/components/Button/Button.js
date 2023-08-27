import { Link } from "react-router-dom";
import styles from "./Button.module.css";

const Button = ({ children, href }) => {
  return (
    <Link to={href} className={styles.button}>
      {children}
    </Link>
  );
};

export default Button;
