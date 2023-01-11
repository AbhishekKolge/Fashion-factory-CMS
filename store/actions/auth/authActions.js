import { authActions } from "../../slices/auth/authSlice";
import {
  checkTimeIsExpired,
  calculateRemainingTime,
} from "../../../helpers/time";

import {
  saveAuthToLocal,
  getAuthFromLocal,
  removeAuthFromLocal,
} from "../../../helpers/storage";

const checkLoginStatus = () => {
  return (dispatch) => {
    const authDetails = getAuthFromLocal();

    if (
      authDetails?.accessToken &&
      authDetails?.refreshToken &&
      authDetails?.accessTokenExpirationTime &&
      authDetails?.refreshTokenExpirationTime &&
      authDetails?.userId
    ) {
      const {
        accessToken,
        refreshToken,
        accessTokenExpirationTime,
        refreshTokenExpirationTime,
        userId,
      } = authDetails;
      const accessTokenExpired = checkTimeIsExpired(accessTokenExpirationTime);
      const refreshTokenExpired = checkTimeIsExpired(
        refreshTokenExpirationTime
      );

      if (accessTokenExpired) {
        removeAuthFromLocal();
        dispatch(authActions.logout());
        return;
      }
      if (refreshTokenExpired) {
        // return;
      }

      dispatch(
        authActions.login({
          accessToken,
          refreshToken,
          accessTokenExpirationTime,
          refreshTokenExpirationTime,
          userId,
        })
      );
      const autoLogoutTime = calculateRemainingTime(accessTokenExpirationTime);

      setTimeout(() => {
        removeAuthFromLocal();
        dispatch(authActions.logout());
      }, autoLogoutTime);

      return;
    }
    removeAuthFromLocal();
    dispatch(authActions.logout());
  };
};

const loginHandler = (authDetails) => {
  return (dispatch) => {
    const { accessToken, refreshToken, userId } = authDetails;

    const shortExp = 1000 * 60 * 60 * 6;
    const longerExp = 1000 * 60 * 60 * 24;

    const accessTokenExpirationTime = Date.now() + shortExp;
    const refreshTokenExpirationTime = Date.now() + longerExp;

    saveAuthToLocal({
      accessToken,
      refreshToken,
      accessTokenExpirationTime,
      refreshTokenExpirationTime,
      userId,
    });
    dispatch(
      authActions.login({
        accessToken,
        refreshToken,
        accessTokenExpirationTime,
        refreshTokenExpirationTime,
        userId,
      })
    );

    const autoLogoutTime = calculateRemainingTime(accessTokenExpirationTime);

    setTimeout(() => {
      removeAuthFromLocal();
      dispatch(authActions.logout());
    }, autoLogoutTime);
  };
};

const logoutHandler = () => {
  return (dispatch) => {
    removeAuthFromLocal();
    dispatch(authActions.logout());
  };
};

export { checkLoginStatus, loginHandler, logoutHandler };
