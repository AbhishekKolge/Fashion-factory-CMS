import styles from "./CategoryCard.module.css";

const CategoryCard = (props) => {
  const {
    categories,
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
            <h4 className="card-title">Categories</h4>
            <button
              onClick={onAdd}
              {...buttonProps}
              className="btn btn-primary border-dark btn-sm"
            >
              Add Category
            </button>
          </div>
          <div className="card-body">
            <div className="d-flex flex-column gap-3">
              {categories.length ? (
                <ul className="list-group">
                  {categories.map((category) => {
                    return (
                      <li
                        key={category.id}
                        className="list-group-item d-flex align-items-center gap-3"
                      >
                        <span className="fw-semibold">{category.name}</span>
                        <button
                          onClick={onEdit.bind(this, {
                            name: category.name,
                            id: category.id,
                          })}
                          {...buttonProps}
                          className="btn btn-warning ms-auto text-light"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button
                          {...deleteButtonProps}
                          onClick={onDelete.bind(this, category.id)}
                          className="btn btn-danger text-light"
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <span>No categories added</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
