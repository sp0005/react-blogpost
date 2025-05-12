import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("https://blog-hqx2.onrender.com/blog");
      const data = await response.json();
      setBlogs(data.blogs || data);
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Discover Blog Posts
        </h1>

        <Link to="/create-blog">
          <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition">
            <PlusCircleIcon className="h-5 w-5" />
            Create Blog
          </button>
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {filteredBlogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              onClick={() => navigate(`/singleAllBlogPage/${blog._id}`)}
              className="bg-white cursor-pointer rounded-xl shadow hover:shadow-2xl transition duration-300 flex flex-col"
            >
              {blog.image ? (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-52 object-cover rounded-t-xl"
                />
              ) : (
                <div className="w-full h-52 bg-gray-100 flex items-center justify-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
              <div className="p-5 flex flex-col flex-grow">
                <h2
                  className="text-lg font-bold text-gray-800 truncate hover:text-blue-600"
                  title={blog.title}
                >
                  {blog.title}
                </h2>
                <div className="text-sm text-gray-500 my-1">
                  By <span className="font-semibold">{blog.author?.name || "Unknown"}</span> •{" "}
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3 flex-grow">
                  {blog.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center text-lg">No blogs found.</p>
      )}
    </div>
  );
};

export default Home;