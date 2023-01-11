import styles from "./ReturnResultForm.module.css";

const ReturnResultForm = (props) => {
  const { formik } = props;
  return (
    <div className="row gy-2">
      <div>
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          required
          name="title"
          placeholder="Title"
          id="title"
          className={`form-control ${
            formik.touched.title && formik.errors.title && "is-invalid"
          }`}
          value={formik.values.title}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.title && formik.errors.title && (
          <div className="invalid-feedback">{formik.errors.title}</div>
        )}
      </div>
    </div>
  );
};

export default ReturnResultForm;
