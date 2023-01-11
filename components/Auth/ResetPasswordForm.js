import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

import styles from "./ResetPasswordForm.module.css";

import { useResetPasswordMutation } from "../../store/slices/api/authApiSlice";

const ResetPasswordForm = () => {
  const router = useRouter();
  const { token, email } = router.query;
  const [
    resetPassword,
    {
      isSuccess: resetPasswordSuccess,
      isError: resetPasswordIsError,
      isLoading: resetPasswordLoading,
      error: resetPasswordError,
    },
  ] = useResetPasswordMutation();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .trim()
        .password()
        .min(8, "Must be minimum 8 characters")
        .minLowercase(1, "Must include 1 lowercase letter")
        .minUppercase(1, "Must include 1 uppercase letter")
        .minSymbols(1, "Must include 1 special letter")
        .minNumbers(1, "Must include 1 number letter")
        .required("required"),
      confirmPassword: Yup.string()
        .trim()
        .required("required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      await resetPassword({
        password: values.password,
        token,
        email,
      });
    },
  });

  useEffect(() => {
    if (!token || !email) {
      toast.error("Verification failed");
      router.push({
        pathname: "/auth/login",
      });
    }
  }, [token, email]);

  useEffect(() => {
    if (resetPasswordIsError) {
      if (resetPasswordError.data?.msg) {
        toast.error(resetPasswordError.data.msg.split(",")[0]);
      } else {
        toast.error("Something went wrong!, please try again");
      }
    }
    if (resetPasswordSuccess) {
      formik.resetForm();
      toast.success("Password changed successfully");
      router.push({
        pathname: "/auth/login",
      });
    }
  }, [resetPasswordIsError, resetPasswordSuccess, resetPasswordError]);

  return (
    <div className={`card ${styles.card} m-auto p-3`}>
      <div className="card-body">
        <form noValidate onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              required
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              className={`form-control ${
                formik.touched.password &&
                formik.errors.password &&
                "is-invalid"
              } ${
                formik.touched.password && !formik.errors.password && "is-valid"
              } `}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />

            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              required
              type="password"
              name="confirmPassword"
              placeholder="confirm Password"
              id="confirmPassword"
              className={`form-control ${
                formik.touched.confirmPassword &&
                formik.errors.confirmPassword &&
                "is-invalid"
              } ${
                formik.touched.confirmPassword &&
                !formik.errors.confirmPassword &&
                "is-valid"
              } `}
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />

            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div className="invalid-feedback">
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>
          <button
            disabled={resetPasswordLoading || resetPasswordSuccess}
            type="submit"
            className="btn btn-primary w-100 mt-3 text-light"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
