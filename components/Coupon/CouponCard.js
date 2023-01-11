import styles from "./CouponCard.module.css";

import { formatDateTime } from "../../helpers/time";

const CouponCard = (props) => {
  const {
    coupons,
    totalCoupons,
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
            <h4 className="card-title">{`Coupons (${totalCoupons})`}</h4>
            <button
              onClick={onAdd}
              {...buttonProps}
              className="btn btn-primary border-dark btn-sm"
            >
              Add Coupon
            </button>
          </div>
          <div className="card-body">
            <div className="d-flex flex-column gap-3">
              {coupons.length ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="text-center">
                        Code
                      </th>
                      <th scope="col" className="text-center">
                        Amount
                      </th>
                      <th scope="col" className="text-center">
                        Max Use
                      </th>
                      <th scope="col" className="text-center">
                        Total Use
                      </th>
                      <th scope="col" className="text-center">
                        Status
                      </th>
                      <th scope="col" className="text-center">
                        Valid From
                      </th>
                      <th scope="col" className="text-center">
                        Valid Till
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
                    {coupons.map((coupon) => {
                      let isValid = coupon.valid;
                      if (new Date(coupon.expiryTime).getTime() < Date.now()) {
                        isValid = false;
                      }
                      return (
                        <tr key={coupon.id}>
                          <td className="text-center">{coupon.code}</td>
                          <td className="text-center">
                            {coupon.type === "PERCENTAGE"
                              ? `${coupon.amount}%`
                              : `₹ ${coupon.amount}`}
                          </td>
                          <td className="text-center">
                            {coupon.maxRedemptions}
                          </td>
                          <td className="text-center">
                            {coupon.totalRedemptions}
                          </td>
                          <td className="text-center">
                            <span
                              className={`badge rounded-pill text-light ${
                                isValid ? "text-bg-success" : "text-bg-danger"
                              }`}
                            >
                              {isValid ? "Valid" : "Invalid"}
                            </span>
                          </td>
                          <td className="text-center">
                            {formatDateTime(coupon.startTime)}
                          </td>
                          <td className="text-center">
                            {formatDateTime(coupon.expiryTime)}
                          </td>
                          <td className="text-center">
                            {formatDateTime(coupon.createdAt)}
                          </td>
                          <td className="d-flex gap-2 justify-content-center">
                            <button
                              onClick={onEdit.bind(this, {
                                id: coupon.id,
                                couponDetails: {
                                  type: coupon.type,
                                  amount: coupon.amount,
                                  code: coupon.code,
                                  startTime: coupon.startTime,
                                  expiryTime: coupon.expiryTime,
                                  valid: coupon.valid,
                                  maxRedemptions: coupon.maxRedemptions,
                                },
                              })}
                              {...buttonProps}
                              className="btn btn-warning text-light btn-sm"
                            >
                              <i className="bi bi-pencil-fill"></i>
                            </button>
                            <button
                              {...deleteButtonProps}
                              onClick={onDelete.bind(this, coupon.id)}
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
                <span>No Coupons added</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
