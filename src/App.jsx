import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registrationform from './pages/Registrationform';
import Loginform from './pages/Loginform';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import CreateBlog from './pages/CreateBlog';
import Dasgboarad from './pages/Dasgboarad';
import Footer from './components/Footer'; 

function App() {
  return (
    <Router>
      <Routes>
      <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <Dasgboarad />
            </ProtectedRoute>
          }
        />
         <Route path="create-blog" element={
          <ProtectedRoute>
            <CreateBlog />
          </ProtectedRoute>
         } />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Loginform />} />
        <Route path="/register" element={<Registrationform />} />
      </Routes>
    </Router>
  );
}

export default App;