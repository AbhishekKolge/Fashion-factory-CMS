import styles from "./UsersForm.module.css";

const statusType = [
  {
    id: 1,
    value: "ACTIVE",
    name: "Active",
  },
  {
    id: 2,
    value: "LOCKED",
    name: "Locked",
  },
];

const UsersForm = (props) => {
  const { formik, isAdmin } = props;

  return (
    <div className="row gy-2">
      <div>
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <select
          name="status"
          id="status"
          className={`form-select ${
            formik.touched.status && formik.errors.status && "is-invalid"
          }`}
          value={formik.values.status}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        >
          {statusType.map((option) => {
            return (
              <option key={option.id} value={option.value}>
                {option.name}
              </option>
            );
          })}
        </select>
        {formik.touched.status && formik.errors.status && (
          <div className="invalid-feedback">{formik.errors.status}</div>
        )}
      </div>
      {isAdmin && (
        <div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="authorized"
              name="authorized"
              checked={formik.values.authorized}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label className="form-check-label" htmlFor="authorized">
              Authorize Admin
            </label>
          </div>
          {formik.errors.authorized && (
            <div className="invalid">{formik.errors.authorized}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default UsersForm;
