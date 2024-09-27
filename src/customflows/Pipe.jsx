import React, { useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { MdCancel } from 'react-icons/md';
import { RiListSettingsLine } from 'react-icons/ri';
import ReusableForm from '../organisedFlows/ReusableForm';

const Pipe = ({ data }) => {
    const [showForm, setShowForm] = useState(false);
    const [visible, setVisible] = useState(false);

    const fields = [
        { label: 'Modbus Name', name: 'ModbusName', type: 'text', required: true },
        { label: 'Flow Rate', name: 'flowRate', type: 'text', required: false },
    ];

    const handleConfigureClick = () => {
        setShowForm(true);
    };

    const handleFormSubmit = (formData) => {
        console.log(formData);
        setShowForm(false);
    };

    return (
        <>
            <div className='flex'>
                {!showForm &&
                    <div onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)} className='h-fit flex w-fit'>
                        <h3 className='absolute text-gray-600 text-xs font-medium top-4 left-4'>{data.text}</h3>
                        {data.svg}
                        <div className='relative h-fit flex-col flex'>
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
                    </div>
                }
                <div className='absolute bottom-0'>

                    {showForm && <ReusableForm fields={fields} onSubmit={handleFormSubmit} onCancel={() => setShowForm(false)} />}
                </div>
            </div>
        </>
    );
};

export default Pipe;
