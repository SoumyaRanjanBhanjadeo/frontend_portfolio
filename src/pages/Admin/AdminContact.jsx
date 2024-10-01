import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/rootSlice';
import { Form, message } from 'antd';
import axios from 'axios';

const AdminContact = () => {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);

    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading())
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/portfolio/update-contact`, {
                ...values,
                _id: portfolioData.contact._id,
            });
            dispatch(HideLoading())
            if (response.data.success) {
                message.success(response.data.message)
            } else {
                message.error(response.data.message)
            }
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message)
        }
    }

    return (
        <div>
            <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData?.contact}>
                <Form.Item name='name' label='Name'>
                    <input placeholder='Name' />
                </Form.Item>
                <Form.Item name='gender' label='Gender'>
                    <input placeholder='Gender' />
                </Form.Item>
                <Form.Item name='age' label='Age'>
                    <input placeholder='Age' />
                </Form.Item>
                <Form.Item name='email' label='Email'>
                    <input placeholder='Email' />
                </Form.Item>
                <Form.Item name='mobile' label='Mobile'>
                    <input placeholder='Mobile' />
                </Form.Item>
                <Form.Item name='address' label='Address'>
                    <input placeholder='Address' />
                </Form.Item>
                <div className="flex justify-end w-full">
                    <button className='px-10 py-2 bg-primary text-white' type='submit'>Save</button>
                </div>
            </Form>
        </div>
    )
}

export default AdminContact
