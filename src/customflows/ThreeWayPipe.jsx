import React, { useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { MdCancel } from 'react-icons/md';
import { RiListSettingsLine } from 'react-icons/ri';
import ReusableForm from '../organisedFlows/ReusableForm';

const ThreeWayPipe = ({ data }) => {
    const [visible, setVisible] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [specialAddClicked, setSpecialAddClicked] = useState(false);
    const [specialDeleteClicked, setSpecialDeleteClicked] = useState(false);

    const fields = [
        { label: 'Protocol Name', name: 'protocolName', type: 'text', required: true },
        { label: 'Version', name: 'version', type: 'text', required: true },
        { label: 'Endpoint URL', name: 'endpointUrl', type: 'text', required: true },
    ];

    const handleConfigureClick = () => {
        setShowForm(true);
    };

    const handleFormSubmit = (formData) => {
        console.log(formData);
        setShowForm(false);
    };

    const handleSpecialAddClick = (event) => {
        data.onSpecialAddNodeClick(event);
        setSpecialAddClicked(true);
    };

    const handleSpecialDeleteClick = () => {
        data.onSpecialDeleteNodeClick();
        setSpecialDeleteClicked(true);
    };

    return (
        <>
            <div className='flex'>
                {!showForm &&
                    <div
                        onMouseEnter={() => setVisible(true)}
                        onMouseLeave={() => setVisible(false)}
                        className=' h-[188px]  flex w-fit'
                        style={{ textAlign: 'center', padding: 0 }}>
                        <h3 className='absolute text-gray-600 text-xs font-medium top-4 left-4'>{data.text}</h3>
                        {data.svg}
                        <div className='relative h-fit flex-col flex'>
                            {
                                visible && (
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
                                )
                            }
                            {
                                visible && (
                                    <div className='absolute left-7'>
                                        <div className='h-fit absolute top-[172px] right-[100px] justify-center'>
                                            <div>
                                                {!specialAddClicked && (
                                                    <button
                                                        onClick={handleSpecialAddClick}
                                                        className='text-xl text-green-600 font-semibold font-serif hover:text-green-500'
                                                        disabled={specialAddClicked}
                                                    >
                                                        <IoIosAddCircle />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                )
                            }
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

export default ThreeWayPipe;
