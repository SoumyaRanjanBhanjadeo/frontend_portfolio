import React, { Children, useEffect } from 'react'
import Header from '../../components/Header'
import { Tabs } from "antd";
import AdminIntro from './AdminIntro';
import AdminAbout from './AdminAbout';
import { useSelector } from 'react-redux';
import AdminExperiences from './AdminExperiences';
import AdminProjects from './AdminProjects';
import AdminContact from './AdminContact';


const Admin = () => {
    const { portfolioData } = useSelector((state) => state.root);

    const items = [
        { label: 'Intro', key: '1', children: <AdminIntro />, },
        { label: 'About', key: '2', children: <AdminAbout />, },
        { label: 'Experience', key: '3', children: <AdminExperiences />, },
        { label: 'Projects', key: '4', children: <AdminProjects />, },
        { label: 'Contact', key: '5', children: <AdminContact />, },
    ];

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            window.location.href = "/admin-login"
        }
    }, [])

    return (
        <div>
            <Header />
            <div className='flex justify-between items-center'>
                <h1 className="text-2xl px-5 py-2 text-primary">Portfolio Admin</h1>
                <button className="text-white bg-primary border py-2 text-xl cursor-pointer px-5 mx-3 hover:bg-red-500"  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/admin-login";
                }}>Logout</button>
            </div>
            {
                portfolioData && (<div className=' px-5 pb-10'>
                    <Tabs items={items} defaultActiveKey='1'>
                        {/* <items tab='Intro' key='1'><AdminIntro /></items>
                        <items tab='About' key='2'><AdminAbout /></items> */}
                    </Tabs>
                </div>)
            }
        </div>
    )
}

export default Admin
