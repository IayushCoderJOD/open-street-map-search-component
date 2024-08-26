import React from 'react';

const Dashboard = ({ data }) => {
    return (
        <>
            <div className='flex'>
                <div className='h-[190px] flex w-fit' style={{ textAlign: 'center', padding: 0 }}>
                    {data.svg}
                </div>
            </div>

        </>
    );
};

export default Dashboard;

