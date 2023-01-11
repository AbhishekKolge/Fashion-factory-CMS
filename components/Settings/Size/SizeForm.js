import styles from "./SizeForm.module.css";

const SizeForm = (props) => {
  const { formik } = props;
  return (
    <div className="row gy-2">
      <div>
        <label htmlFor="value" className="form-label">
          Value
        </label>
        <input
          required
          name="value"
          type="number"
          id="value"
          className={`form-control ${
            formik.touched.value && formik.errors.value && "is-invalid"
          }`}
          value={formik.values.value}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.value && formik.errors.value && (
          <div className="invalid-feedback">{formik.errors.value}</div>
        )}
      </div>
    </div>
  );
};

export default SizeForm;
