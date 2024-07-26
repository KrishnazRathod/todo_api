import React from 'react'
import * as Yup from 'yup';
import { Field, Formik, Form } from 'formik'

import cros_icon from '..//assets/cros_icon.svg'
import close_icon from '..//assets/close_icon.svg'

import './filterModal.css'
import { useSelector } from 'react-redux';

function ModalFilter({ filterModalOpen, closeFilterModal, setFilterValues, onSubmit, setIsFilterOn }) {

    const mode = useSelector((state) => state.modeSlice.color);

    const filterIntialValues = {
        title: '',
        priority: '',
        date: '',
        color: '',
        completed: false,
    }

    const filtervalidationSchema = Yup.object({
        priority: Yup.string().required('Priority is required'),
        date: Yup.date().required('Date is required'),
        color: Yup.string().required('Color is required'),
    });

    const handleFilter = (values) => {
        setFilterValues(values);
        onSubmit(values);
    }

    const filterON = () => {
        setIsFilterOn(true)
    }

    const filterOf = () => {
        setIsFilterOn(false);
    };

    const colorStyle = {
        color: mode === 'dark' ? '#fff' : '#333'
    }

    return (
        <>
            <div>
                {filterModalOpen && (
                    <div className="filtermodal-overlay" onClick={closeFilterModal} >
                        <div className="filtermodal-content" style={{ backgroundColor: mode === 'dark' ? '#212121' : '#fff' }} onClick={(e) => e.stopPropagation()}>
                            <div className='close_filtermodal d-flex'>
                                <div className='filtertitle' style={colorStyle}>Sort By</div>
                                <img className='close_icon' type='submit' onClick={closeFilterModal} src={mode === 'dark' ? close_icon : cros_icon} alt="logo"></img>
                            </div>
                            <Formik initialValues={filterIntialValues} onSubmit={handleFilter} filtervalidationSchema={filtervalidationSchema}>
                                {({ setFieldValue, errors, touched }) => (
                                    <>
                                        <Form>
                                            <h1 style={colorStyle} className='input_filtermodal d-flex mb-2'>Priority</h1>
                                            <div>
                                                <div className='filterpriority_select d-flex mb-3 h-12'>
                                                    <div id='all' onClick={(e) => setFieldValue("priority", e.target.id)} style={{ color: mode === 'dark' ? '#fff' : '#333', border: mode === 'dark' ? 'transperent' : '1px solid black' }} className='filterpriority_button1 hover:bg-green-800 color_priority hover:text-white'>All</div>
                                                    <div id='low' onClick={(e) => setFieldValue("priority", e.target.id)} style={{ color: mode === 'dark' ? '#fff' : '#333', border: mode === 'dark' ? 'transperent' : '1px solid black' }} className='filterpriority_button2 hover:bg-green-800 color_priority'>Low</div>
                                                    <div id='high' onClick={(e) => setFieldValue("priority", e.target.id)} style={{ color: mode === 'dark' ? '#fff' : '#333', border: mode === 'dark' ? 'transperent' : '1px solid black' }} className='filterpriority_button3 hover:bg-green-800 color_priority'>High</div>
                                                    <div id='medium' onClick={(e) => setFieldValue("priority", e.target.id)} style={{ color: mode === 'dark' ? '#fff' : '#333', border: mode === 'dark' ? 'transperent' : '1px solid black' }} className='filterpriority_button4 hover:bg-green-800 color_priority'>Medium</div>
                                                </div>
                                                {touched.priority && errors.priority && <p className='mt-1 text-left' style={{ color: 'red' }}>{errors.priority}</p>}
                                            </div>

                                            <div className='filtertitle d-flex mb-2' style={colorStyle}>Date</div>
                                            <div className='date_filtermodal d-flex mb-2'>
                                                <Field className='input_filtermodal d-flex mb-3 w-30' style={colorStyle} type="date" id="datepicker" name="date"></Field>
                                            </div>
                                            <div className='footer_filtermodal d-flex mb-4 h-8'>
                                                <div className='priority_colorr d-flex'>
                                                    <div className='hover:border-2 border-black color_priority' type='button' id='#FFF' style={{
                                                        backgroundColor: '#FFF', cursor: 'pointer',
                                                        borderRadius: '50%', height: '20px', width: '20px', transition: 'background-color 0.1s ease',
                                                    }} onClick={(e) => setFieldValue("color", e.target.id)}
                                                        onMouseOver={(e) => {
                                                            e.target.style.opacity = '0.7';
                                                        }}
                                                        onMouseOut={(e) => {
                                                            e.target.style.opacity = '1';
                                                        }}></div>
                                                    <div className='hover:border-2 border-black color_priority' type='button' id='#F8BEBE' style={{
                                                        backgroundColor: '#F8BEBE', cursor: 'pointer',
                                                        borderRadius: '50%', height: '20px', width: '20px', opacity: '1', transition: 'background-color 0.1s ease',
                                                    }} onClick={(e) => setFieldValue("color", e.target.id)}
                                                        onMouseOver={(e) => {
                                                            e.target.style.opacity = '0.7';
                                                        }}
                                                        onMouseOut={(e) => {
                                                            e.target.style.opacity = '1';
                                                        }}></div>
                                                    <div className='hover:border-2 border-black color_priority' type='button' id='#FCEDBE' style={{
                                                        backgroundColor: '#FCEDBE', cursor: 'pointer',
                                                        borderRadius: '50%', height: '20px', width: '20px', opacity: '1', transition: 'background-color 0.1s ease',
                                                    }} onClick={(e) => setFieldValue("color", e.target.id)}
                                                        onMouseOver={(e) => {
                                                            e.target.style.opacity = '0.7';
                                                        }}
                                                        onMouseOut={(e) => {
                                                            e.target.style.opacity = '1';
                                                        }}></div>
                                                    <div className='hover:border-2 border-black color_priority' type='button' id='#CAECCC' style={{
                                                        backgroundColor: '#CAECCC', cursor: 'pointer',
                                                        borderRadius: '50%', height: '20px', width: '20px', opacity: '1', transition: 'background-color 0.1s ease',
                                                    }} onClick={(e) => setFieldValue("color", e.target.id)}
                                                        onMouseOver={(e) => {
                                                            e.target.style.opacity = '0.7';
                                                        }}
                                                        onMouseOut={(e) => {
                                                            e.target.style.opacity = '1';
                                                        }}></div>
                                                    <div className='hover:border-2 border-black color_priority ' type='button' id='#B3DFF6' style={{
                                                        backgroundColor: '#B3DFF6', cursor: 'pointer',
                                                        borderRadius: '50%', height: '20px', width: '20px', opacity: '1', transition: 'background-color 0.1s ease',
                                                    }} onClick={(e) => setFieldValue("color", e.target.id)}
                                                        onMouseOver={(e) => {
                                                            e.target.style.opacity = '0.7';
                                                        }}
                                                        onMouseOut={(e) => {
                                                            e.target.style.opacity = '1';
                                                        }}></div>
                                                    <div className='hover:border-2 border-black color_priority mb-2' type='button' id='#EBDCFE' style={{
                                                        backgroundColor: '#EBDCFE', cursor: 'pointer',
                                                        borderRadius: '50%', height: '20px', width: '20px', opacity: '1', transition: 'background-color 0.1s ease',
                                                    }} onClick={(e) => setFieldValue("color", e.target.id)}
                                                        onMouseOver={(e) => {
                                                            e.target.style.opacity = '0.7';
                                                        }}
                                                        onMouseOut={(e) => {
                                                            e.target.style.opacity = '1';
                                                        }}></div>
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <button onClick={filterON} type='submit' className='send_filterbutton d-flex'>
                                                    Apply
                                                </button>

                                                <button onClick={filterOf} type='submit' className='send_filterbutton d-flex mr-10'>
                                                    Reset
                                                </button>
                                            </div>
                                        </Form>
                                    </>
                                )}
                            </Formik>

                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ModalFilter