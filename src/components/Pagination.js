import React from 'react';

const Pagination = ({ limit, totalLength, onPageChange, activePage }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalLength / limit); i++) {
    pageNumber.push(i)
  }

  return (
    <div>
      <ul className="pagination d-flex justify-content-center">
        {pageNumber.map(number => (
          <li
            onClick={() => onPageChange(number)}
            key={number}
            className={
              number === activePage
                ? "page-item active clickable"
                : ' page-item clickable'
            }
          >
            <a className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div >
  )
}

export default Pagination;
