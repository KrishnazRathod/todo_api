import React from 'react';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from "formik";
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import './signup.css'
import './test.css'
import frame from '..//assets/Frame.svg'
import frame_light from '..//assets/frame_light.svg'
import password_icon from '..//assets/password_icon.svg'
import img from '..//assets/b1ccc453-6fbb-40be-a697-fe99254618a8 1.svg'

function Signup() {
  const mode = useSelector((state) => state.modeSlice.color);
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    rememberMe: '',
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required('Please enter name'),
    email: yup.string().email('').required('Please enter email'),
    password: yup.string().required('Please enter password'),
    rememberMe: yup.boolean(),
  })

  const setVisibility = () => {
    const passwordField = document.querySelector("#password");
    if (passwordField.getAttribute("type") === "password") {
      passwordField.setAttribute("type", "text")
    }
    else {
      passwordField.setAttribute("type", "password");
    }
  }

  const handleSubmit = (values, { resetForm }) => {
    
    localStorage.setItem('user', JSON.stringify({...values,isAuth:true}))
    toast.success("Signup Successful", {
      onClose: () => {
        navigate('/home')
      }
    })
    resetForm();
  }

  const responseMessage = () => {
    navigate("/home")
  };
  const errorMessage = (error) => {
    console.error(error);
  };

  const colorStyle = {
    color: mode === 'dark' ? '#fff' : '#333'
  }

  const backgroundStyle = {
    backgroundColor: mode === 'dark' ? '#101213' : '#fff'
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className='signup_body' style={backgroundStyle}>
        <div className='box_1_signup'>
          <div><img className='signup1_img' src={img} alt=''></img>
          </div>
        </div>
        <div className='box_2_signup'>
          <div className='w-full'>
            <div className=' flex items-center justify-items-start space-x-4 lg:mb-3 sm:mb-1'>
              <div className=''>
                <img className='frame_signup' src={mode === 'dark' ? frame : frame_light} alt=''></img>
              </div>
              <h1 className='font-poppins text-left font-bold todo_text_signup' style={colorStyle}>To-Do List</h1>
            </div>
            <div className='title_container_signup'>
              <h1 className='font-poppins text-left font-semibold title_signup ' style={colorStyle}>Signup to access</h1>
              <h1 className='font-poppins text-left font-semibold title_signup ' style={colorStyle}>TO-DO List</h1>
            </div>
            <div className=''>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ errors, touched }) => (
                  <>
                    <Form className="mb-2 form_signup ">
                      <div className="lg:mb-4 sm:mb-2">
                        <label htmlFor="username" className="block text-sm font-semibold text-gray-600" style={colorStyle}>Name</label>
                        <Field type="text" id="username" placeholder='Name' name="name" style={colorStyle} className="mt-1 p-2 w-full h-12 field_height_signup  border-1 bg-transparent border-gray-500"></Field>
                        {touched.name && errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                      </div>
                      <div className="lg:mb-4 sm:mb-2">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-600" style={colorStyle}>Email</label>
                        <Field type="email" id="email" placeholder='example@gmail.com' name="email" style={colorStyle} className="mt-1 p-2 w-full h-12 border-1 field_height_signup bg-transparent border-gray-500"></Field>
                        {touched.email && errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                      </div>
                      <div className="mb-2 relative">
                        <img className='w-665 h-724 absolute password_icon_signup' src={password_icon} alt='' onClick={setVisibility}></img>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-600 " style={colorStyle}>Password</label>
                        <Field type="password" id="password" name="password" placeholder='Password' style={colorStyle} className="mt-1 p-2 w-full h-12 field_height_signup  border-1 bg-transparent border-gray-500" ></Field>
                        {touched.password && errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                      </div>
                      <div className='flex justify-between w-full lg:mb-4 sm:mb-2'>
                        <div className='flex '>
                          <div className='m-1'>
                            <Field style={{ borderColor: '#FF9D98', color: mode === 'light' ? '#fff' : '#333' }} type="checkbox" id="checkbox" name='rememberMe' className="p-2 checkbox_signup border-1"></Field>
                          </div>
                          <div className=''>
                            <h1 className='font-semibold font-dm-sans remember_me_signup ' style={colorStyle}>Accept Term condition & privacy policy</h1>
                          </div>
                        </div>
                      </div>
                      <button type='submit' className='flex justify-center submit_btn_signup  w-full field_height_signup cursor-pointer'>
                        <h1  className='self-center font-dm-sans font-semibold text-base'>Sign up</h1>
                      </button>
                    </Form>
                  </>
                )}
              </Formik>
              <div className='flex justify-center or_container_signup '>
                <h1 className='self-center or_text_signup' style={colorStyle}>or</h1>
              </div>
              <div className='flex justify-center w-full lg:h-12 sm:h-8  '>
                {/* <img style={{left:"32%"}} className='absolute top-3 absolute' src={google_icon} alt=''></img> */}
                {/* <div type="submit" className='self-center ml-10 font-bold text-base '>Signin with Google</div> */}
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
              </div>
              <div className='flex '>
                <h1 className='dont_container_signup' style={colorStyle}>Already have an account? </h1>
                <Link className="ml-1 flex items-center font-semibold font-dm-sans text-sm link_color_signup dont_container_signup underline" to='/login'> Signin</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup