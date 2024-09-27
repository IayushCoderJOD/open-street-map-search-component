import React from 'react';
import { IoIosAddCircle } from "react-icons/io";

const AddButtonNode = ({ data }) => {
    // const [visible, setVisible] = useState(false);

    return (
        <div className='flex border border-black  align-middle justify-center items-center'>
            <div
                // onMouseEnter={() => { setVisible(true); }}
                // onMouseLeave={() => { setVisible(false); }}
                className="flex  h-[50px] w-fit" style={{ textAlign: 'center', padding: 0 }}>

                {!data.hasNodeBeenAdded && (
                    <button
                        onClick={data.onAddNodeClick}
                        className='text-2xl relative  text-green-600 h-fit font-semibold font-serif hover:text-green-500'
                    >
                        <IoIosAddCircle />
                    </button>
                )}
            </div>
        </div>
    );
};

export default AddButtonNode;
