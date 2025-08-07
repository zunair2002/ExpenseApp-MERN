import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [values, setValues] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (location.state?.message) {
            setSuccessMessage(location.state.message);
        }
    }, [location.state]);
    
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
        setSuccessMessage(null);
        setLoading(true);
        try {
            const { data } = await axios.post('http://localhost:8000/api/v1/user/login', values);
            localStorage.setItem('user', JSON.stringify({ ...data.user, password: "" }));
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || "Invalid Email or Password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            className="d-flex justify-content-center align-items-center min-vh-100" 
            style={{ background: '#f0f2f5' }} 
        >
            <div 
                className="login-form-container bg-white p-4 p-md-5 rounded-3 shadow-lg w-100" 
                style={{ maxWidth: '450px' }}
            >
                <form onSubmit={handleSubmit}>
                    <h1 className="text-center fw-bold mb-4 welcome-heading fs-3">Welcome Back!</h1>
                    
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}

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
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary w-100 btn-lg fw-bold auth-btn" disabled={loading}>
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Logging in...
                            </>
                        ) : 'Login'}
                    </button>
                    
                    <p className="text-center mt-4 auth-link-text">
                        Don't have an account? <Link to="/registration">Register here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;