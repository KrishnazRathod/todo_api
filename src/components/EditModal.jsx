import React, { useEffect } from 'react'
import * as Yup from 'yup';
import { edittodo } from '../todo/todoSlice';
import { Field, Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import close_icon from '..//assets/close_icon.svg'
import cros_icon from '..//assets/cros_icon.svg'

import './editModal.css'
import { editTodo, getTodo } from '../todo/todosSlice';

function EditModal({editModalOpen, closeEditModal, id, editId,mode }) {

    const todo = useSelector((state) => state.todoSlice.todo);
    const filterEdit = todo.find((item) => item.id === editId)


    const dispatch = useDispatch();

    const initialValues = todo[id]
        ? {
            id: filterEdit.editId,
            title: filterEdit.title,
            task: filterEdit.task,
            priority: filterEdit.priority,
            date: filterEdit.date,
            color: filterEdit.color,
            completed: filterEdit.completed,
        }
        : {
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

    const handleSubmit = async (values) => {
        let obj = {
            ...values, id: editId
        }
        await dispatch(editTodo({ editId, obj }))
        await closeEditModal()
        // dispatch(edittodo({ id, values }))   
    }

    const colorStyle = {    
        color: mode === 'dark' ? '#fff' : '#333'
    }

    return (
        <>
            <div>
                {editModalOpen && (
                    <div className="editmodal-overlay" onClick={closeEditModal}>
                        <div className="editmodal-content" style={{ backgroundColor: mode === 'dark' ? '#212121' : '#fff' }} onClick={(e) => e.stopPropagation()}>
                            <div className='close_editmodal d-flex'>
                                <div className='edittitle mb-3' style={colorStyle}>Edit</div>
                                <img className='close_icon' onClick={closeEditModal} src={mode === 'dark' ? close_icon : cros_icon} alt="logo"></img>
                            </div>
                            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                                {({ setFieldValue, errors, touched }) => (
                                    <>
                                        <Form>
                                            <div className='h-12'>
                                                <Field type='text' id="title" name='title' placeholder="Title" style={colorStyle} className='input_editmodal d-flex mb-2'></Field>
                                                {touched.title && errors.title && <p className='mt-1 text-left' style={{ color: 'red' }}>{errors.title}</p>}
                                            </div>
                                            <div className='h-14'>
                                                <Field as="textarea" id="task" name='task' placeholder="write here" style={colorStyle} className='input_editmodal h-8 d-flex w-full'></Field>
                                                {touched.task && errors.task && <p className='mt-1 mb-0 text-left' style={{ color: 'red' }}>{errors.task}</p>}
                                            </div>
                                            <div className='input_editmodal d-flex mb-2' style={colorStyle}>Priority</div>
                                            <div className='h-18'>
                                                <div className='editpriority_select d-flex mb-2' >
                                                    <div id='all' style={{ cursor: 'pointer', border: mode === "dark" ? 'none' : '1px solid #000' }} onClick={(e) => setFieldValue("priority", e.target.id)} className='editpriority_button1'>All</div>
                                                    <div id='low' style={{ cursor: 'pointer', border: mode === "dark" ? 'none' : '1px solid #000' }} onClick={(e) => setFieldValue("priority", e.target.id)} className='editpriority_button1'>Low</div>
                                                    <div id='high' style={{ cursor: 'pointer', border: mode === "dark" ? 'none' : '1px solid #000' }} onClick={(e) => setFieldValue("priority", e.target.id)} className='editpriority_button2'>High</div>
                                                    <div id='medium' style={{ cursor: 'pointer', border: mode === "dark" ? 'none' : '1px solid #000' }} onClick={(e) => setFieldValue("priority", e.target.id)} className='editpriority_button3'>Medium</div>
                                                </div>

                                            </div>
                                            <div className='h-24'>
                                                <div className='input_editmodal d-flex mb-2' style={colorStyle}>Date</div>
                                                <div className='date_editmodal d-flex mb-1'>
                                                    <Field className='input_editmodal d-flex mb-1 w-28' style={colorStyle} type="date" name="date" id="date" ></Field>
                                                </div>
                                                {touched.date && errors.date && <p className='mt-1 text-left' style={{ color: 'red' }}>{errors.date}</p>}
                                            </div>
                                            <div className='h-14'>
                                                <div className='footer_editmodal d-flex mb-1'>
                                                    <div className='priority_colorr d-flex'>
                                                        <div className='hover:border-2 border-black color_priority' type='button' id='#FFF' style={{
                                                            backgroundColor: '#FFF', cursor: 'pointer',
                                                            borderRadius: '50%', height: '20px', width: '20px', transition: 'background-color 0.1s ease',
                                                        }} onClick={(e) => setFieldValue("color", e.target.id)}
                                                            onMouseOver={(e) => {
                                                                e.target.style.backgroundColor = '#E0E0E0';
                                                            }}
                                                            onMouseOut={(e) => {
                                                                e.target.style.backgroundColor = '#FFF';
                                                            }}
                                                        ></div>
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
                                                        <div className='hover:border-2 border-black color_priority' type='button' id='#B3DFF6' style={{
                                                            backgroundColor: '#B3DFF6', cursor: 'pointer',
                                                            borderRadius: '50%', height: '20px', width: '20px', opacity: '1', transition: 'background-color 0.1s ease',
                                                        }} onClick={(e) => setFieldValue("color", e.target.id)}
                                                            onMouseOver={(e) => {
                                                                e.target.style.opacity = '0.7';
                                                            }}
                                                            onMouseOut={(e) => {
                                                                e.target.style.opacity = '1';
                                                            }}></div>
                                                        <div className='hover:border-2 border-black color_priority' type='button' id='#EBDCFE' style={{
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
                                                {touched.color && errors.color && <p className='text-left mb-1' style={{ color: 'red' }}>{errors.color}</p>}
                                            </div>
                                            <button type='submit' className='send_editbutton d-flex'>
                                                Save
                                            </button>
                                        </Form>
                                    </>
                                )}
                            </Formik>
                        </div>
                    </div>
                )}
            </div></>
    )
}

export default EditModal