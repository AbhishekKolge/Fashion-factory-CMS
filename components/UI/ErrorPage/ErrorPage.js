import BackButton from "../Button/BackButton";

import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <section className="h-100">
      <div className="container h-100 d-flex flex-column align-items-center justify-content-center gap-3">
        <h2 className="display-5">Something went wrong...</h2>
        <BackButton />
      </div>
    </section>
  );
};

export default ErrorPage;
