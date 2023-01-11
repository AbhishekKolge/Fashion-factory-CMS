import Link from "next/link";

import styles from "./ProductCard.module.css";

import { formatDateTime } from "../../helpers/time";

const ProductCard = (props) => {
  const {
    products,
    totalProducts,
    deleteButtonProps,
    onDelete,
    onEdit,
    buttonProps,
    onAdd,
  } = props;

  return (
    <div className="row">
      <div className="fs-8">
        <div className="card">
          <div className="card-header d-flex align-items-center justify-content-between">
            <h4 className="card-title">{`Products (${totalProducts})`}</h4>
            <button
              onClick={onAdd}
              {...buttonProps}
              className="btn btn-primary border-dark btn-sm"
            >
              Add Product
            </button>
          </div>
          <div className="card-body">
            <div className="d-flex flex-column gap-3">
              {products.length ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="text-center">
                        Name
                      </th>
                      <th scope="col" className="text-center">
                        Price
                      </th>
                      <th scope="col" className="text-center">
                        Discount
                      </th>
                      <th scope="col" className="text-center">
                        Category
                      </th>
                      <th scope="col" className="text-center">
                        Color
                      </th>
                      <th scope="col" className="text-center">
                        Featured
                      </th>
                      <th scope="col" className="text-center">
                        Stock
                      </th>
                      <th scope="col" className="text-center">
                        Created On
                      </th>
                      <th scope="col" className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => {
                      return (
                        <tr key={product.id}>
                          <td className="text-center">{product.name}</td>
                          <td className="text-center">{product.price}</td>
                          <td className="text-center">
                            {product.discountAmount
                              ? product.discount === "PERCENTAGE"
                                ? `${product.discountAmount}%`
                                : `₹ ${product.discountAmount}`
                              : "0%"}
                          </td>
                          <td className="text-center">
                            {product.category.name}
                          </td>
                          <td className="text-center">
                            <input
                              disabled
                              className={`form-control ${styles.colorBox}`}
                              type="color"
                              value={product.color}
                            />
                          </td>
                          <td className="text-center">
                            <span
                              className={`badge rounded-pill text-light ${
                                product.featured
                                  ? "text-bg-success"
                                  : "text-bg-danger"
                              }`}
                            >
                              {product.featured ? "Yes" : "No"}
                            </span>
                          </td>
                          <td className="text-center">{product.inventory}</td>
                          <td className="text-center">
                            {formatDateTime(product.createdAt)}
                          </td>
                          <td className="d-flex gap-2 justify-content-center">
                            <Link
                              href={`/products/${product.id}`}
                              className="btn btn-primary text-light btn-sm"
                            >
                              <i className="bi bi-eye-fill"></i>
                            </Link>

                            <button
                              onClick={onEdit.bind(this, {
                                id: product.id,
                                productDetails: {
                                  name: product.name,
                                  price: product.price,
                                  discount: product.discount,
                                  discountAmount: product.discountAmount,
                                  sizes: product.sizes,
                                  categoryId: product.categoryId,
                                  featured: product.featured,
                                  color: product.color,
                                  description: product.description,
                                  inventory: product.inventory,
                                },
                              })}
                              {...buttonProps}
                              className="btn btn-warning text-light btn-sm"
                            >
                              <i className="bi bi-pencil-fill"></i>
                            </button>
                            <button
                              {...deleteButtonProps}
                              onClick={onDelete.bind(this, product.id)}
                              className="btn btn-danger text-light btn-sm"
                            >
                              <i className="bi bi-trash3-fill"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <span>No Products added</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
