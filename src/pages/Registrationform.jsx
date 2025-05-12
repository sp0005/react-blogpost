import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fields = [
  { name: 'name', label: 'Username', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
];

const validationSchema = Yup.object({
  name: Yup.string()
    .min(4, 'Minimum 4 characters')
    .max(40, 'Must be 40 characters or less')
    .required('This field is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required.'),
  password: Yup.string()
    .min(8, 'Minimum 8 characters')
    .max(30, 'Maximum 30 characters')
    .required('Password is required.'),
});

const Registrationform = () => {
  const navigate = useNavigate();

  const postFormData = async (values, actions) => {
    try {
      const res = await axios.post("https://blog-hqx2.onrender.com/user/register", values);
      toast.success("User registered successfully");
      actions.resetForm();
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      const msg = error?.response?.data?.message || "Registration error";
      toast.error(msg);
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-400 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={postFormData}
        >
          <Form className="space-y-5">
            {fields.map(({ name, label, type }) => (
              <div key={name}>
                <label htmlFor={name} className="block font-medium text-gray-700">
                  {label}
                </label>
                <Field
                  name={name}
                  id={name}
                  type={type}
                  className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
              </div>
            ))}

            <ToastContainer />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Sign Up
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 rounded-md transition"
              onClick={() => toast.info("Google login coming soon")}
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>

            <p className="text-center text-sm mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Registrationform;