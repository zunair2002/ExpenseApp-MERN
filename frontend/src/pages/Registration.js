import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

const Registration = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/');
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await axios.post('http://localhost:8000/api/v1/user/register', values);
            navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
         <div 
        className="d-flex justify-content-center align-items-center min-vh-100" 
        style={{ background: '#f0f2f5' }}
    >
        {/* Yahan .auth-form-container class istemal ki gayi hai */}
        <div 
            className="auth-form-container bg-white p-4 p-md-5 rounded-3 shadow-lg w-100" 
            style={{ maxWidth: '450px' }}
        >
            <form onSubmit={handleSubmit}>
                {/* Yahan .form-heading class istemal ki gayi hai */}
                <h1 className="text-center fw-bold mb-4 form-heading fs-3">
                    Create Account
                </h1>

                {error && <div className="alert alert-danger">{error}</div>}

                {/* Input fields mein koi tabdeeli nahi */}
                <div className="mb-3">
                    <label htmlFor="nameInput" className="form-label fw-medium">Full Name</label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-person-fill"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            id="nameInput"
                            name="name"
                            value={values.name}
                            onChange={handleInputChange}
                            placeholder="Enter name"
                            required
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label fw-medium">Email address</label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-envelope-fill"></i>
                        </span>
                        <input
                            type="email"
                            className="form-control form-control-lg"
                            id="emailInput"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            placeholder="Enter your Email"
                            required
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="passwordInput" className="form-label fw-medium">Password</label>
                    <div className="input-group">
                         <span className="input-group-text">
                            <i className="bi bi-lock-fill"></i>
                        </span>
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            id="passwordInput"
                            name="password"
                            value={values.password}
                            onChange={handleInputChange}
                            placeholder="Set your password"
                            required
                        />
                    </div>
                </div>
                
                <button 
                    type="submit" 
                    className="btn btn-primary w-100 btn-lg fw-bold auth-btn" 
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Registering...
                        </>
                    ) : 'Create Account'}
                </button>
                
                <p className="text-center mt-4 auth-link-text">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </form>
        </div>
    </div>
    );
};

export default Registration;