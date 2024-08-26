import React, { useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { MdCancel } from 'react-icons/md';

const ThreeWayPipe = ({ data }) => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <div className='flex'>
                <div
                    onMouseEnter={() => { setVisible(true) }}
                    onMouseLeave={() => { setVisible(false) }}
                    className='h-[197px] flex w-fit' style={{ textAlign: 'center', padding: 0 }}>
                    <h3 className='absolute text-gray-600 text-xs font-medium   top-4 left-4'>{data.text}</h3>
                    {data.svg}

                    {visible && <div className='h-fit'>
                        <div>
                            {!data.hasNodeBeenAdded && (
                                <button onClick={data.onAddNodeClick} className='text-xl text-green-600  font-semibold font-serif hover:text-green-500'>
                                    <IoIosAddCircle />
                                </button>
                            )}
                        </div>

                        <div>
                            {!data.hasNodeBeenAdded && (
                                <button onClick={data.onDeleteNodeClick} className=' text-xl space-x-5 font-normal text-red-600 font-serif hover:text-red-500'>
                                    <MdCancel />
                                </button>

                            )}
                        </div>
                    </div>
                    }
                    {visible &&
                        <div>
                            <div className=' h-fit absolute  top-[172px] right-[107px] justify-center'>
                                <div>
                                    {!data.hasNodeBeenAdded && (
                                        <button onClick={data.onSpecialAddNodeClick} className='text-xl text-green-600  font-semibold font-serif hover:text-green-500'>
                                            <IoIosAddCircle />
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className='  h-fit absolute  top-[172px] right-[77px] justify-center'>

                                <div>
                                    {!data.hasNodeBeenAdded && (
                                        <button onClick={data.onSpecialDeleteNodeClick} className=' text-xl space-x-5 font-normal text-red-600 font-serif hover:text-red-500'>
                                            <MdCancel />
                                        </button>

                                    )}
                                </div>
                            </div>
                        </div>
                    }
                </div>

            </div>


        </>
    );
};

export default ThreeWayPipe;








// import React, { useState } from 'react';
// import { IoIosAddCircle } from 'react-icons/io';
// import { MdCancel } from 'react-icons/md';
// import { RiListSettingsLine } from 'react-icons/ri';

// const ThreeWayPipe = ({ data }) => {
//     const [showForm, setShowForm] = useState(false);
//     const [protocolInfo, setProtocolInfo] = useState('');

//     const handleConfigureClick = () => {
//         setShowForm(true);
//     };

//     const handleFormSubmit = (event) => {
//         event.preventDefault();
//         // Handle the form data submission logic here

//         setShowForm(false);
//     };

//     return (
//         <>
//             <div className='flex'>
//                 <div className='h-[190px] flex w-fit' style={{ textAlign: 'center', padding: 0 }}>
//                     <h3 className='absolute text-gray-600 text-xs font-medium   top-4 left-4'>{data.text}</h3>
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
//                             <button
//                                 onClick={handleConfigureClick}
//                                 className='text-lg text-yellow-600 font-semibold font-serif hover:text-yellow-500'
//                             >
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

//                 {showForm && (
//                     <div className='absolute top-0 left-0 w-60 h-32 bg-black bg-opacity-50 flex justify-center items-center z-50'>
//                         <form
//                             onSubmit={handleFormSubmit}
//                             className='bg-white p-4 rounded-lg shadow-lg max-w-sm w-full'
//                         >
//                             <h3 className='text-lg font-bold mb-3'>Protocol Information</h3>
//                             <div className='mb-2'>
//                                 <label className='block text-gray-700 text-sm'>Protocol</label>
//                                 <input
//                                     type='text'
//                                     value={protocolInfo}
//                                     onChange={(e) => setProtocolInfo(e.target.value)}
//                                     className='w-full p-1 border border-gray-300 rounded text-sm'
//                                     required
//                                 />
//                             </div>

//                             <div className='flex justify-end space-x-2'>
//                                 <button
//                                     type='button'
//                                     onClick={() => setShowForm(false)}
//                                     className='px-3 py-1 bg-gray-500 text-white rounded text-sm'
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type='submit'
//                                     className='px-3 py-1 bg-blue-600 text-white rounded text-sm'
//                                 >
//                                     Save
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 )}
//             </div>
//             <div className=' h-fit absolute  top-[165px] right-[107px] justify-center'>
//                 <div>
//                     {!data.hasNodeBeenAdded && (
//                         <button onClick={data.onSpecialAddNodeClick} className='text-2xl font-semibold font-serif hover:text-green-500'>
//                             +
//                         </button>
//                     )}

//                 </div>
//             </div>
//             <div className='  h-fit absolute  top-[169px] right-[77px] justify-center'>

//                 <div>
//                     {!data.hasNodeBeenAdded && (
//                         <button onClick={data.onSpecialDeleteNodeClick} className='text-sm pl-1 space-x-4 font-normal font-serif hover:text-red-500'>
//                             ✖
//                         </button>
//                     )}
//                 </div>
//             </div>

//         </>
//     );
// };

// export default ThreeWayPipe;


