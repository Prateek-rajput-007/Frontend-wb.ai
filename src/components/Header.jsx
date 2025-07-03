

import React from 'react';
import SearchBar from './SearchBar';
import logo from '../assets/logo-1.png';

const Header = ({ setSearchTerm }) => {
    return (
        <div className="flex flex-col items-center pt-4 px-4 sm:px-4">
         <img src={logo} alt="Wobot Logo" className="h-10 sm:h-12 mb-10 sm:mb-4 mt-6" />
            <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-full sm:max-w-[1250px] gap-4 sm:gap-0">
                <div className="flex flex-col gap-1 text-center sm:text-left">
                    <h1 className="text-xl sm:text-2xl font-semibold">Cameras</h1>
                    <p className="text-gray-600 font-normal text-sm sm:text-base">Manage your cameras here</p>
                </div>
                <SearchBar setSearchTerm={setSearchTerm} />
            </div>
        </div>
    );
};

export default Header;