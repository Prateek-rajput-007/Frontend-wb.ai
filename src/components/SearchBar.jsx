import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ setSearchTerm }) => {
    return (
        <div className="w-full sm:w-64">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
        </div>
    );
};

export default SearchBar;