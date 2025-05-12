import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom'; 
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const fields = [
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
];

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required.'),
  password: Yup.string().min(8, 'Minimum 8 characters').max(30, 'Maximum 30 characters').required('Password is required.'),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (values) => {
    try {
      const response = await axios.post('https://blog-hqx2.onrender.com/user/login', values);
      toast.success("Login successful");
      login(response.data.token, response.data.user);
      navigate('/blogs');
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <Formik
          initialValues={{ email: '', password: '', remember: false }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
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

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center text-gray-700">
                <Field type="checkbox" name="remember" className="mr-2 h-4 w-4" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-200"
            >
              Log in
            </button>

            <button
              type="button"
              onClick={() => toast.info("Google login feature coming soon")}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 rounded-md transition"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>

            <p className="text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;