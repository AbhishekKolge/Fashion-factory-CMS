import styles from "./CouponForm.module.css";

import { formatDateTimeInput } from "../../helpers/time";

const optionsType = [
  {
    id: 1,
    value: "PERCENTAGE",
    name: "Percent (%)",
  },
  {
    id: 2,
    value: "FIXED",
    name: "Rupees (₹)",
  },
];

const optionsValid = [
  {
    id: 1,
    value: true,
    name: "Valid",
  },
  {
    id: 2,
    value: false,
    name: "Invalid",
  },
];

const CouponForm = (props) => {
  const { formik, action } = props;

  return (
    <div className="row gy-2">
      <div>
        <label htmlFor="code" className="form-label">
          Code
        </label>
        <input
          required
          disabled={action === "UPDATE"}
          name="code"
          placeholder="Code"
          id="code"
          className={`form-control ${
            formik.touched.code && formik.errors.code && "is-invalid"
          }`}
          value={formik.values.code}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.code && formik.errors.code && (
          <div className="invalid-feedback">{formik.errors.code}</div>
        )}
      </div>
      <div>
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          required
          disabled={action === "UPDATE"}
          type="number"
          name="amount"
          id="amount"
          className={`form-control ${
            formik.touched.amount && formik.errors.amount && "is-invalid"
          }`}
          value={formik.values.amount}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.amount && formik.errors.amount && (
          <div className="invalid-feedback">{formik.errors.amount}</div>
        )}
      </div>
      <div>
        <label htmlFor="type" className="form-label">
          Discount Type
        </label>
        <select
          disabled={action === "UPDATE"}
          name="type"
          id="type"
          className={`form-select ${
            formik.touched.type && formik.errors.type && "is-invalid"
          }`}
          value={formik.values.type}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        >
          {optionsType.map((option) => {
            return (
              <option key={option.id} value={option.value}>
                {option.name}
              </option>
            );
          })}
        </select>
        {formik.touched.type && formik.errors.type && (
          <div className="invalid-feedback">{formik.errors.type}</div>
        )}
      </div>
      <div>
        <label htmlFor="valid" className="form-label">
          Validity
        </label>
        <select
          name="valid"
          id="valid"
          className={`form-select ${
            formik.touched.valid && formik.errors.valid && "is-invalid"
          }`}
          value={formik.values.valid}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        >
          {optionsValid.map((option) => {
            return (
              <option key={option.id} value={option.value}>
                {option.name}
              </option>
            );
          })}
        </select>
        {formik.touched.valid && formik.errors.valid && (
          <div className="invalid-feedback">{formik.errors.valid}</div>
        )}
      </div>
      <div>
        <label htmlFor="maxRedemptions" className="form-label">
          Max Redemptions
        </label>
        <input
          required
          type="number"
          name="maxRedemptions"
          id="maxRedemptions"
          className={`form-control ${
            formik.touched.maxRedemptions &&
            formik.errors.maxRedemptions &&
            "is-invalid"
          }`}
          value={formik.values.maxRedemptions}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.maxRedemptions && formik.errors.maxRedemptions && (
          <div className="invalid-feedback">{formik.errors.maxRedemptions}</div>
        )}
      </div>
      <div>
        <label htmlFor="startTime" className="form-label">
          Valid From
        </label>
        <input
          type="datetime-local"
          disabled={action === "UPDATE"}
          name="startTime"
          id="startTime"
          className={`form-control ${
            formik.touched.startTime && formik.errors.startTime && "is-invalid"
          }`}
          value={
            formik.values.startTime &&
            formatDateTimeInput(formik.values.startTime)
          }
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.startTime && formik.errors.startTime && (
          <div className="invalid-feedback">{formik.errors.startTime}</div>
        )}
      </div>
      <div>
        <label htmlFor="expiryTime" className="form-label">
          Valid Till
        </label>
        <input
          required
          type="datetime-local"
          name="expiryTime"
          id="expiryTime"
          className={`form-control ${
            formik.touched.expiryTime &&
            formik.errors.expiryTime &&
            "is-invalid"
          }`}
          value={
            formik.values.expiryTime &&
            formatDateTimeInput(formik.values.expiryTime)
          }
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.expiryTime && formik.errors.expiryTime && (
          <div className="invalid-feedback">{formik.errors.expiryTime}</div>
        )}
      </div>
    </div>
  );
};

export default CouponForm;
