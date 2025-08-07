import React from 'react';

const Footer = () => {
  return (

    <footer className="bg-dark text-white py-3">
      <div className="container-fluid">
        <div className="row">
            <p className="mb-0 text-center">© {new Date().getFullYear()} ExpenseTracker. All rights reserved.</p>
          </div>
          </div>
    </footer>
  );
};

export default Footer;