const Footer = () => {
  return (
    <footer className="w-full mt-10 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-sm">
        <p className="text-center md:text-left mb-2 md:mb-0">
          &copy; {new Date().getFullYear()} My Blog App. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;