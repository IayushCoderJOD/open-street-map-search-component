import React from 'react';

const Frame = ({ data }) => {
    return (
        <div className='flex items-center'>
            <div
                className="h-[122px] flex w-fit" style={{ textAlign: 'center', padding: 0 }}>
                {/* <img src={data.src} alt="" /> */}
                {data.src}

            </div>

        </div>
    );
};

export default Frame;
