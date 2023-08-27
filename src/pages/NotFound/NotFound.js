import styles from "./NotFound.module.css";
import Button from "../../components/Button/Button";

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h2>OOPS!</h2>
      <p>404 - THE PAGE CAN'T BE FOUND.</p>
      <Button href="/">GO TO HOMEPAGE</Button>
    </div>
  );
};

export default NotFound;
