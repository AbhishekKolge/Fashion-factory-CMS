import { useRouter } from "next/router";

const BackButton = (props) => {
  const { className, pathname } = props;
  const router = useRouter();

  const goBackHandler = () => {
    const pathArr = router.pathname.split("/");
    pathArr.pop();
    const previousPathname = pathArr.join("/");

    router.push({
      pathname: previousPathname || "/",
    });
  };
  return (
    <button onClick={goBackHandler} className={`btn btn-light ${className}`}>
      <i className="bi bi-arrow-left"></i> Go back
    </button>
  );
};

export default BackButton;
