import React, { useEffect } from "react";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "./login.css";
import frame from "../assets/Frame.svg";
import frame_light from "..//assets/frame_light.svg";
import password_icon from "..//assets/password_icon.svg";
import img from "..//assets/b1ccc453-6fbb-40be-a697-fe99254618a8 1.svg";

function Login() {
  const user = JSON.parse(localStorage.getItem("user"));
  const mode = useSelector((state) => state.modeSlice.color);

  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email("").required("Please enter email"),
    password: yup.string().required("Please enter password"),
    rememberMe: yup.boolean(),
  });

  const setVisibility = () => {
    const passwordField = document.querySelector("#password");
    if (passwordField.getAttribute("type") === "password") {
      passwordField.setAttribute("type", "text");
    } else {
      passwordField.setAttribute("type", "password");
    }
  };

  const handleSubmit = (values, { resetForm }) => {
    if (values.email === user.email && values.password === user.password) {
      toast.success("Login Successful", {
        onClose: () => {
          navigate("/home");
        },
      });
    } else {
      toast.error("Login Failed");
    }

    if (values.rememberMe) {
      localStorage.setItem("RememberedEmail", values.email);
      localStorage.setItem("RemberedPassword", values.password);
    } else {
      localStorage.removeItem("RememberedEmail");
      localStorage.removeItem("RemberedPassword");
    }
    resetForm();
  };

  const responseMessage = () => {
    toast.success("Login Successful", {
      onClose: () => {
        navigate("/home");
      },
    });
  };
  const errorMessage = () => {
    toast.error("Login Failed");
  };

  const colorStyle = {
    color: mode === "dark" ? "#fff" : "#333",
  };

  const backgroundStyle = {
    backgroundColor: mode === "dark" ? "#101213" : "#fff",
  };

  const setRememberValues = () => {
    const rememberedEmail = localStorage.getItem("RemeberedEmail");
    const rememberedPassword = localStorage.getItem("RemeberedPassword");

    if (rememberedEmail && rememberedPassword) {
      initialValues.email = rememberedEmail;
      initialValues.password = rememberedPassword;
      initialValues.rememberMe = true;
    }
  };

  useEffect(() => {
    setRememberValues();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="login_body" style={backgroundStyle}>
        <div className="box_1_login">
          <div>
            <img className="login1_img" src={img} alt=""></img>
          </div>
        </div>
        <div className="box_2_login">
          <div className="w-full">
            <div className=" flex items-center justify-items-start space-x-4 lg:mb-3 sm:mb-1">
              <div className="">
                <img
                  className="frame_login"
                  src={mode === "dark" ? frame : frame_light}
                  alt=""
                ></img>
              </div>
              <h1
                className="font-poppins text-left font-bold todo_text_login"
                style={colorStyle}
              >
                To-Do List
              </h1>
            </div>
            <div className=" title_container_login">
              <h1
                className="font-poppins text-left font-semibold title_login "
                style={colorStyle}
              >
                Login to access
              </h1>
              <h1
                className="font-poppins text-left font-semibold title_login  "
                style={colorStyle}
              >
                TO-DO List
              </h1>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, values, resetForm, setSubmitting, touched }) => (
                <>
                  <Form className="mb-2 form_login">
                    <div className="lg:mb-2 sm:mb-2 ">
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-600 "
                        style={colorStyle}
                      >
                        Email
                      </label>
                      <Field
                        type="email"
                        id="email"
                        placeholder="example@gmail.com"
                        name="email"
                        value={values.email}
                        style={colorStyle}
                        className="mt-1 p-2 w-full h-12 field_height_login  border-1 bg-transparent border-gray-500"
                      ></Field>
                      {touched.email && errors.email && (
                        <p style={{ color: "red" }}>{errors.email}</p>
                      )}
                    </div>
                    <div className="mb-2 relative">
                      <img
                        className="w-665 h-724 absolute password_icon_login"
                        src={password_icon}
                        alt=""
                        onClick={setVisibility}
                      ></img>
                      <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gray-600 "
                        style={colorStyle}
                      >
                        Password
                      </label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={values.password}
                        className="mt-1 p-2 w-full h-12 border-1 field_height_login bg-transparent border-gray-500"
                        style={colorStyle}
                      ></Field>
                      {touched.password && errors.password && (
                        <p style={{ color: "red" }}>{errors.password}</p>
                      )}
                    </div>
                    <div className="flex justify-between w-full lg:mb-3 sm:mb-1 ">
                      <div className="flex ">
                        <div className="m-1">
                          <Field
                            checked={values.rememberMe}
                            style={{ borderColor: "#FF9D98" }}
                            type="checkbox"
                            id="checkbox"
                            name="rememberMe"
                            className="p-2 checkbox_login_login border-1 "
                          ></Field>
                        </div>
                        <div className="">
                          <h1
                            className=" ml-1 font-semibold font-dm-sans remember_me_login"
                            style={{ color: mode === "dark" ? "#fff" : "#333" }}
                          >
                            Remember Me
                          </h1>
                        </div>
                      </div>
                      <Link
                        className="mr-1 mt-1 font-semibold font-dm-sans forget_password_login underline"
                        to="/forget_password_login"
                      >
                        Forget password?
                      </Link>
                    </div>
                    <div className="flex justify-center w-full h-12 submit_btn_login cursor-pointer">
                      <button
                        type="submit"
                        className="self-center font-dm-sans font-semibold text-base"
                      >
                        Sign in
                      </button>
                    </div>
                  </Form>
                </>
              )}
            </Formik>
            <div className="flex justify-center or_container">
              <h1 className="self-center or_text_login" style={colorStyle}>
                or
              </h1>
            </div>
            <div className="flex justify-center w-full lg:h-12 sm:h-8">
              {/* <img style={{left:"32%"}} className='absolute top-3 absolute' src={google_icon} alt=''></img> */}
              {/* <div type="submit" className='self-center ml-10 font-bold text-base '>Signin with Google</div> */}
              <GoogleLogin
                className="self-center ml-10 font-bold text-base "
                onSuccess={responseMessage}
                onError={errorMessage}
              />
            </div>
            <div className="flex">
              <h1 className="dont_container_login" style={colorStyle}>
                Don’t have an account?{" "}
              </h1>
              <Link
                className="flex items-center mt-0 ml-1 dont_container_login font-semibold font-dm-sans link_color_login underline"
                to="/"
              >
                {" "}
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
