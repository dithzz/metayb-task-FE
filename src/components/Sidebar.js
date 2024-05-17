import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch
import { logoutUser } from '../redux/actions/authActions';

const Sidebar = () => {
  const auth = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  // Function to handle logout
  const handleLogout = async () => {
    dispatch(logoutUser(auth?.user, auth?.tokens?.refresh?.token , auth?.tokens?.access?.token)); 
  navigate('/');
  };

  // Conditional rendering based on user role
  const renderSidebar = () => {
    if (auth && auth?.user?.role === 'admin') {
      return (
        <div>
          <h5 className="mb-4">Metayb Task</h5>
          <ul className="list-unstyled">
            <li>
              <Link to="/admin/dashboard" className="text-light">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/employers" className="text-light">Employers</Link>
            </li>
            <li>
              <Link to="/admin/painting-jobs" className="text-light">Painting Jobs</Link>
            </li>
          </ul>
        </div>
      );
    } else {
      // For users with role "user", don't render the sidebar
      return (
        <div>
          <h5 className="mb-4">Metayb Task</h5>
          <ul className="list-unstyled">
            <li>
              <Link to="/portal/painting-jobs" className="text-light">Painting Jobs</Link>
            </li>
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="sidebar d-flex flex-column justify-content-between bg-dark text-light p-3">
      {renderSidebar()}
      <div>
        {/* Logout Button */}
        <button onClick={handleLogout} className="btn btn-light">Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
