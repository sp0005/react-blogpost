import { Field, Form, Formik } from "formik";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const CreateBlog = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  // Validation schema with Yup
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
  });

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    if (image) formData.append("image", image);
    formData.append("author", user?._id);

    try {
      await axios.post("https://blog-hqx2.onrender.com/blog/create", formData);
      navigate("/"); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Create a New Blog</h1>
      <Formik
        initialValues={{ title: "", content: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-lg font-semibold mb-1 text-gray-700">
                Title
              </label>
              <Field
                type="text"
                name="title"
                placeholder="Enter blog title"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.title && touched.title && (
                <div className="text-red-500 text-sm">{errors.title}</div>
              )}
            </div>

            <div>
              <label htmlFor="content" className="block text-lg font-semibold mb-1 text-gray-700">
                Content
              </label>
              <Field
                as="textarea"
                name="content"
                placeholder="Enter blog content"
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.content && touched.content && (
                <div className="text-red-500 text-sm">{errors.content}</div>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">Upload Image</label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              />
            </div>

            {imagePreview && (
              <div className="mt-4 text-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-full h-64 object-cover mx-auto border-2 rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="mt-2 text-sm text-red-500 hover:text-red-700"
                >
                  Remove Image
                </button>
              </div>
            )}

            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
              >
                Submit Blog
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBlog;