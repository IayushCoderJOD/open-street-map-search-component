import React from 'react';

const LShapedFlow = ({ data }) => {
    return (
        <>
            <div className='flex'>
                <div className='h-[190px] flex w-fit' style={{ textAlign: 'center', padding: 0 }}>
                    <h3 className='absolute text-gray-600 text-xs font-medium -rotate-90  top-10 -left-3'>{data.text}</h3>
                    {data.svg}
                </div>
                <div className='relative justify-center text-center align-middle top-[107px]'>
                    {!data.hasNodeBeenAdded && (
                        <button onClick={data.onAddNodeClick} className='text-3xl font-semibold font-serif hover:text-red-500'>
                            +
                        </button>
                    )}
                    {!data.hasNodeBeenAdded && (
                        <button onClick={data.onDeleteNodeClick} className='text-2xl space-x-4 font-semibold font-serif text-red-500'>
                            ✖
                        </button>

                    )}

                </div>
            </div>

        </>
    );
};

export default LShapedFlow;

