import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount === 1) {
    return null;
  }

  let pageNoArr = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {pageNoArr.map(pageNo => (
          <li
            className={
              pageNo === currentPage ? "page-item active" : "page-item"
            }
            key={pageNo}
            style={{ cursor: "pointer" }}
          >
            <span className="page-link" onClick={() => onPageChange(pageNo)}>
              {pageNo}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
