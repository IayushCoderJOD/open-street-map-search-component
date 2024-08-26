import { useReactFlow } from '@xyflow/react';
import React from 'react';
import { CustomHandle } from './CustomHandle';

export const GrayComponent = ({ data, id }) => {
    const { setNodes } = useReactFlow();
    return (
        <div className='shadow-2xl h-12 w-fit flex text-center justify-center   rounded-xl ' >
            <div style={{
                backgroundColor: `${data.color}`
            }} className={`align-middle flex text-white h-32 w-10 font-semibold p-2 border-black border m-1 items-center rounded-xl`}>
                {data.amount}
                <CustomHandle type='source' position='right' />
            </div>
            <button onClick={() => {
                setNodes(prevNodes => prevNodes.filter(node => node.id != id))
            }} className='text-red-500 relative -top-9 right-10' >❌</button>
        </div>
    )
}
