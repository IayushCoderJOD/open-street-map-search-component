import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const ReusableForm = ({ fields, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
    );
    const [responseFromForm, setResponseFromForm] = useState([]);
    const [loading, setLoading] = useState(false);

    // Use useRef to keep track of whether the component is mounted
    const isMountedRef = useRef(true);

    useEffect(() => {
        // Component is mounted
        isMountedRef.current = true;

        // Cleanup function to handle component unmounting
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = { ...formData };
            console.log("payload", payload)

            // dummy endpoint
            // const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);

            // original endpoint
            const response = await axios.post(`http://192.168.0.110:5001/update-pipeline`, {
                git_branch: payload.BE,
                git_repo_url: payload.BackendFramework,
                job_name: payload.AuthMethod
            });
            if (isMountedRef.current) {
                onSubmit(response.data);
                setResponseFromForm(response.data);
                setLoading(false);
            }
        } catch (error) {
            // Only update state if component is still mounted
            if (isMountedRef.current) {
                console.error('Error making API call:', error);
                setLoading(false);
            }
        }

    };

    return (
        <div className='absolute top-0 left-0 w-60 h-32 bg-black bg-opacity-50 flex justify-center items-center z-50'>
            <form onSubmit={handleSubmit} className='bg-[#43a8a5] text-black shadow-2xl p-4 rounded-lg max-w-sm w-full'>
                <div className='flex justify-between '>
                    <h3 className='text-lg font-bold mb-3'>Configure</h3>
                    <button type='button' onClick={onCancel} className='text-black bg-white shadow-2xl rounded-md h-5 w-5 font-bold text-sm'>X</button>
                </div>
                {fields.map((field) => (
                    <div key={field.name} className='mb-2'>
                        <label className='block text-black text-sm'>{field.label}</label>
                        <input

                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            className='w-full p-1 border border-black rounded text-sm'
                            required={field.required}
                        />
                    </div>
                ))}
                <div className='flex justify-center space-x-2'>
                    <button
                        type='submit'
                        className='px-3 py-1 bg-black text-white rounded text-sm'
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReusableForm;
