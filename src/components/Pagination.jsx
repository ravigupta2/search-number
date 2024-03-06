import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const calculatePageRange = () => {
    const pageRange = [];
    const maxPagesToShow = 5;
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

      if (currentPage <= halfMaxPagesToShow + 1) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + halfMaxPagesToShow >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - halfMaxPagesToShow;
        endPage = currentPage + halfMaxPagesToShow;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageRange.push(i);
    }

    return pageRange;
  };

  const pageRange = calculatePageRange();

  return (
    <div className="pagination">
      <button disabled={currentPage === 1} onClick={() => handleClick(1)}>First</button>
      {pageRange.map((pageNumber) => (
        <button key={pageNumber} onClick={() => handleClick(pageNumber)} className={pageNumber === currentPage ? 'active' : ''}>{pageNumber}</button>
      ))}
      <button disabled={currentPage === totalPages} onClick={() => handleClick(totalPages)}>Last</button>
    </div>
  );
};

export default Pagination;
