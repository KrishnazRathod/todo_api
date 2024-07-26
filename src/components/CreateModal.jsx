import React, { useEffect } from 'react'
import * as Yup from 'yup';
import { addtodo } from '../todo/todoSlice';
import { Field, Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import cros_icon from '..//assets/cros_icon.svg'
import close_icon from '..//assets/close_icon.svg'
import send_button from '..//assets/send_button.svg'

import './createModal.css'
import { createTodo, getTodo } from '../todo/todosSlice';

function CreateModal({ isModalOpen, closeModal }) {
    const mode = useSelector((state) => state.modeSlice.color)

    const dispatch = useDispatch();

    function generateShortId() {
        const uniqueId = Math.floor(Math.random() * 100);
        return uniqueId;
    }
    const generatedId = generateShortId();
    const id = generatedId; 

    const handleSubmit = async (values) => {
        const obj = {
            ...values, id: id, completed: false,
        };       
        // dispatch(addtodo(obj));
        
        await dispatch(createTodo(obj))

        await dispatch(getTodo())
        closeModal();
    };

    const initialValues = {
        id: '',
        title: '',
        task: '',
        priority: '',
        date: '',
        color: '',
        completed: false,
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        task: Yup.string().required('Task is required'),
        priority: Yup.string().required('Priority is required'),
        date: Yup.date().required('Date is required'),
        color: Yup.string().required('Color is required'),
    });

    const colorStyle = {
        color: mode === 'dark' ? '#fff' : '#333'
    }

    return (
        <>
            <div>
                {isModalOpen && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal-content" style={{ backgroundColor: mode === 'dark' ? '#212121' : '#fff' }} onClick={(e) => e.stopPropagation()}>
                            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                                {({ setFieldValue, errors, touched }) => (
                                    <>
                                        <Form>
                                            <div className='close_modal d-flex mb-2' style={colorStyle}>
                                                <div className='d-flex'>  <Field type='text' style={colorStyle} placeholder='Title' name='title' className='title p-1 active:border-transparent'></Field>
                                                    {touched.title && errors.title && <p className='mt-2' style={{ color: 'red' }}>{errors.title}</p>}</div>
                                                <img className='close_icon' onClick={closeModal} src={mode === 'dark' ? close_icon : cros_icon} alt="logo"></img>
                                            </div>
                                            <div className='input_modal '>
                                                <Field className='modal_text p-1 mb-1 w-full ' style={colorStyle} as='textarea' type='text' name='task' placeholder='Write here' rows={4}></Field>
                                                {touched.task && errors.task && <p className='text-left' style={{ color: 'red' }}>{errors.task}</p>}
                                            </div>
                                            <div className='footer_modal d-flex'>
                                                <div className='select'>
                                                    <Field as='select' className='priority_container' style={{ backgroundColor: mode === 'dark' ? '#393939' : 'transparent', color: mode === 'dark' ? '#fff' : '#323232' }} name="priority" id="cars">
                                                        <option value="all">Set Priority</option>
                                                        <option value="low">Low</option>
                                                        <option value="high">High</option>
                                                        <option value="medium">Medium</option>
                                                    </Field>
                                                    {touched.priority && errors.priority && <p style={{ color: 'red' }}>{errors.priority}</p>}
                                                </div>
                                                <div className='date_modal'>
                                                    <Field className='date_select ' style={{ backgroundColor: mode === 'dark' ? '#393939' : 'transparent', color: mode === 'dark' ? '#fff' : '#323232' }} type="date" id="datepicker" name="date"></Field>
                                                    {touched.date && errors.date && <p style={{ color: 'red' }}>{errors.date}</p>}
                                                </div>
                                                <div>   <div className='priority_color d-flex'>
                                                    <div className='hover:border-2 border-black color_priority' type='button' id='#FFF' style={{
                                                        backgroundColor: '#FFF',
                                                        borderRadius: '50%', height: '20px', width: '20px', transition: 'background-color 0.1s ease', cursor: 'pointer'
                                                    }} onClick={(e) => setFieldValue("color", e.target.id)}
                                                        onMouseOver={(e) => {
                                                            e.target.style.opacity = '0.7';
                                                        }}
                                                        onMouseOut={(e) => {
                                                            e.target.style.opacity = '1';
                                                        }}></div>

                                                    <div className='hover:border-2 border-black color_priority' type='button' id='#F8BEBE' style={{
                                                        backgroundColor: '#F8BEBE',
                                                        borderRadius: '50%', height: '20px', width: '20px', transition: 'background-color 0.1s ease', cursor: 'pointer'
                                                    }} onClick={(e) => setFieldValue("color", e.target.id)}
                                                        onMouseOver={(e) => {
                                                            e.target.style.opacity = '0.7';
                                                        }}
                                                        onMouseOut={(e) => {
                                                            e.target.style.opacity = '1';
                                                        }}></div>

                                                    <div className='hover:border-2 border-black color_priority' type='button' id='#FCEDBE' style={{
                                                        backgroundColor: '#FCEDBE',
                                                        borderRadius: '50%', height: '20px', width: '20px', transition: 'background-color 0.1s ease', cursor: 'pointer'
                                                    }} onClick={(e) => setFieldValue("color", e.target.id)}
                                                        onMouseOver={(e) => {
                                                            e.target.style.opacity = '0.7';
                                                        }}
                                                        onMouseOut={(e) => {
                                                            e.target.style.opacity = '1';
                                                        }}></div>

                                                    <div className='hover:border-2 border-black color_priority' type='button' id='#CAECCC' style={{
                                                        backgroundColor: '#CAECCC',
                                                        borderRadius: '50%', height: '20px', width: '20px', cursor: 'pointer', transition: 'background-color 0.1s ease',
                                                    }} onClick={(e) => setFieldValue("color", e.target.id)}
                                                        onMouseOver={(e) => {
                                                            e.target.style.opacity = '0.7';
                                                        }}
                                                        onMouseOut={(e) => {
                                                            e.target.style.opacity = '1';
                                                        }}></div>

                                                    <div className='hover:border-2 border-black color_priority' type='button' id='#B3DFF6' style={{
                                                        backgroundColor: '#B3DFF6',
                                                        borderRadius: '50%', height: '20px', width: '20px', transition: 'background-color 0.1s ease', cursor: 'pointer'
                                                    }} onClick={(e) => setFieldValue("color", e.target.id)}
                                                        onMouseOver={(e) => {
                                                            e.target.style.opacity = '0.7';
                                                        }}
                                                        onMouseOut={(e) => {
                                                            e.target.style.opacity = '1';
                                                        }}></div>

                                                    <div className='hover:border-2 border-black color_priority' type='button' id='#EBDCFE' style={{
                                                        backgroundColor: '#EBDCFE',
                                                        borderRadius: '50%', height: '20px', width: '20px', transition: 'background-color 0.1s ease', cursor: 'pointer'
                                                    }} onClick={(e) => setFieldValue("color", e.target.id)}
                                                        onMouseOver={(e) => {
                                                            e.target.style.opacity = '0.7';
                                                        }}
                                                        onMouseOut={(e) => {
                                                            e.target.style.opacity = '1';
                                                        }}></div>
                                                </div>
                                                    {touched.color && errors.color && <p className='mt-2' style={{ color: 'red' }}>{errors.color}</p>}</div>
                                                <div>
                                                    <div className='w-14'>
                                                        <button className='hover:w-10' type='submit' style={{
                                                            backgroundColor: 'transparent',

                                                        }}><img type='submit' src={send_button} alt=''></img></button>
                                                    </div>
                                                </div>
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

export default CreateModal