import React, { useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { MdCancel } from 'react-icons/md';
import { RiListSettingsLine } from 'react-icons/ri';
import ReusableForm from '../organisedFlows/ReusableForm';
import { fieldsMapping } from './FormField';

const organisedDatabase = ({ data }) => {
    const [showForm, setShowForm] = useState(false);
    const [visible, setVisible] = useState(false)

    const fields = fieldsMapping[data.text] || [];

    const handleConfigureClick = () => {
        setShowForm(true);
    };

    const handleFormSubmit = (formData) => {
        console.log(formData);
        setShowForm(false);
    };

    return (
        <>
            <div className='flex z-50'>
                {!showForm && <div
                    onMouseEnter={() => { setVisible(true) }}
                    onMouseLeave={() => { setVisible(false) }}
                    className='h-fit flex w-full'>
                    {data.svg}
                    {/* <div className='h-12 flex justify-center items-center w-56 bg-white rounded-xl border-2 border-black '  >
                        <h1 className=''>{data.text}</h1>
                    </div> */}
                    <div className='relative  h-fit flex-col flex'>
                        {visible && !data.hasNodeBeenAdded && (
                            <>
                                <button onClick={data.onAddNodeClick} className='text-xl text-green-600 font-semibold font-serif hover:text-green-500'>
                                    <IoIosAddCircle />
                                </button>
                                <button onClick={handleConfigureClick} className='text-lg text-yellow-600 font-semibold font-serif hover:text-yellow-500'>
                                    <RiListSettingsLine />
                                </button>
                                <button onClick={data.onDeleteNodeClick} className='text-lg text-red-600 font-semibold font-serif hover:text-red-500'>
                                    <MdCancel />
                                </button>
                            </>
                        )}
                    </div>
                </div>}
                {showForm &&
                    <div className='absolute bottom-0'>
                        <ReusableForm fields={fields} onSubmit={handleFormSubmit} onCancel={() => setShowForm(false)} />
                    </div>
                }
            </div>
        </>
    );
};

export default organisedDatabase;
