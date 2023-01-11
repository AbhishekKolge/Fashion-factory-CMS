import styles from "./SizeCard.module.css";

const SizeCard = (props) => {
  const { sizes, deleteButtonProps, onDelete, onEdit, buttonProps, onAdd } =
    props;

  return (
    <div className="row">
      <div className="col-6">
        <div className="card">
          <div className="card-header d-flex align-items-center justify-content-between">
            <h4 className="card-title">Sizes</h4>
            <button
              onClick={onAdd}
              {...buttonProps}
              className="btn btn-primary border-dark btn-sm"
            >
              Add Size
            </button>
          </div>
          <div className="card-body">
            <div className="d-flex flex-column gap-3">
              {sizes.length ? (
                <ul className="list-group">
                  {sizes.map((size) => {
                    return (
                      <li
                        key={size.id}
                        className="list-group-item d-flex align-items-center gap-3"
                      >
                        <span className="fw-semibold">{size.value}</span>
                        <button
                          onClick={onEdit.bind(this, {
                            value: size.value,
                            id: size.id,
                          })}
                          {...buttonProps}
                          className="btn btn-warning ms-auto text-light"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button
                          {...deleteButtonProps}
                          onClick={onDelete.bind(this, size.id)}
                          className="btn btn-danger text-light"
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <span>No sizes added</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeCard;
