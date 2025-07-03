
import React from 'react';
import { FiChevronDown, FiMapPin, FiWifi } from 'react-icons/fi';

const Filters = ({ locations, statuses, setLocationFilter, setStatusFilter }) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center w-full bg-white rounded-lg px-3 py-2 gap-2 sm:gap-4 mt-2 sm:mt-4">
            <div className="relative flex items-center text-gray-500 w-full sm:w-auto">
                <FiMapPin className="absolute left-1 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <select 
                    onChange={(e) => setLocationFilter(e.target.value)} 
                    className="appearance-none bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8 pl-7 py-2 w-full sm:w-40 text-sm"
                >
                    <option value="">Location</option>
                    {locations.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                    ))}
                </select>
                <FiChevronDown className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <div className="relative flex items-center text-gray-500 w-full sm:w-auto">
                <FiWifi className="absolute left-1 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none rotate-45" />
                <select 
                    onChange={(e) => setStatusFilter(e.target.value)} 
                    className="appearance-none bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8 pl-7 py-2 w-full sm:w-40 text-sm"
                >
                    <option value="">Status</option>
                    {statuses.map((status, index) => (
                        <option key={index} value={status}>{status}</option>
                    ))}
                </select>
                <FiChevronDown className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
        </div>
    );
};

export default Filters;