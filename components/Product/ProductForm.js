import Multiselect from "multiselect-react-dropdown";
import { useState, useId } from "react";

import styles from "./ProductForm.module.css";

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

const ProductForm = (props) => {
  const { formik, sizes, categories } = props;
  const uniqueId = useId();
  const [categoryList, setCategoryList] = useState([
    { id: "", name: "select" },
    ...categories,
  ]);

  return (
    <div className="row gy-2">
      <div className="col-6">
        <label htmlFor="image" className="form-label">
          Image
        </label>
        <input
          required
          type="file"
          name="image"
          id="image"
          className={`form-control ${
            formik.touched.image && formik.errors.image && "is-invalid"
          }`}
          onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
        />
        {formik.touched.image && formik.errors.image && (
          <div className="invalid-feedback">{formik.errors.image}</div>
        )}
      </div>
      <div className="col-6">
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
      <div className="col-6">
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          required
          type="number"
          name="price"
          id="price"
          className={`form-control ${
            formik.touched.price && formik.errors.price && "is-invalid"
          }`}
          value={formik.values.price}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.price && formik.errors.price && (
          <div className="invalid-feedback">{formik.errors.price}</div>
        )}
      </div>
      <div className="col-6">
        <label htmlFor="discountAmount" className="form-label">
          Discount
        </label>
        <div className="input-group">
          <input
            type="number"
            name="discountAmount"
            id="discountAmount"
            className={`form-control ${
              formik.touched.discountAmount &&
              formik.errors.discountAmount &&
              "is-invalid"
            }`}
            value={formik.values.discountAmount}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.discountAmount && formik.errors.discountAmount && (
            <div className="invalid-feedback">
              {formik.errors.discountAmount}
            </div>
          )}
          <select
            name="discount"
            id="discount"
            className={`form-select ${
              formik.touched.discount && formik.errors.discount && "is-invalid"
            }`}
            value={formik.values.discount}
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
          {formik.touched.discount && formik.errors.discount && (
            <div className="invalid-feedback">{formik.errors.discount}</div>
          )}
        </div>
      </div>
      <div className="col-6">
        <label htmlFor="sizes" className="form-label">
          Sizes
        </label>
        <Multiselect
          id="sizes"
          className={`${
            formik.touched.discount && formik.errors.discount && "is-invalid"
          }`}
          options={sizes}
          displayValue="value"
          onSelect={(sizesArr) => formik.setFieldValue("sizes", sizesArr)}
          selectedValues={formik.values.sizes}
          onRemove={(sizesArr) => formik.setFieldValue("sizes", sizesArr)}
        />
        {formik.errors.sizes && (
          <div className="invalid">{formik.errors.sizes}</div>
        )}
      </div>

      <div className="col-6">
        <label htmlFor="inventory" className="form-label">
          Inventory
        </label>
        <input
          type="number"
          name="inventory"
          id="inventory"
          className={`form-control ${
            formik.touched.inventory && formik.errors.inventory && "is-invalid"
          }`}
          value={formik.values.inventory}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.inventory && formik.errors.inventory && (
          <div className="invalid-feedback">{formik.errors.inventory}</div>
        )}
      </div>

      <div className="col-6">
        <label htmlFor="categoryId" className="form-label">
          Category
        </label>
        <select
          required
          name="categoryId"
          id="categoryId"
          className={`form-select ${
            formik.touched.categoryId &&
            formik.errors.categoryId &&
            "is-invalid"
          }`}
          value={formik.values.categoryId}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        >
          {categoryList.map((category) => {
            return (
              <option key={category.id || uniqueId} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
        {formik.touched.categoryId && formik.errors.categoryId && (
          <div className="invalid-feedback">{formik.errors.categoryId}</div>
        )}
      </div>
      <div className="col-6 row mt-1">
        <div className="col-3">
          <label htmlFor="color" className="form-label">
            Color
          </label>
          <input
            required
            name="color"
            id="color"
            type="color"
            className={`form-control ${styles.colorBox} ${
              formik.touched.color && formik.errors.color && "is-invalid"
            }`}
            value={formik.values.color}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.color && formik.errors.color && (
            <div className="invalid-feedback">{formik.errors.color}</div>
          )}
        </div>
        <div className="col-6">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="featured"
              name="featured"
              checked={formik.values.featured}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label className="form-check-label" htmlFor="featured">
              Featured Product
            </label>
          </div>
          {formik.errors.featured && (
            <div className="invalid">{formik.errors.featured}</div>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          required
          name="description"
          placeholder="Description"
          id="description"
          className={`form-control ${
            formik.touched.description &&
            formik.errors.description &&
            "is-invalid"
          }`}
          value={formik.values.description}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.description && formik.errors.description && (
          <div className="invalid-feedback">{formik.errors.description}</div>
        )}
      </div>
    </div>
  );
};

export default ProductForm;
