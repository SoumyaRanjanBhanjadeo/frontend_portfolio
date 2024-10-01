import { Form, Modal, message } from 'antd';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice';
import axios from 'axios';

const AdminProjects = () => {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { projects } = portfolioData;
    const [showAddEditModel, setShowAddEditModel] = useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    const [type, setType] = useState("add");

    const onFinish = async (values) => {
        try {
            const tempTechnologies = values?.technologies?.split(",") ||  [];
            values.technologies = tempTechnologies;
            dispatch(ShowLoading())
            let response
            if (selectedItemForEdit) {
                response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/portfolio/update-project`, {
                    ...values,
                    _id: selectedItemForEdit._id
                });
            } else {
                response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/portfolio/add-project`, values);
            }
            dispatch(HideLoading())
            if (response.data.success) {
                message.success(response.data.message);
                setShowAddEditModel(false);
                setSelectedItemForEdit(null);
                dispatch(HideLoading());
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message)
            }
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message)
        }
    }

    const onDelete = async (req, res) => {
        try {
            dispatch(ShowLoading())
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/portfolio/delete-project`, {
                _id: req._id,
            });
            dispatch(HideLoading())
            if (response.data.success) {
                message.success(response.data.message);
                dispatch(HideLoading());
                dispatch(ReloadData(true));
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
            <div className="flex justify-end">
                <button className="bg-primary px-5 py-2 text-white" onClick={() => {
                    setSelectedItemForEdit(null);
                    setShowAddEditModel(true);
                }}>Add Project</button>
            </div>
            <div className="grid grid-cols-3 gap-5 mt-5 sm:grid-cols-1">
                {
                    projects.map((project, index) => (
                        <div className='shadow border border-gray-400 p-5 flex flex-col gap-5' key={index}>
                            <h1 className='text-primary text-xl'>{project.title}</h1>
                            <hr />
                            <img src={project.image} className='h-60 w-80' alt="" />
                            <h1>Title: {project.title}</h1>
                            <h1>Description: {project.description}</h1>
                            <h1>Techologies: {`${project.technologies}`}</h1>
                            <div className="flex justify-end gap-5 mt-5">
                                <button className='bg-red-500 text-white px-5 py-2' onClick={() => {
                                    onDelete(project);
                                }}>Delete</button>
                                <button className='bg-primary text-white px-5 py-2' onClick={() => {
                                    setSelectedItemForEdit(project);
                                    setShowAddEditModel(true);
                                    setType("edit");
                                }}>Edit</button>
                            </div>
                        </div>
                    ))
                }
            </div>

            {
                (type === "add" || selectedItemForEdit) &&
                (<Modal open={showAddEditModel} title={selectedItemForEdit ? "Edit Project" : "Add Project"} footer={null} onCancel={() => { setShowAddEditModel(false); setSelectedItemForEdit(null); }}>
                    <Form layout='vertical' onFinish={onFinish} initialValues={{
                        ...selectedItemForEdit,
                        technologies: selectedItemForEdit?.technologies?.join(" , "),
                    } || {}}>
                        <Form.Item name='title' label='Title'>
                            <input placeholder='Title' />
                        </Form.Item>
                        <Form.Item name='image' label='Image URL'>
                            <input placeholder='Image Link' />
                        </Form.Item>
                        <Form.Item name='description' label='Description'>
                            <textarea placeholder='Description' />
                        </Form.Item>
                        <Form.Item name='link' label='Link'>
                            <input placeholder='Link' />
                        </Form.Item>
                        <Form.Item name='technologies' label='Technologies'>
                            <textarea placeholder='Technologies' />
                        </Form.Item>
                        <div className="flex justify-end">
                            <button className="border-primary text-primary px-5 py-2" onClick={() => {
                                setShowAddEditModel(false);
                                setSelectedItemForEdit(null);
                            }}>Cancel</button>
                            <button className="bg-primary text-white px-5 py-2">
                                {selectedItemForEdit ? "Update" : "Add"}
                            </button>
                        </div>
                    </Form>
                </Modal>)
            }
        </div >
    )
}

export default AdminProjects
