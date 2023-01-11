import styles from "./UsersFilterForm.module.css";

const sortRole = [
  {
    id: 1,
    value: "",
    name: "Latest",
  },
  {
    id: 2,
    value: "customer",
    name: "Customer",
  },
  {
    id: 3,
    value: "admin",
    name: "Admin",
  },
];

const UsersFilterForm = (props) => {
  const { queries, setQueries } = props;

  const filterChangeHandler = (e) => {
    setQueries((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
        page: 1,
      };
    });
  };

  const clearFiltersHandler = () => {
    setQueries({
      role: "",
      search: "",
      page: 1,
    });
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row gy-2">
          <div className="col-4">
            <label htmlFor="search" className="form-label">
              Search
            </label>
            <input
              value={queries.search}
              onChange={filterChangeHandler}
              name="search"
              id="search"
              placeholder="Search Email"
              className="form-control"
            />
          </div>
          <div className="col-4">
            <label htmlFor="role" className="form-label">
              Type
            </label>
            <select
              value={queries.role}
              onChange={filterChangeHandler}
              name="role"
              id="role"
              className="form-select"
            >
              {sortRole.map((option) => {
                return (
                  <option key={option.id} value={option.value}>
                    {option.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-4">
            <button
              onClick={clearFiltersHandler}
              className={`btn btn-primary btn-sm w-100 ${styles.filterBtn}`}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersFilterForm;
