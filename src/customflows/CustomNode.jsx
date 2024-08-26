import React, { useState } from 'react';
import { IoIosAddCircle } from "react-icons/io";

const CustomNode = ({ data }) => {
    const [visible, setVisible] = useState(false);
    return (
        <div className='flex items-center'>
            <div
                onMouseEnter={() => { setVisible(true) }}
                onMouseLeave={() => { setVisible(false) }}
                className="h-[122px]  flex w-fit" style={{ textAlign: 'center', padding: 0 }}>
                <h3 className='absolute text-gray-600 text-xs font-medium   top-14 left-[410px]'>{data.text}</h3>
                <img src={data.src} alt="" />
                {visible && !data.hasNodeBeenAdded && (
                    <button onClick={data.onAddNodeClick} className='text-xl relative top-[45%] text-green-600 h-fit font-semibold font-serif hover:text-green-500'>
                        <IoIosAddCircle />
                    </button>
                )}
            </div>
        </div>
    );
};

export default CustomNode;
