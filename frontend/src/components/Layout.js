import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Navbar import karein
import Footer from './Footer'; // Footer import karein

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
       
        <div 
            className="d-flex flex-column min-vh-100" 
            style={{ background: 'linear-gradient(135deg, #ffffffff, #ffffffff)' }}
        >
            <header>
                <Navbar user={user} onLogout={handleLogout} />
            </header>

            <main className="container-fluid flex-grow-1 mt-4">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;