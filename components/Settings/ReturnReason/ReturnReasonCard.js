import styles from "./ReturnReasonCard.module.css";

const ReturnReasonCard = (props) => {
  const {
    returnReasons,
    deleteButtonProps,
    onDelete,
    onEdit,
    buttonProps,
    onAdd,
  } = props;

  return (
    <div className="row">
      <div className="col-6">
        <div className="card">
          <div className="card-header d-flex align-items-center justify-content-between">
            <h4 className="card-title">Return Reasons</h4>
            <button
              onClick={onAdd}
              {...buttonProps}
              className="btn btn-primary border-dark btn-sm"
            >
              Add Reason
            </button>
          </div>
          <div className="card-body">
            <div className="d-flex flex-column gap-3">
              {returnReasons.length ? (
                <ul className="list-group">
                  {returnReasons.map((reason) => {
                    return (
                      <li
                        key={reason.id}
                        className="list-group-item d-flex align-items-center gap-3"
                      >
                        <span className="fw-semibold">{reason.title}</span>
                        <button
                          onClick={onEdit.bind(this, {
                            title: reason.title,
                            id: reason.id,
                          })}
                          {...buttonProps}
                          className="btn btn-warning ms-auto text-light"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button
                          {...deleteButtonProps}
                          onClick={onDelete.bind(this, reason.id)}
                          className="btn btn-danger text-light"
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <span>No return reasons added</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnReasonCard;
