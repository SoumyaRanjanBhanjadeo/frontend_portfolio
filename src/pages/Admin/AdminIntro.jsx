import { Form, message } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ShowLoading, HideLoading } from '../../redux/rootSlice'
import axios from 'axios';

const AdminIntro = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading())
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/portfolio/update-intro`, {
        ...values,
        _id: portfolioData.intro._id,
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
      <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData?.intro}>
        <Form.Item name='welcomeText' label='WelcomeText'>
          <input placeholder='Intro' />
        </Form.Item>
        <Form.Item name='firstName' label='FirstName'>
          <input placeholder='Firstname' />
        </Form.Item>
        <Form.Item name='lastName' label='LastName'>
          <input placeholder='Lastname' />
        </Form.Item>
        <Form.Item name='caption' label='Caption'>
          <input placeholder='Caption' />
        </Form.Item>
        <Form.Item name='description' label='Description'>
          <textarea placeholder='Description' />
        </Form.Item>
        <div className="flex justify-end w-full">
          <button className='px-10 py-2 bg-primary text-white' type='submit'>Save</button>
        </div>
      </Form>
    </div>
  )
}

export default AdminIntro
