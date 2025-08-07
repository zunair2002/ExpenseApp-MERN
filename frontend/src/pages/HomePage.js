import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import Analytics from "../components/Analytics";
import "../App.css";

const initialFormState = {
  amount: "",
  category: "food",
  reference: "expense",
  description: "",
  date: "",
};

const HomePage = () => {
  const navigate = useNavigate();
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");
  const [alldata, setAlldata] = useState([]);
  const [typeFilter, setTypeFilter] = useState("all");
  const [analytics, setAnalytics] = useState(false);
  const [values, setValues] = useState(initialFormState);
  const [editable, setEditable] = useState(null);

  const getAlldata = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.post(
        `/api/v1/transaction/getdata`,
        { userid: user._id }
      );
      setAlldata(response.data);
    } catch (err) {
      console.error("API Error while fetching data:", err);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    } else {
      getAlldata();
    }
  }, [navigate,getAlldata]);

  const handleDelete = async (transactionId) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await axios.post(
          `/api/v1/transaction/deletedata`,
          { transactionId } 
        );
        setMessage("Transaction Deleted Successfully!");
        setMessageType("success");
        getAlldata(); 
      } catch (err) {
        setMessage("Failed to delete transaction.");
        setMessageType("danger");
      }
    }
  };

  const toggleAnalytics = () => setAnalytics(!analytics);

  const hideModal = () => {
    setIsModalVisible(false);
    setEditable(null);
    setValues(initialFormState);
    setMessage(null);
  };

  const handleAddClick = () => {
    setEditable(null);
    setValues(initialFormState);
    setIsModalVisible(true);
  };

  const handleEditClick = (transaction) => {
    setEditable(transaction);
    setValues({
        amount: transaction.amount,
        category: transaction.category,
        reference: transaction.reference,
        description: transaction.description,
        date: new Date(transaction.date).toISOString().split('T')[0],
    });
    setIsModalVisible(true);
  };

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.amount <= 0 || !values.date || !values.description) {
      setMessageType("danger");
      setMessage("Please fill all fields correctly.");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) {
          setMessage("Login error. Please log out and log back in.");
          setMessageType("danger");
          return;
      }

      if (editable) {
        await axios.post(`/api/v1/transaction/editData`, {
            payload: values,
            transactionId: editable._id
        });
        setMessage("Transaction Updated Successfully!");
      } else {
        await axios.post(`/api/v1/transaction/adddata`, {
             ...values, 
             userid: user._id 
        });
        setMessage("Transaction Added Successfully!");
      }

      setMessageType("success");
      getAlldata();
      setTimeout(hideModal, 1000); 

    } catch (err) {
      setMessageType("danger");
      setMessage("An error occurred. Please try again!");
      console.error("Submit Error:", err);
    }
  };

  const filteredData = alldata.filter((transaction) => {
    if (typeFilter === "all") return true;
    return transaction.reference === typeFilter;
  });

  return (
    <Layout>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-white p-3 mb-4 rounded shadow-sm">
        <div className="d-flex align-items-center mb-3 mb-md-0">
          <h5 className="mb-0 me-3 d-none d-lg-block">Filters:</h5>
          <select
            className="form-select"
            style={{ width: "auto" }}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Transactions</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="d-flex gap-2">
          <button
            className={`btn ${analytics ? "btn-dark" : "btn-outline-dark"}`}
            onClick={toggleAnalytics}
          >
            <i className="bi bi-pie-chart-fill me-2"></i>Analytics
          </button>
          <button className="btn btn-outline-dark fw-bold" onClick={handleAddClick}>
            <i className="bi bi-plus-circle-fill me-2"></i>Add Record
          </button>
        </div>
      </div>

      {analytics ? (
        <Analytics transactions={alldata} />
      ) : (
        <div className="bg-white p-3 rounded shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Type</th>
                  <th scope="col">Category</th>
                  <th scope="col">Description</th>
                  <th scope="col">Actions</th> 
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((transaction) => (
                    <tr key={transaction._id}>
                      <td>{new Date(transaction.date).toLocaleDateString()}</td>
                      <td className={transaction.reference === "income" ? "text-success" : "text-danger"}>
                        {transaction.reference === "income" ? "+" : "-"} ${transaction.amount}
                      </td>
                      <td>
                        <span className={`badge ${transaction.reference === "income" ? "bg-success-subtle text-success-emphasis" : "bg-danger-subtle text-danger-emphasis"}`}>
                          {transaction.reference}
                        </span>
                      </td>
                      <td>{transaction.category}</td>
                      <td>{transaction.description}</td>
                      <td>
                        <div className="d-flex">
                            <button className="btn btn-sm btn-outline-success" onClick={() => handleEditClick(transaction)}>
                                Edit
                            </button>
                            <button className="btn btn-sm btn-outline-danger ms-2" onClick={() => handleDelete(transaction._id)}>
                               Delete
                            </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-5">
                      <h4 className="text-muted">No transactions found.</h4>
                      <p className="text-muted">Click "Add Record" to get started!</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {isModalVisible && (
        <>
          <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{editable ? 'Edit Transaction' : 'Add New Transaction'}</h5>
                  <button type="button" className="btn-close" onClick={hideModal}></button>
                </div>
                   <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            {message && (
                                <div className={`alert alert-${messageType}`} role="alert">
                                    {message}
                                </div>
                            )}
                            <div className="mb-3">
                                <label htmlFor="amount" className="form-label">Amount</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="amount"
                                    value={values.amount}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g., 150"
                                />
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="reference" className="form-label">Type</label>
                                    <select
                                        className="form-select"
                                        name="reference"
                                        value={values.reference}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="expense">Expense</option>
                                        <option value="income">Income</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select
                                        className="form-select"
                                        name="category"
                                        value={values.category}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="food">Food</option>
                                        <option value="bills">Bills</option>
                                        <option value="salary">Salary</option>
                                        <option value="movie">Movie</option>
                                        <option value="medical">Medical</option>
                                        <option value="fee">Fee</option>
                                        <option value="side-work">Side Work</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    value={values.description}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g., Lunch with colleagues"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label">Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="date"
                                    value={values.date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={hideModal}
                            >
                                Close
                            </button>
                            <button type="submit" className="btn btn-dark">
                                Save Transaction
                            </button>
                        </div>
                    </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </Layout>
  );
};

export default HomePage;