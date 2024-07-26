// import React from 'react';
// import * as yup from 'yup';
// import { useSelector } from 'react-redux';
// import { Formik, Form, Field } from "formik";
// import 'react-toastify/dist/ReactToastify.css';
// import { GoogleLogin } from "@react-oauth/google";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';

// import './signup.css'
// import frame from '..//assets/Frame.svg'
// import frame_light from '..//assets/frame_light.svg'
// import password_icon from '..//assets/password_icon.svg'
// // import google_icon from '..//assets/Google - Original.svg'
// import img from '..//assets/b1ccc453-6fbb-40be-a697-fe99254618a8 1.svg'

// import './test.css'

// function Test() {

//   const mode = useSelector((state) => state.modeSlice.color);
//   const navigate = useNavigate();

//   const initialValues = {
//     name: '',
//     email: '',
//     password: '',
//     rememberMe: '',
//   }

//   const validationSchema = yup.object().shape({
//     name: yup.string().required('Please Enter Name'),
//     email: yup.string().email('').required('Please Enter Email'),
//     password: yup.string().required('Please Enter Password'),
//     rememberMe: yup.boolean(),
//   })

//   const setVisibility = () => {
//     const passwordField = document.querySelector("#password");
//     if (passwordField.getAttribute("type") === "password") {
//       passwordField.setAttribute("type", "text")
//     }
//     else {
//       passwordField.setAttribute("type", "password");
//     }
//   }

//   const handleSubmit = (values, { resetForm }) => {
//     localStorage.setItem('user', JSON.stringify(values))
//     toast.success("Signup Successful", {
//       onClose: () => {
//         navigate('/home')
//       }
//     })
//     resetForm();
//   }

//   const responseMessage = (response) => {
//     navigate("/home")
//   };
//   const errorMessage = (error) => {
//     console.log(error);
//   };

//   const colorStyle = {
//     color: mode === 'light' ? '#fff' : '#333'
//   }

//   const backgroundStyle = {
//     backgroundColor: mode === 'light' ? '#101213' : '#fff'
//   }

//   return (
//     <>
//       <div className='signup_body' style={backgroundStyle}>
//         <div className='box_1'>
//           <div><img className='signup1_img' src={img} alt=''></img>
//           </div>
//         </div>
//         <div className='box_2'>
//           <div className='w-full'>
//             <div className=' flex items-center justify-items-start space-x-4 lg:mb-3 sm:mb-1'>
//               <div className=''>
//                 <img className='frame_signup' src={mode === 'light' ? frame : frame_light} alt=''></img>
//               </div>
//               <h1 className='font-poppins text-left font-bold todo_text' style={colorStyle}>To-Do List</h1>
//             </div>
//             <div className=' title_container'>
//               <h1 className='font-poppins text-left font-semibold title_signup ' style={colorStyle}>Login to access</h1>
//               <h1 className='font-poppins text-left font-semibold title_signup  ' style={colorStyle}>TO-DO List</h1>
//             </div>

//             <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
//               {({ errors, values, resetForm, setSubmitting, touched }) => (
//                 <>
//                   <Form className="mb-2 form_signup">
//                     <div className="lg:mb-2 sm:mb-2 ">
//                       <label htmlFor="email" className="block text-sm font-semibold text-gray-600 " style={colorStyle}>Email</label>
//                       <Field type="email" id="email" placeholder='example@gmail.com' name="email" value={values.email} style={colorStyle} className="mt-1 p-2 w-full h-12 field_height  border-1 bg-transparent border-gray-700"></Field>
//                       {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
//                     </div>
//                     <div className="mb-2 relative">
//                       <img className='w-665 h-724 absolute top-10 right-3' src={password_icon} alt='' onClick={setVisibility}></img>
//                       <label htmlFor="password" className="block text-sm font-semibold text-gray-600 " style={colorStyle}>Password</label>
//                       <Field type="password" id="password" name="password" placeholder='Password' value={values.password} className="mt-1 p-2 w-full h-12 border-1 field_height bg-transparent border-gray-700" style={colorStyle}></Field>
//                       {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
//                     </div>
//                     <div className='flex justify-between w-full lg:mb-3 sm:mb-1 '>
//                       <div className='flex '>
//                         <div className='m-1'>
//                           <Field checked={values.rememberMe} style={{ borderColor: '#FF9D98' }} type="checkbox" id="checkbox" name='rememberMe' className="p-2 checkbox_signup border-1 "></Field>
//                         </div>
//                         <div className=''>
//                           <h1 className=' ml-1 font-semibold font-dm-sans remember_me' style={{ color: mode === 'light' ? '#fff' : '#333' }}>Remember Me</h1>
//                         </div>
//                       </div>
//                       <Link className="mr-1 mt-1 font-semibold font-dm-sans text-link-1 forget_password underline" to='/forget_password'>Forget password?</Link>
//                     </div>
//                     <div className='flex justify-center w-full h-12 bg-link-1'>
//                       <button type="submit" className='self-center font-dm-sans font-semibold text-base'>Sign in</button>
//                     </div>
//                   </Form>
//                 </>
//               )}
//             </Formik>
//             <div className='flex justify-center or_container'>
//               <h1 className='self-center or_text' style={colorStyle}>or</h1>
//             </div>
//             <div className='flex justify-center w-full lg:h-12 sm:h-8'>
//               {/* <img style={{left:"32%"}} className='absolute top-3 absolute' src={google_icon} alt=''></img> */}
//               {/* <div type="submit" className='self-center ml-10 font-bold text-base '>Signin with Google</div> */}
//               <GoogleLogin className='self-center ml-10 font-bold text-base ' onSuccess={responseMessage} onError={errorMessage} />
//             </div>
//             <div className='flex  '>
//               <h1 className='dont_container' style={colorStyle}>Don’t have an account? </h1>
//               <Link className="flex items-center mt-1 ml-1 dont_container font-semibold font-dm-sans text-link-1 underline" to='/'> Create an account</Link>
//             </div>
//           </div>

//         </div>
//       </div>
//       {/* <div className='bg-link-3 min-h-screen w-screen py-16' style={backgroundStyle}>
//         <div className='flex flex-wrap justify-around mx-16 mt-10'>
//           <div className=' h-auto grid justify-items-center'>
//             <img className='login_img' src={img} alt=''></img>
//           </div>
//           <div className='  grid justify-items-center mt-10 lg:max-w-2xl box_2'>
//             <div className='w-full'>
//               <div className=' flex items-center justify-items-start space-x-4 lg:mb-3 sm:mb-1 '>
//                 <div className=''>
//                   <img className='frame_login' src={mode === 'light' ? frame : frame_light} alt=''></img>
//                 </div>
//                 <h1 className='font-poppins text-left font-bold todo_text' style={colorStyle}>To-Do List</h1>
//               </div>
//               <div className=' title_container'>
//                 <h1 className='font-poppins text-left font-semibold title_login ' style={colorStyle}>Login to access</h1>
//                 <h1 className='font-poppins text-left font-semibold title_login  ' style={colorStyle}>TO-DO List</h1>
//               </div>

//               <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
//                 {({ errors, values, resetForm, setSubmitting, touched }) => (
//                   <>
//                     <Form className="mb-2">
//                       <div className="lg:mb-2 sm:mb-2 form_field">
//                         <label htmlFor="email" className="block text-sm font-semibold text-gray-600 " style={colorStyle}>Email</label>
//                         <Field type="email" id="email" placeholder='example@gmail.com' name="email" value={values.email} style={colorStyle} className="mt-1 p-2 h-12  border-1 border-black bg-transparent border-gray-700 form_field"></Field>
//                         {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
//                       </div>
//                       <div className="mb-2 relative">
//                         <img className='w-665 h-724 absolute top-10 right-3' src={password_icon} alt='' onClick={setVisibility}></img>
//                         <label htmlFor="password" className="block text-sm font-semibold text-gray-600 " style={colorStyle}>Password</label>
//                         <Field type="password" id="password" name="password" placeholder='Password' value={values.password} className="mt-1 p-2 h-12 border-1 border-black  bg-transparent border-gray-700 form_field" style={colorStyle}></Field>
//                         {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
//                       </div>
//                       <div className='flex justify-between w-full lg:mb-3 sm:mb-1 '>
//                         <div className='flex '>
//                           <div className='m-1'>
//                             <Field checked={values.rememberMe} style={{ borderColor: '#FF9D98' }} type="checkbox" id="checkbox" name='rememberMe' className="p-2 checkbox_login border-1 "></Field>
//                           </div>
//                           <div className=''>
//                             <h1 className=' ml-1 font-semibold font-dm-sans remember_me' style={{ color: mode === 'light' ? '#fff' : '#333' }}>Remember Me</h1>
//                           </div>
//                         </div>
//                         <Link className="mr-1 mt-1 font-semibold font-dm-sans text-link-1 forget_password underline" to='/forget_password'>Forget password?</Link>
//                       </div>
//                       <div className='flex justify-center w-full h-12 bg-link-1'>
//                         <button type="submit" className='self-center font-dm-sans font-semibold text-base'>Sign in</button>
//                       </div>
//                     </Form>
//                   </>
//                 )}
//               </Formik>
//               <div className='flex justify-center or_container'>
//                 <h1 className='self-center or_text' style={colorStyle}>or</h1>
//               </div>
//               <div className='flex justify-center w-full lg:h-12 sm:h-8 lg:mb-3 sm:mb-1'>
                
//                 <GoogleLogin className='self-center ml-10 font-bold text-base ' onSuccess={responseMessage} onError={errorMessage} />
//               </div>
//               <div className='flex mt-2 '>
//                 <h1 className='dont_container' style={colorStyle}>Don’t have an account? </h1>
//                 <Link className="flex items-center mt-1 ml-1 dont_container font-semibold font-dm-sans text-link-1 underline" to='/'> Create an account</Link>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div> */}
//     </>
//   )
// }

// export default Test