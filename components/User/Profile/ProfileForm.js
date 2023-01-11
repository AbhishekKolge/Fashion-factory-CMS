import styles from "./ProfileForm.module.css";

const optionsGender = [
  {
    id: 1,
    value: "",
    name: "Select",
  },
  {
    id: 2,
    value: "MALE",
    name: "Male",
  },
  {
    id: 3,
    value: "FEMALE",
    name: "Female",
  },
];

const ProfileForm = (props) => {
  const { formik } = props;
  return (
    <div className="row gy-2">
      <div className="col-6">
        <label htmlFor="firstName" className="form-label">
          First Name
        </label>
        <input
          required
          name="firstName"
          placeholder="First Name"
          id="firstName"
          className={`form-control ${
            formik.touched.firstName && formik.errors.firstName && "is-invalid"
          }`}
          value={formik.values.firstName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.firstName && formik.errors.firstName && (
          <div className="invalid-feedback">{formik.errors.firstName}</div>
        )}
      </div>
      <div className="col-6">
        <label htmlFor="lastName" className="form-label">
          Last Name
        </label>
        <input
          name="lastName"
          placeholder="Last Name"
          id="lastName"
          className={`form-control ${
            formik.touched.lastName && formik.errors.lastName && "is-invalid"
          }`}
          value={formik.values.lastName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.lastName && formik.errors.lastName && (
          <div className="invalid-feedback">{formik.errors.lastName}</div>
        )}
      </div>
      <div className="col-6">
        <label htmlFor="contactNo" className="form-label">
          Contact No.
        </label>
        <input
          required
          type="number"
          name="contactNo"
          id="contactNo"
          className={`form-control ${
            formik.touched.contactNo && formik.errors.contactNo && "is-invalid"
          }`}
          value={formik.values.contactNo}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.contactNo && formik.errors.contactNo && (
          <div className="invalid-feedback">{formik.errors.contactNo}</div>
        )}
      </div>
      <div className="col-6">
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <input
          required
          readOnly
          type="email"
          name="email"
          placeholder="Email Address"
          id="email"
          className={`form-control`}
          value={formik.values.email}
        />
      </div>
      <div className="col-6">
        <label htmlFor="gender" className="form-label">
          Gender
        </label>
        <select
          name="gender"
          id="gender"
          className={`form-select ${
            formik.touched.gender && formik.errors.gender && "is-invalid"
          }`}
          value={formik.values.gender}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        >
          {optionsGender.map((option) => {
            return (
              <option key={option.id} value={option.value}>
                {option.name}
              </option>
            );
          })}
        </select>
        {formik.touched.gender && formik.errors.gender && (
          <div className="invalid-feedback">{formik.errors.gender}</div>
        )}
      </div>
      <div className="col-6">
        <label htmlFor="dob" className="form-label">
          Date of birth
        </label>
        <input
          type="date"
          name="dob"
          id="dob"
          className={`form-control ${
            formik.touched.dob && formik.errors.dob && "is-invalid"
          }`}
          value={
            formik.values.dob &&
            new Date(formik.values.dob).toLocaleDateString("en-CA")
          }
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.dob && formik.errors.dob && (
          <div className="invalid-feedback">{formik.errors.dob}</div>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
