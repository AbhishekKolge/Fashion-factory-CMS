import styles from "./CategoryForm.module.css";

const CategoryForm = (props) => {
  const { formik } = props;
  return (
    <div className="row gy-2">
      <div>
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          required
          name="name"
          placeholder="Name"
          id="name"
          className={`form-control ${
            formik.touched.name && formik.errors.name && "is-invalid"
          }`}
          value={formik.values.name}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="invalid-feedback">{formik.errors.name}</div>
        )}
      </div>
    </div>
  );
};

export default CategoryForm;
