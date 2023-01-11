import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { checkLoginStatus } from "../../store/actions/auth/authActions";

import LoadingPage from "../../components/UI/LoadingPage/LoadingPage";

const ProtectedRoute = (pageProps) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLoginStatus());
  }, []);

  useEffect(() => {
    if (isLoggedIn && pageProps?.loggedInProtected) {
      router.push({
        pathname: "/",
      });
    }

    if (
      isLoggedIn === false &&
      !pageProps?.loggedInProtected &&
      !pageProps?.open
    ) {
      router.push({
        pathname: "/auth/login",
      });
    }
  }, [isLoggedIn, pageProps.loggedInProtected, pageProps.open]);

  if (isLoggedIn === null) {
    return <LoadingPage />;
  }

  return pageProps.children;
};

export default ProtectedRoute;
