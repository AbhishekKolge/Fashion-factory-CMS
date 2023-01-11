import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import toast from "react-hot-toast";
import * as Yup from "yup";

import styles from "./ForgotPasswordForm.module.css";

import { useForgotPasswordMutation } from "../../store/slices/api/authApiSlice";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [
    forgotPassword,
    {
      isSuccess: forgotPasswordSuccess,
      isError: forgotPasswordIsError,
      isLoading: forgotPasswordLoading,
      error: forgotPasswordError,
    },
  ] = useForgotPasswordMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email("Email is not valid")
        .required("required"),
    }),
    onSubmit: async (values) => {
      await forgotPassword(values);
    },
  });

  useEffect(() => {
    if (forgotPasswordIsError) {
      if (forgotPasswordError.data?.msg) {
        toast.error(forgotPasswordError.data.msg.split(",")[0]);
      } else {
        toast.error("Something went wrong!, please try again");
      }
    }
    if (forgotPasswordSuccess) {
      toast.success("Password reset link sent");

      formik.resetForm();
      router.push({
        pathname: "/auth/login",
      });
    }
  }, [forgotPasswordIsError, forgotPasswordSuccess, forgotPasswordError]);

  return (
    <div className={`card ${styles.card} m-auto p-3`}>
      <div className="card-body">
        <form noValidate onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              required
              type="email"
              name="email"
              placeholder="Email Address"
              id="email"
              className={`form-control ${
                formik.touched.email && formik.errors.email && "is-invalid"
              } ${formik.touched.email && !formik.errors.email && "is-valid"} `}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>
          <button
            disabled={forgotPasswordLoading || forgotPasswordSuccess}
            type="submit"
            className="btn btn-primary w-100 mt-3 text-light"
          >
            Submit
          </button>
        </form>
        <ul className="list-group list-group-flush">
          <li className={`list-group-item text-center ${styles.listItem}`}>
            <Link
              href="/auth/login"
              className="text-primary fw-semibold text-decoration-none"
            >
              Go back to sign in
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
