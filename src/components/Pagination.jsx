import React from 'react';

const Pagination = ({
    totalItems,
    itemsPerPage,
    currentPage,
    setCurrentPage,
    setItemsPerPage 
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const start = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);
    const rowsPerPageOptions = [10, 20, 30];

    const handlePageChange = (page) => {
        const newPage = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(newPage);
    };

    return (
        <div className="flex flex-col sm:flex-row w-full h-auto mt-2 bg-white rounded-lg shadow p-2 sm:p-3 gap-2 sm:gap-4">
            <div className="flex items-center justify-center sm:justify-end gap-2 flex-1">
                <select
                    id="rows-per-page-select"
                    value={itemsPerPage}
                    onChange={e => setItemsPerPage && setItemsPerPage(Number(e.target.value))}
                    className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm h-8 w-16 sm:w-20"
                    aria-label="Select number of rows per page"
                >
                    {rowsPerPageOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            </div>
            <span className="text-gray-700 text-xs sm:text-sm text-center sm:text-right pt-2">
                {totalItems === 0 ? 'No items' : `${start}-${end} of ${totalItems}`}
            </span>
            <div className="flex items-center justify-center sm:justify-end gap-1 sm:gap-2">
                <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1 || totalPages === 0}
                    className="px-2 sm:px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                    aria-label="Go to first page"
                >
                    {'<<'}
                </button>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || totalPages === 0}
                    className="px-2 sm:px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                    aria-label="Go to previous page"
                >
                    {'<'}
                </button>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-2 sm:px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                    aria-label="Go to next page"
                >
                    {'>'}
                </button>
                <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-2 sm:px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                    aria-label="Go to last page"
                >
                    {'>>'}
                </button>
            </div>
        </div>
    );
};

export default Pagination;
