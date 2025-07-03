import React, { useState } from 'react';
import { MdCloud, MdErrorOutline, MdCheckCircle } from 'react-icons/md';
import { BiCabinet } from 'react-icons/bi';

const renderCell = (value, col) => {
    if (col === 'health') {
        if (value === null || value === undefined || value === '') return '-';
    } else {
        if (value === null || value === undefined || value === '') return 'N/A';
    }
    if (typeof value === 'object') {
        if (value.name) return value.name;
        if (value.title) return value.title;
        if (value.id) return value.id;
        return JSON.stringify(value);
    }
    return value;
};

const CameraTable = ({ cameras, updateStatus, handleDelete }) => {
    // Checkbox state for select all and individual rows
    const [checkedAll, setCheckedAll] = useState(false);
    const [checkedRows, setCheckedRows] = useState({});

    const handleCheckAll = () => {
        const newChecked = !checkedAll;
        setCheckedAll(newChecked);
        const newCheckedRows = {};
        if (newChecked) {
            cameras.forEach(camera => {
                newCheckedRows[camera.id] = true;
            });
        }
        setCheckedRows(newCheckedRows);
    };

    const handleCheckRow = (id) => {
        setCheckedRows(prev => {
            const updated = { ...prev, [id]: !prev[id] };
            const allChecked = cameras.length > 0 && cameras.every(cam => updated[cam.id]);
            setCheckedAll(allChecked);
            return updated;
        });
    };

    // Helper to determine circle border color based on health status
    const getHealthBorderColor = (health) => {
        return health === 'A' ? 'border-green-500' : 'border-red-700';
    };

    // Extract cloud and device health from camera.health if present
    const getCloudHealth = (camera) => {
        if (camera.health && typeof camera.health === 'object') {
            return camera.health.cloud ?? '-';
        }
        return camera.cloudHealth ?? '-';
    };
    const getDeviceHealth = (camera) => {
        if (camera.health && typeof camera.health === 'object') {
            return camera.health.device ?? '-';
        }
        return camera.edgeHealth ?? '-';
    };

    return (
        <div className="mt-1 w-full overflow-x-auto">
            <table className="min-w-[700px] w-full border-collapse bg-white rounded-lg shadow text-xs sm:text-sm">
                <thead className="hidden sm:table-header-group">
                    <tr className="bg-white">
                        <th className="p-2 sm:p-3 pl-4 sm:pl-6 text-left text-gray-700 text-sm sm:text-base font-normal">
                            <input
                                type="checkbox"
                                checked={checkedAll}
                                onChange={handleCheckAll}
                                className="mr-2"
                            />
                            NAME
                        </th>
                        <th className="p-2 sm:p-3 text-left text-gray-700 text-sm sm:text-base font-normal">HEALTH</th>
                        <th className="p-2 sm:p-3 text-left text-gray-700 text-sm sm:text-base font-normal">LOCATION</th>
                        <th className="p-2 sm:p-3 text-left text-gray-700 text-sm sm:text-base font-normal">RECORDER</th>
                        <th className="p-2 sm:p-3 text-left text-gray-700 text-sm sm:text-base font-normal">TASKS</th>
                        <th className="p-2 sm:p-3 text-left text-gray-700 text-sm sm:text-base font-normal">STATUS</th>
                        <th className="p-2 sm:p-3 text-left text-gray-700 text-sm sm:text-base font-normal">ACTIONS</th>
                    </tr>
                    <tr>
                        <td colSpan={7}>
                            <div className="border-b border-gray-200 w-full"></div>
                        </td>
                    </tr>
                </thead>
                <tbody className="text-gray-800">
                    {cameras.map(camera => (
                        <tr
                            key={camera.id}
                            className="border-b border-gray-200 sm:table-row flex flex-col sm:flex-row mb-4 sm:mb-0 bg-white sm:bg-transparent rounded-lg sm:rounded-none shadow-sm sm:shadow-none"
                        >
                            {/* Mobile Card Layout */}
                            <td className="block sm:table-cell p-3 sm:p-2 pl-4 sm:pl-6 align-middle w-full sm:w-auto">
                                <div className="flex flex-col gap-1">
                                    <span className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base font-normal">
                                        <input
                                            type="checkbox"
                                            checked={!!checkedRows[camera.id]}
                                            onChange={() => handleCheckRow(camera.id)}
                                            className="mr-2"
                                        />
                                        <span
                                            className={`inline-block w-2 h-2 rounded-full ${camera.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}
                                        ></span>
                                        {renderCell(camera.name)}
                                    </span>
                                    <span className="text-xs text-gray-500 ml-6 sm:ml-13 mt-1 font-normal break-all">
                                        {'sherwinwilliams@wobot.ai'}
                                    </span>
                                </div>
                                {/* Mobile extra info */}
                                <div className="flex flex-col gap-1 mt-2 sm:hidden">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">Health:</span>
                                        <span className="flex flex-row items-center gap-2">
                                            <MdCloud className="w-4 h-4 text-gray-200" />
                                            <span
                                                className={`w-5 h-5 border-2 ${getHealthBorderColor(getCloudHealth(camera))} rounded-full flex items-center justify-center text-xs text-gray-700 bg-transparent font-normal`}
                                            >
                                                {renderCell(getCloudHealth(camera), 'health')}
                                            </span>
                                            <BiCabinet className="w-4 h-4 text-gray-200" />
                                            <span
                                                className={`w-5 h-5 border-2 ${getHealthBorderColor(getDeviceHealth(camera))} rounded-full flex items-center justify-center text-xs text-gray-700 bg-transparent font-normal`}
                                            >
                                                {renderCell(getDeviceHealth(camera), 'health')}
                                            </span>
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-semibold">Location: </span>
                                        {renderCell(camera.location)}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Recorder: </span>
                                        {renderCell(camera.recorder)}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Tasks: </span>
                                        {typeof camera.tasks === 'number' || (!isNaN(Number(camera.tasks)) && camera.tasks !== undefined && camera.tasks !== null)
                                            ? `${camera.tasks} Tasks`
                                            : renderCell(camera.tasks)}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Status: </span>
                                        <button
                                            onClick={() => updateStatus(camera.id, camera.status)}
                                            className={`${camera.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'} px-2 py-1 rounded text-xs font-normal`}
                                            aria-label={`Toggle status for ${camera.name}, current status is ${camera.status}`}
                                        >
                                            {renderCell(camera.status)}
                                        </button>
                                    </div>
                                    <div>
                                        <span className="font-semibold">Actions: </span>
                                        {camera.hasWarning ? (
                                            <button
                                                onClick={() => handleDelete(camera.id)}
                                                className="text-red-600 hover:text-red-800"
                                                title="Warning/Delete"
                                                aria-label={`Delete camera ${camera.name}`}
                                            >
                                                <MdErrorOutline className="inline h-5 w-5" />
                                            </button>
                                        ) : (
                                            <span
                                                className="text-green-600"
                                                title="No Warning"
                                                aria-label="No Warning"
                                            >
                                                <MdCheckCircle className="inline h-5 w-5" />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </td>
                            {/* Desktop columns */}
                            <td className="hidden sm:table-cell p-2 sm:p-4 align-middle">
                                <div className="flex flex-row items-center gap-2 sm:gap-3 w-[120px] sm:w-[140px] h-[28px] sm:h-[32px]">
                                    <div className="flex flex-row items-center gap-0 relative">
                                        <MdCloud className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" aria-hidden="true" title={`Cloud Health: ${getCloudHealth(camera) === 'A' ? 'Active' : 'Down'}`} />
                                        <span
                                            className={`ml-1 sm:ml-2 w-5 h-5 border-2 ${getHealthBorderColor(getCloudHealth(camera))} rounded-full flex items-center justify-center text-xs text-gray-700 bg-transparent font-normal`}
                                            aria-label={`Cloud health is ${getCloudHealth(camera) === 'A' ? 'active' : 'down'}`}
                                        >
                                            {renderCell(getCloudHealth(camera), 'health')}
                                        </span>
                                    </div>
                                    <div className="flex flex-row items-center gap-0 relative">
                                        <BiCabinet className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" aria-hidden="true" title={`Device Health: ${getDeviceHealth(camera) === 'A' ? 'Active' : 'Down'}`} />
                                        <span
                                            className={`ml-1 sm:ml-2 w-5 h-5 border-2 ${getHealthBorderColor(getDeviceHealth(camera))} rounded-full flex items-center justify-center text-xs text-gray-700 bg-transparent font-normal`}
                                            aria-label={`Device health is ${getDeviceHealth(camera) === 'A' ? 'active' : 'down'}`}
                                        >
                                            {renderCell(getDeviceHealth(camera), 'health')}
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td className="hidden sm:table-cell p-2 sm:p-4 align-middle">{renderCell(camera.location)}</td>
                            <td className="hidden sm:table-cell p-2 sm:p-4 align-middle">{renderCell(camera.recorder)}</td>
                            <td className="hidden sm:table-cell p-2 sm:p-4 align-middle">
                                {typeof camera.tasks === 'number' || (!isNaN(Number(camera.tasks)) && camera.tasks !== undefined && camera.tasks !== null) ? (
                                    <span>
                                        {camera.tasks} Tasks
                                    </span>
                                ) : (
                                    renderCell(camera.tasks)
                                )}
                            </td>
                            <td className="hidden sm:table-cell p-2 sm:p-4 align-middle">
                                <button
                                    onClick={() => updateStatus(camera.id, camera.status)}
                                    className={`${camera.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'} px-2 sm:px-3 py-1 rounded text-sm sm:text-base font-normal`}
                                    aria-label={`Toggle status for ${camera.name}, current status is ${camera.status}`}
                                >
                                    {renderCell(camera.status)}
                                </button>
                            </td>
                            <td className="hidden sm:table-cell p-2 sm:p-4 align-middle">
                                {camera.hasWarning ? (
                                    <button
                                        onClick={() => handleDelete(camera.id)}
                                        className="text-red-600 hover:text-red-800"
                                        title="Warning/Delete"
                                        aria-label={`Delete camera ${camera.name}`}
                                    >
                                        <MdErrorOutline className="inline h-5 w-5" />
                                    </button>
                                ) : (
                                    <span
                                        className="text-green-600"
                                        title="No Warning"
                                        aria-label="No Warning"
                                    >
                                        <MdCheckCircle className="inline h-5 w-5" />
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CameraTable;