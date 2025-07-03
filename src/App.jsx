import React, { useState, useEffect, Suspense, lazy } from 'react';

const Header = lazy(() => import('./components/Header'));
const Filters = lazy(() => import('./components/Filters'));
const CameraTable = lazy(() => import('./components/CameraTable'));
const Pagination = lazy(() => import('./components/Pagination'));

const App = () => {
    const [cameras, setCameras] = useState([]);
    const [filteredCameras, setFilteredCameras] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        fetch('https://api-app-staging.wobot.ai/app/v1/fetch/cameras', {
            headers: {
                'Authorization': 'Bearer 4ApVMIn5sTxeW7GQ5VWeWiy'
            }
        })
            .then(response => response.json())
            .then(data => {
                const arr = Array.isArray(data)
                    ? data
                    : (Array.isArray(data?.data) ? data.data : []);
                const enrichedData = arr.map(camera => ({
                    ...camera,
                    formattedId: camera.formattedId || (camera.name ? `${camera.name.toLowerCase().replace(/\s+/g, '')}@gmail.com` : `user${camera.id}@gmail.com`)
                }));
                setCameras(enrichedData);
                setFilteredCameras(enrichedData);
            })
            .catch(error => {
                setCameras([]);
                setFilteredCameras([]);
            });
    }, []);

    useEffect(() => {
        let result = cameras;

        if (searchTerm) {
            result = result.filter(camera =>
                camera.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                camera.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                camera.recorder?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                camera.tasks?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                camera.formattedId?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (locationFilter) {
            result = result.filter(camera => camera.location === locationFilter);
        }

        if (statusFilter) {
            result = result.filter(camera => camera.status === statusFilter);
        }

        setFilteredCameras(result);
        setCurrentPage(1);
    }, [searchTerm, locationFilter, statusFilter, cameras]);

    useEffect(() => {
        const maxPage = Math.ceil(filteredCameras.length / itemsPerPage) || 1;
        if (currentPage > maxPage) setCurrentPage(1);
    }, [itemsPerPage, filteredCameras.length]);

    const updateStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
        try {
            await fetch('https://api-app-staging.wobot.ai/app/v1/update/camera/status', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer 4ApVMIn5sTxeW7GQ5VWeWiy',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, status: newStatus })
            });
            setCameras(cameras.map(camera =>
                camera.id === id ? { ...camera, status: newStatus } : camera
            ));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleDelete = (id) => {
        setCameras(cameras.filter(camera => camera.id !== id));
    };

    const locations = [...new Set((Array.isArray(cameras) ? cameras : []).map(camera => camera.location))];
    const statuses = ['Active', 'Inactive'];

    return (
        <div className="min-h-screen bg-gray-100">
            <Suspense
                fallback={
                    <div className="flex flex-col items-center justify-center min-h-[300px]">
                        <svg className="animate-spin h-8 w-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                        <span className="text-lg text-gray-600 font-medium">Loading, please wait...</span>
                    </div>
                }
            >
                <Header setSearchTerm={setSearchTerm} />
                <div className="max-w-[1312px] mx-auto px-4 sm:px-6 md:px-8">
                    <Filters
                        locations={locations}
                        statuses={statuses}
                        setLocationFilter={setLocationFilter}
                        setStatusFilter={setStatusFilter}
                    />
                    <CameraTable
                        cameras={filteredCameras.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
                        updateStatus={updateStatus}
                        handleDelete={handleDelete}
                    />
                    <Pagination
                        totalItems={filteredCameras.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        setItemsPerPage={setItemsPerPage}
                    />
                </div>
            </Suspense>
        </div>
    );
};

export default App;
