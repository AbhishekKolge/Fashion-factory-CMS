import Image from "next/image";
import { JsonViewer } from "@textea/json-viewer";

import { formatDateTime } from "../../helpers/time";

import BackButton from "../../components/UI/Button/BackButton";

const ProductDetailsPage = (props) => {
  const { product } = props;

  return (
    <section className="h-100 d-flex flex-column gap-2">
      <BackButton className="align-self-start" />
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <h3 className="text-uppercase fw-bold">{product.name}</h3>
              <h4>₹ {product.price} /-</h4>
              <p>{product.description}</p>
              <h6 className="mt-6">Details</h6>
              <ul className="list-group mt-3">
                <li className="list-group-item d-flex align-items-center justify-content-between gap-3">
                  <span>Featured</span>
                  <span>{product.featured ? "Yes" : "No"}</span>
                </li>
                <li className="list-group-item d-flex align-items-center justify-content-between gap-3">
                  <span>Color</span>
                  <input disabled type="color" value={product.color} />
                </li>
                <li className="list-group-item d-flex align-items-center justify-content-between gap-3">
                  <span>Stock</span>
                  <span className="badge rounded-pill text-bg-primary">
                    {product.inventory}
                  </span>
                </li>
                <li className="list-group-item d-flex align-items-center justify-content-between gap-3">
                  <span>Discount</span>
                  <span>
                    {product.discount === "FIXED"
                      ? `₹ ${product.discountAmount}`
                      : `${product.discountAmount}%`}
                  </span>
                </li>
                <li className="list-group-item d-flex align-items-center justify-content-between gap-3">
                  <span>Avg. rating</span>
                  <span className="badge rounded-pill text-bg-primary">
                    {product.averageRating}
                  </span>
                </li>
                <li className="list-group-item d-flex align-items-center justify-content-between gap-3">
                  <span>No of reviews</span>
                  <span className="badge rounded-pill text-bg-primary">
                    {product.numOfReviews}
                  </span>
                </li>
                <li className="list-group-item d-flex align-items-center justify-content-between gap-3">
                  <span>Category</span>
                  <span>{product.category.name}</span>
                </li>
                <li className="list-group-item d-flex align-items-center justify-content-between gap-3">
                  <span>Created On</span>
                  <span>{formatDateTime(product.createdAt)}</span>
                </li>
                <li className="list-group-item d-flex align-items-center justify-content-between gap-3">
                  <span>Updated On</span>
                  <span>{formatDateTime(product.updatedAt)}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div>
            <div className="card">
              <div className="card-body">
                <h3 className="text-uppercase fw-bold">Variants</h3>
                <h4>Sizes</h4>
                <div className="d-flex align-items-center gap-2 mt-3">
                  {product.sizes.map((size) => {
                    return (
                      <span
                        key={size.id}
                        className="badge text-bg-secondary fs-6"
                      >
                        {size.value}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="card">
              <div className="card-body">
                <h3 className="text-uppercase fw-bold">Images</h3>
                <Image
                  src={product.image}
                  alt="product-image"
                  width={200}
                  height={200}
                  className="mt-2 img-thumbnail"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 mt-4">
          <div className="card">
            <div className="card-body">
              <h3 className="text-uppercase fw-bold mb-3">Raw Product</h3>
              <JsonViewer
                displayDataTypes={false}
                editable={false}
                value={product}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { productId } = params;

  const productJsonData = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/product/${productId}`
  );

  const productData = await productJsonData.json();

  return {
    props: {
      ...productData,
    },
  };
}

export default ProductDetailsPage;
