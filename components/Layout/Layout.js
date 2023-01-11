import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

import styles from "./Layout.module.css";

import { useLogoutMutation } from "../../store/slices/api/authApiSlice";
import { logoutHandler } from "../../store/actions/auth/authActions";

const Layout = (pageProps) => {
  const { children, hideSidebar, loggedInProtected } = pageProps;
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [
    logout,
    {
      isSuccess: logoutSuccess,
      isError: logoutIsError,
      isLoading: logoutLoading,
      error: logoutError,
    },
  ] = useLogoutMutation();

  const onLogout = async () => {
    await logout();
  };

  useEffect(() => {
    if (logoutIsError) {
      if (logoutError.data?.msg) {
        toast.error(logoutError.data.msg.split(",")[0]);
      } else {
        toast.error("Something went wrong!, please try again");
      }
    }

    if (logoutSuccess) {
      dispatch(logoutHandler());
      toast.success("Logout successfully");
      router.push({
        pathname: "/auth/login",
      });
    }
  }, [logoutIsError, logoutError, logoutSuccess]);

  if (hideSidebar || loggedInProtected) {
    return (
      <>
        <nav
          className={`navbar navbar-expand-md  fixed-top bg-primary ${styles.nav}`}
        >
          <div className="container">
            <Link href="/" className="navbar-brand">
              <Image
                priority={true}
                className={styles.brand}
                src="/logo-light.png"
                alt="fashion factory logo"
                width={200}
                height={40}
              />
            </Link>
            <button
              className={`navbar-toggler ${styles.navToggler}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navMenu"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navMenu">
              <ul className="navbar-nav ms-auto">
                {!isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <Link
                        href="/auth/login"
                        className={`${
                          router.pathname == "/auth/login" ? styles.current : ""
                        } nav-link ${
                          styles.link
                        } d-flex flex-column align-items-center`}
                        aria-current="login"
                      >
                        <i className="bi bi-box-arrow-in-right  d-none d-md-block mb-2"></i>
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="/auth/sign-up"
                        className={`${
                          router.pathname == "/auth/sign-up"
                            ? styles.current
                            : ""
                        } nav-link ${
                          styles.link
                        } d-flex flex-column align-items-center`}
                        aria-current="sign-up"
                      >
                        <i className="bi bi-person-plus-fill d-none d-md-block  mb-2"></i>
                        Sign Up
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <button
                      onClick={onLogout}
                      className="btn d-flex align-items-center gap-2 text-light"
                    >
                      <i className="bi bi-box-arrow-right d-none d-md-block"></i>
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer></footer>
      </>
    );
  }
  return (
    <>
      <nav
        className={`navbar navbar-expand-md  fixed-top bg-primary ${styles.nav}`}
      >
        <div className="container">
          <Link href="/" className="navbar-brand">
            <Image
              priority={true}
              className={styles.brand}
              src="/logo-light.png"
              alt="fashion factory logo"
              width={200}
              height={40}
            />
          </Link>
          <button
            className={`navbar-toggler ${styles.navToggler}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto">
              {!isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link
                      href="/auth/login"
                      className={`${
                        router.pathname == "/auth/login" ? styles.current : ""
                      } nav-link ${
                        styles.link
                      } d-flex flex-column align-items-center`}
                      aria-current="login"
                    >
                      <i className="bi bi-box-arrow-in-right  d-none d-md-block mb-2"></i>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/auth/sign-up"
                      className={`${
                        router.pathname == "/auth/sign-up" ? styles.current : ""
                      } nav-link ${
                        styles.link
                      } d-flex flex-column align-items-center`}
                      aria-current="sign-up"
                    >
                      <i className="bi bi-person-plus-fill d-none d-md-block  mb-2"></i>
                      Sign Up
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button
                    onClick={onLogout}
                    className="btn d-flex align-items-center gap-2 text-light"
                  >
                    <i className="bi bi-box-arrow-right d-none d-md-block"></i>
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <main>
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div className="col-sm-auto sticky-top bg-primary">
              <div className="d-flex flex-sm-column flex-row flex-nowrap align-items-center sticky-top ">
                <ul className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
                  <li>
                    <Link
                      href="/orders"
                      className="nav-link py-3 px-2 text-light"
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      data-bs-original-title="Orders"
                    >
                      <i className="bi bi-currency-rupee fs-2"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products"
                      className="nav-link py-3 px-2 text-light"
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      data-bs-original-title="Products"
                    >
                      <i className="bi bi-tag fs-2"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/customers"
                      className="nav-link py-3 px-2 text-light"
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      data-bs-original-title="Customers"
                    >
                      <i className="bi bi-person fs-2"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/coupons"
                      className="nav-link py-3 px-2 text-light"
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      data-bs-original-title="Coupons"
                    >
                      <i className="bi bi-gift fs-2"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/settings"
                      className="nav-link py-3 px-2 text-light"
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      data-bs-original-title="Settings"
                    >
                      <i className="bi bi-gear fs-2"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm p-3 h-100 bg-light">
              <div className="container h-100">{children}</div>
            </div>
          </div>
        </div>
      </main>
      <footer></footer>
    </>
  );
};

export default Layout;
