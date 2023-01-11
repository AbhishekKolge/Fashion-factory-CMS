import styles from "./Spinner.module.css";

const Spinner = ({ className }) => {
  return (
    <div className="d-flex justify-content-center mb-3">
      <div
        className={`spinner-border text-primary ${styles.spinner} ${className}`}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
