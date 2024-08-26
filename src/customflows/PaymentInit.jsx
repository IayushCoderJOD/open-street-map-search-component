import { useReactFlow } from '@xyflow/react';
import React from 'react';
import { CustomHandle } from './CustomHandle';

export const PaymentInit = ({ data, id }) => {
    const { setNodes } = useReactFlow();
    return (
        <div className='shadow-2xl h-12 w-fit flex text-center justify-center   rounded-xl ' >
            <div style={{
                backgroundColor: `${data.color}`
            }} className={`align-middle flex text-white h-24 w-36 font-semibold p-2 border-black border m-1 items-center rounded-xl`}>
                {data.amount}
                <CustomHandle type='source' position='right' />
                <div className='space-y-2 absolute right-9'>

                    <div class="relative bg-teal-400 w-5 h-5 rounded-full">
                        <div class="absolute -right-[5px] bg-[#60747c] w-3 h-3 rounded-full  top-1/2 transform -translate-y-1/2"></div>
                    </div>
                    <div class="relative bg-teal-400 w-5 h-5 rounded-full">
                        <div class="absolute -right-[5px] bg-[#60747c] w-3 h-3 rounded-full  top-1/2 transform -translate-y-1/2"></div>
                    </div>
                    <div class="relative bg-teal-400 w-5 h-5 rounded-full">
                        <div class="absolute -right-[5px] bg-[#60747c] w-3 h-3 rounded-full  top-1/2 transform -translate-y-1/2"></div>
                    </div>
                </div>
            </div>
            <button onClick={() => {
                setNodes(prevNodes => prevNodes.filter(node => node.id != id))
            }} className='text-red-500 relative -top-9 right-10' >❌</button>
        </div>
    )
}
