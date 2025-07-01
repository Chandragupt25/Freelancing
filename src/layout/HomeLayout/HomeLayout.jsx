import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import '../HomeLayout/HomeLayout.css';
import Navbar from './Navbar';
import Footer from './Footer';
import Video from '../../Pages/Video';

const HomeLayout = () => {
  const location = useLocation();

  const showVideo = ['/', '/login', '/register'].includes(location.pathname);

  return (
    <div className="layout-container">
      <Navbar />
      <main className="main-content">
        {showVideo && <Video />}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
