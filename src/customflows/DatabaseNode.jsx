// import React from 'react';
// import { IoIosAddCircle } from 'react-icons/io';
// import { MdCancel } from 'react-icons/md';
// import { RiListSettingsLine } from 'react-icons/ri';

// const DatabaseNode = ({ data }) => {

//     return (
//         <>
//             <div className='flex z-50'>
//                 <div className='h-[190px] flex w-fit' style={{ textAlign: 'center', padding: 0 }}>
//                     {data.svg}
//                 </div>
//                 <div className=' relative -top-2 h-fit'>
//                     <div>
//                         {!data.hasNodeBeenAdded && (
//                             <button onClick={data.onAddNodeClick} className='text-xl text-green-600  font-semibold font-serif hover:text-green-500'>
//                                 <IoIosAddCircle />
//                             </button>
//                         )}
//                     </div>
//                     <div>
//                         {!data.hasNodeBeenAdded && (
//                             <button onClick={data.onAddNodeClick} className='text-lg text-yellow-600   font-semibold font-serif hover:text-yellow-500'>
//                                 <RiListSettingsLine />
//                             </button>
//                         )}
//                     </div>
//                     <div>
//                         {!data.hasNodeBeenAdded && (
//                             <button onClick={data.onDeleteNodeClick} className=' text-lg space-x-5 font-normal text-red-600 font-serif hover:text-red-500'>
//                                 <MdCancel />
//                             </button>

//                         )}
//                     </div>
//                 </div>

//             </div>
//         </>
//     );
// };

// export default DatabaseNode;

import React, { useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { MdCancel } from 'react-icons/md';
import { RiListSettingsLine } from 'react-icons/ri';

const DatabaseNode = ({ data }) => {
    const [showForm, setShowForm] = useState(false);
    const [visible, setVisible] = useState(false);
    const [dbUrl, setDbUrl] = useState('');
    const [dbUsername, setDbUsername] = useState('');
    const [dbPassword, setDbPassword] = useState('');
    const [dbName, setDbName] = useState('');
    const [dbPort, setDbPort] = useState('');

    const handleConfigureClick = () => {
        setShowForm(true);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Handle the form data submission logic here
        console.log({
            dbUrl,
            dbUsername,
            dbPassword,
            dbName,
            dbPort,
        });
        setShowForm(false);
    };

    return (
        <>
            <div className='flex z-50'>
                <div onMouseEnter={() => { setVisible(true) }}
                    onMouseLeave={() => { setVisible(false) }
                    } className=' h-[fit] flex w-full' style={{ textAlign: 'center', padding: 0 }}>
                    {data.svg}
                    {visible && <div className='relative -top-2 h-fit'>
                        <div>
                            {!data.hasNodeBeenAdded && (
                                <button
                                    onClick={data.onAddNodeClick}
                                    className='text-xl text-green-600 font-semibold font-serif hover:text-green-500'
                                >
                                    <IoIosAddCircle />
                                </button>
                            )}
                        </div>
                        <div>
                            {!data.hasNodeBeenAdded && (
                                <button
                                    onClick={handleConfigureClick}
                                    className='text-lg text-yellow-600 font-semibold font-serif hover:text-yellow-500'
                                >
                                    <RiListSettingsLine />
                                </button>
                            )}
                        </div>
                        <div>
                            {!data.hasNodeBeenAdded && (
                                <button
                                    onClick={data.onDeleteNodeClick}
                                    className='text-lg text-red-600 font-semibold font-serif hover:text-red-500'
                                >
                                    <MdCancel />
                                </button>
                            )}
                        </div>
                    </div>}
                </div>

                {showForm && (
                    <div className='absolute top-0 left-0 w-60 h-32 bg-black bg-opacity-50 flex justify-center items-center z-50'>
                        <form
                            onSubmit={handleFormSubmit}
                            className='bg-white p-4 rounded-lg shadow-lg max-w-sm w-full'
                        >
                            <h3 className='text-lg font-bold mb-3'>Configure Database</h3>
                            <div className='mb-2'>
                                <label className='block text-gray-700 text-sm'>Database URL</label>
                                <input
                                    type='text'
                                    value={dbUrl}
                                    onChange={(e) => setDbUrl(e.target.value)}
                                    className='w-full p-1 border border-gray-300 rounded text-sm'
                                    required
                                />
                            </div>
                            <div className='mb-2'>
                                <label className='block text-gray-700 text-sm'>Username</label>
                                <input
                                    type='text'
                                    value={dbUsername}
                                    onChange={(e) => setDbUsername(e.target.value)}
                                    className='w-full p-1 border border-gray-300 rounded text-sm'
                                    required
                                />
                            </div>
                            <div className='mb-2'>
                                <label className='block text-gray-700 text-sm'>Password</label>
                                <input
                                    type='password'
                                    value={dbPassword}
                                    onChange={(e) => setDbPassword(e.target.value)}
                                    className='w-full p-1 border border-gray-300 rounded text-sm'
                                    required
                                />
                            </div>

                            <div className='flex justify-end space-x-2'>
                                <button
                                    type='button'
                                    onClick={() => setShowForm(false)}
                                    className='px-3 py-1 bg-gray-500 text-white rounded text-sm'
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='px-3 py-1 bg-blue-600 text-white rounded text-sm'
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>

        </>
    );
};

export default DatabaseNode;
