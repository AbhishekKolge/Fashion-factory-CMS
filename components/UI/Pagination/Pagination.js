import { useEffect, useState } from "react";

const Pagination = (props) => {
  const { numOfPages, queries, setQueries } = props;
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (numOfPages > 1) {
      let pageArr = [];
      for (let i = 1; i <= numOfPages; i++) {
        pageArr.push(i);
      }
      setPages(pageArr);
    }
  }, [numOfPages]);

  const changePageHandler = (pageNum) => {
    setQueries((prevState) => {
      return {
        ...prevState,
        page: pageNum,
      };
    });
  };

  const navigatePageHandler = (action) => {
    setQueries((prevState) => {
      return {
        ...prevState,
        page: action === "BACK" ? prevState.page - 1 : prevState.page + 1,
      };
    });
  };

  return numOfPages > 1 ? (
    <nav className="mt-3">
      <ul className="pagination pagination-md justify-content-end">
        <li className={`page-item ${queries.page === 1 ? "disabled" : ""}`}>
          <button
            onClick={navigatePageHandler.bind(this, "BACK")}
            className="page-link"
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {pages.map((page, index) => {
          return (
            <li
              key={index}
              onClick={changePageHandler.bind(this, page)}
              className={`page-item ${queries.page === page ? "active" : ""}`}
            >
              <button className="page-link">{page}</button>
            </li>
          );
        })}
        <li
          className={`page-item ${
            queries.page === numOfPages ? "disabled" : ""
          }`}
        >
          <button
            onClick={navigatePageHandler}
            className="page-link"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  ) : null;
};

export default Pagination;
