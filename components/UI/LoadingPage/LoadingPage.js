import styles from "./LoadingPage.module.css";

import Spinner from "../Spinner/Spinner";

const LoadingPage = () => {
  return (
    <section className="h-100">
      <div className="container h-100 d-flex align-items-center justify-content-center">
        <Spinner />
      </div>
    </section>
  );
};

export default LoadingPage;
