import React, {useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import frame from '..//assets/Frame.svg'
import profile from '..//assets/profile.svg'
import arrow_icon from '..//assets/arrow.svg'
import filter_icon from '..//assets/filter.svg'
import search_icon from '..//assets/seach_icon.svg'
import frame_light from '..//assets/frame_light.svg'
import logout_icon from '..//assets/logout_icon.svg'
import filter_light from '..//assets/filter_light.svg'

import './home.css'
import Card from './Card'
import ModalFilter from './ModalFilter'
import CreateModal2 from './CreateModal'
import { colorMode } from '../colorMode/modeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getTodo } from '../todo/todosSlice'

function Home() {

    const [activeTab, setActiveTab] = useState('My Task');
    const [isModalOpen, setModalOpen] = useState(false);
    const[searchValue,setSearchValue] = useState('');
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [isFilterOn, setIsFilterOn] = useState(false);
    const [filterValues, setFilterValues] = useState({});
    const user = JSON.parse(localStorage.getItem("user"));
    const mode = useSelector((state) => state.modeSlice.color);
    const dispatch = useDispatch();

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

    const openMyTask = () => {
        setActiveTab('My Task')
    }
    const openCompleted = () => {
        setActiveTab('Completed')
    }

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const openFilterModal = () => {
        setFilterModalOpen(true);
    };

    const closeFilterModal = () => {
        setFilterModalOpen(false);
    };
    

    const handleFilterSubmit = (values) => {

        closeFilterModal();
    }

    const handleToggleMode = (e) => {
        dispatch(colorMode())
    }

    const colorStyle = {
        color: mode === 'dark' ? '#fff' : '#333'
    }

    const backgroundStyle = {
        backgroundColor: mode === 'dark' ? '#101213' : '#fff'
    }

    useEffect(()=>{
        dispatch(getTodo());
    },[])
    
    return (
        <>
            <div className='body min-h-screen' style={backgroundStyle}>
                <div className='nav d-flex' style={{ backgroundColor: mode === 'dark' ? 'black' : '#fff' }}>
                    <div className='logo_container d-flex'>
                        <div className='d-flex'>
                            <img className='logo' src={mode === 'dark' ? frame : frame_light} alt="logo"></img>
                            <div className="nav_text font-bold" style={colorStyle}>To-Do List</div></div>
                    </div>
                    <div className='search_constainer d-flex'>
                        <div className='search d-flex' >
                            <img className='search_icon' src={search_icon} alt="logo"></img>
                            <input className='searchbar' onChange={(e)=> setSearchValue(e.target.value)} style={{ backgroundColor: mode === 'dark' ? '#333' : '#fff', color: mode === 'dark' ? '#fff' : '#333' }} type='search' placeholder='Search' />
                            <div className='filter_container'>
                                <img type='submit' onClick={openFilterModal}  className='filter_icon' src={mode === 'dark' ? filter_icon : filter_light} alt="logo"></img>
                            </div>
                        </div>
                    </div>
                    <div className='toggle_constainer mt-3 d-flex'>
                        <div className='dark_text' style={{ color: mode === 'dark' ? 'white' : 'black', opacity: mode === 'dark' ? '70%' : '100%' }}>Light</div>
                        <div className='toggle' >
                            <div className="checkbox-wrapper-34">
                                <input className='tgl tgl-ios' id='toggle-34' type='checkbox' onChange={handleToggleMode} />
                                <label className='tgl-btn' htmlFor="toggle-34"></label>
                            </div>
                        </div>
                        <div className='dark_text' style={{ color: mode === 'dark' ? 'white' : 'black', opacity: mode === 'dark' ? '100%' : '70%' }}>Dark</div>
                    </div>
                    <div className='profile_constainer d-flex ml-6'>
                        <div className='profile'>
                            <img className='pic' src={profile} alt="logo"></img>
                        </div>
                        <div className='name_text font-semibold' style={colorStyle}>{user.name}</div>
                        <div className='logout'>
                            <Link to='/login'>
                                <img type='submit' className='locout_icon w-40' src={logout_icon} alt="logo"></img>
                            </Link>
                        </div>
                    </div>
                </div>
                {mode === 'dark' ? <div></div> : <hr style={{ color: mode === 'dark' ? '##191619' : '#333',margin:'0px' }}></hr>}
                <div className='create_body d-flex'>
                    <div className='header d-flex'>
                        <div className='left_header d-flex'>
                            <div className='welcome_text font-semibold'>Welcome to your </div>
                            <div className='todo_text font-semibold'>To-Do List Mananger</div>
                        </div>
                        <div className='right_header d-flex'>
                            <div type='submit' onClick={openModal} className='create_container d-flex'>
                                <div className='create_button'>Create To-Do</div>
                                <img className='arrow_icon' src={arrow_icon} alt="logo"></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='task_head d-flex'>
                    <div className='select_container d-flex'>
                        <div className='d-flex brudcomp font-semibold'>
                            <div style={colorStyle}
                                className={`item1_text ${activeTab === 'My Task' ? 'active' : ''}`}
                                onClick={() => { openMyTask() }}
                            >
                                My Task
                            </div>
                            <div style={colorStyle}
                                className={`item2_text ${activeTab === 'Completed' ? 'active' : ''}`}
                                onClick={() => { openCompleted() }}
                            >
                                Completed
                            </div>
                        </div>
                    </div>
                </div>
                {<Card filterValues={filterValues} isFilterOn={isFilterOn} activeTab={activeTab} searchValue={searchValue}/>}
                <ModalFilter filterModalOpen={filterModalOpen} closeFilterModal={closeFilterModal} setFilterValues={setFilterValues} setIsFilterOn={setIsFilterOn} onSubmit={handleFilterSubmit} />
                <CreateModal2 isModalOpen={isModalOpen} closeModal={closeModal} />
            </div>
        </>
    )
}

export default Home