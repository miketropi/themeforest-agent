"use client"
import React from 'react';

const Pagination = ({ pages, page_size, current_page, onChange }) => {
  const totalPages = Math.ceil(pages / page_size);
  
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const range = 3; // Number of pages to show before and after current page
    
    for (let i = 1; i <= totalPages; i++) {
      // Always show first page, last page, and pages within range of current page
      if (
        i === 1 || 
        i === totalPages ||
        (i >= current_page - range && i <= current_page + range)
      ) {
        pageNumbers.push(
          <button
            key={i}
            className={`px-3 py-1 mx-1 rounded ${
              current_page === i 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      } else if (
        // Add ellipsis after first page if there's a gap
        i === 2 && current_page - range > 2 ||
        // Add ellipsis before last page if there's a gap
        i === totalPages - 1 && current_page + range < totalPages - 1
      ) {
        pageNumbers.push(
          <span key={i} className="px-3 py-1 mx-1">
            ...
          </span>
        );
      }
    }
    
    return pageNumbers;
  };

  const handlePageChange = (pageNumber) => {
    // Handle page change logic here
    // console.log(`Navigating to page ${pageNumber}`);
    onChange(pageNumber);
  };

  return (
    <div className="flex items-center justify-center space-x-2 my-4">
      <button
        className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        onClick={() => handlePageChange(current_page - 1)}
        disabled={current_page === 1}
      >
        Previous
      </button>
      
      {renderPageNumbers()}
      
      <button
        className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        onClick={() => handlePageChange(current_page + 1)}
        disabled={current_page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
