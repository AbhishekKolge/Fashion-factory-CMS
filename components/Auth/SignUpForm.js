import Link from "next/link";
import { useEffect } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import YupPassword from "yup-password";
import "yup-phone";
YupPassword(Yup);

import styles from "./SignUpForm.module.css";

import { useRegisterMutation } from "../../store/slices/api/authApiSlice";

const SignUpForm = () => {
  const [
    register,
    {
      isSuccess: registerSuccess,
      isError: registerIsError,
      isLoading: registerLoading,
      error: registerError,
    },
  ] = useRegisterMutation();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      contactNo: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .trim()
        .min(3, "Must be minimum 3 characters")
        .max(20, "Must not be more than 20 characters")
        .required("Required"),
      lastName: Yup.string()
        .trim()
        .max(20, "Must not be more than 20 characters"),
      contactNo: Yup.string()
        .trim()
        .phone("IN", "Please enter a valid contact no"),
      email: Yup.string()
        .trim()
        .email("Email is not valid")
        .required("required"),
      password: Yup.string()
        .trim()
        .password()
        .min(8, "Must be minimum 8 characters")
        .minLowercase(1, "Must include 1 lowercase letter")
        .minUppercase(1, "Must include 1 uppercase letter")
        .minSymbols(1, "Must include 1 special letter")
        .minNumbers(1, "Must include 1 number letter")
        .required("required"),
    }),
    onSubmit: async (values) => {
      values.contactNo = values.contactNo.toString();
      await register(values);
    },
  });

  useEffect(() => {
    if (registerIsError) {
      if (registerError.data?.msg) {
        toast.error(registerError.data.msg.split(",")[0]);
      } else {
        toast.error("Something went wrong!, please try again");
      }
    }
    if (registerSuccess) {
      toast.success("Verification email sent");
      formik.resetForm();
    }
  }, [registerIsError, registerSuccess, registerError]);

  return (
    <div className={`card ${styles.card} m-auto p-3`}>
      <div className="card-body">
        <h3 className="card-title mb-4 text-center">Sign Up</h3>
        <form noValidate onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              required
              name="firstName"
              id="firstName"
              placeholder="First Name"
              className={`form-control ${
                formik.touched.firstName &&
                formik.errors.firstName &&
                "is-invalid"
              } ${
                formik.touched.firstName &&
                !formik.errors.firstName &&
                "is-valid"
              } `}
              value={formik.values.firstName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />

            {formik.touched.firstName && formik.errors.firstName && (
              <div className="invalid-feedback">{formik.errors.firstName}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              name="lastName"
              placeholder="Last Name"
              id="lastName"
              className={`form-control ${
                formik.touched.lastName &&
                formik.errors.lastName &&
                "is-invalid"
              }`}
              value={formik.values.lastName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="invalid-feedback">{formik.errors.lastName}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="contactNo" className="form-label">
              Contact No.
            </label>
            <input
              required
              type="number"
              name="contactNo"
              placeholder="Contact No."
              id="contactNo"
              className={`form-control ${
                formik.touched.contactNo &&
                formik.errors.contactNo &&
                "is-invalid"
              } ${
                formik.touched.contactNo &&
                !formik.errors.contactNo &&
                "is-valid"
              } `}
              value={formik.values.contactNo}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />

            {formik.touched.contactNo && formik.errors.contactNo && (
              <div className="invalid-feedback">{formik.errors.contactNo}</div>
            )}
          </div>
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
          <button
            disabled={registerLoading}
            type="submit"
            className="btn btn-primary w-100 mt-3 text-light"
          >
            Sign Up
          </button>
        </form>
        <span className="mt-3 d-block text-center">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-primary fw-semibold text-decoration-none"
          >
            sign in
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;
