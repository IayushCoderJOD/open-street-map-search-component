import React, { useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { MdCancel } from 'react-icons/md';
import { RiListSettingsLine } from 'react-icons/ri';

const Pipe = ({ data }) => {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <div className='flex'>
                <div
                    onMouseEnter={() => { setVisible(true) }}
                    onMouseLeave={() => { setVisible(false) }}
                    className='h-fit flex w-fit' style={{ textAlign: 'center', padding: 0 }}>
                    <h3 className='absolute text-gray-600 text-xs font-medium   top-4 left-4'>{data.text}</h3>
                    {data.svg}

                    {visible && <div className=' relative -top-2 h-fit'>
                        <div>
                            {!data.hasNodeBeenAdded && (
                                <button onClick={data.onAddNodeClick} className='text-xl text-green-600  font-semibold font-serif hover:text-green-500'>
                                    <IoIosAddCircle />
                                </button>
                            )}
                        </div>
                        <div>
                            {!data.hasNodeBeenAdded && (
                                <button onClick={data.onAddNodeClick} className='text-lg text-yellow-600   font-semibold font-serif hover:text-yellow-500'>
                                    <RiListSettingsLine />
                                </button>
                            )}
                        </div>
                        <div>
                            {!data.hasNodeBeenAdded && (
                                <button onClick={data.onDeleteNodeClick} className=' text-lg space-x-5 font-normal text-red-600 font-serif hover:text-red-500'>
                                    <MdCancel />
                                </button>

                            )}
                        </div>
                    </div>}
                </div>

            </div>

        </>
    );
};

export default Pipe;

