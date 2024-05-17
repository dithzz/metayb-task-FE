import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes,  useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'; // Import CSS file for styling
import LoginPage from './pages/LoginPage';
import Sidebar from './components/Sidebar';
import RegisterPage from './pages/RegisterPage';
import EmployersPage from './pages/EmployersPage';
import { useSelector } from 'react-redux';
import PaintingPage from './pages/PaintingPage';
import JobPage from './pages/JobPage';
import DashboardPage from './pages/DashboardPage';


const App = () => {
  const isLoggedIn = useSelector((state) => state?.auth?.user)
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to '/admin' if user is logged in
    if (isLoggedIn?.tokens?.access?.token ) {
      if(isLoggedIn?.user?.role === 'admin'){
        navigate('/admin/employers');
      } else if(isLoggedIn?.user?.role === 'user'){
        navigate('/portal/painting-jobs');
      }
    } else {
      navigate('/login');
    }
  }, [isLoggedIn?.tokens?.access?.token, isLoggedIn?.user?.role]);

  return (<>
      <div className="app-container d-flex">
        {isLoggedIn?.tokens?.access?.token && <Sidebar />}
        <div className="page-content flex-grow-1">
          <Routes>
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route  path="/admin/employers" element={<EmployersPage />} />
            <Route  path="/admin/dashboard" element={<DashboardPage />} />
            <Route  path="/admin/painting-jobs" element={<PaintingPage />} />
            <Route  path="/portal/painting-jobs" element={<JobPage />} />
            {/* Add more routes for other pages */}
          </Routes>
        </div>
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /></>
  );
};

export default App;
