import { Handle } from '@xyflow/react';
import React from 'react';

export const CustomHandle = (props) => {
    const handleClick = (event) => {
        event.stopPropagation();
        console.log("Handle clicked!");
    };

    return (
        <Handle
            style={{
                height: 10,
                width: 10,
                background: 'white',
                border: '2px solid black'
            }}
            isConnectable={true}
            onClick={handleClick}
            {...props}
        />
    );
};
