# Expense Tracker - MERN Stack Application

This is a dynamic, full-stack expense tracker application built from the ground up using the MERN (MongoDB, Express.js, React, Node.js) stack. The backend, powered by a Node.js and Express server, exposes a RESTful API to handle all business logic, while the frontend is a responsive Mutiple-Page Application (MPA) built with React for a fast and interactive user interface. It allows users to securely register for an account, log in with authentication **(Local storage)**, and subsequently manage their finances by tracking their daily income and expenses in real-time.

**Live Demo Link:** [https://your-live-app-url.com](https://your-live-app-url.com)  *(Add your deployment link here, or remove this line)*

---

## 📸 Screenshots

## | Login Page | 


<img width="400" height="500" alt="SS 3" src="https://github.com/user-attachments/assets/e4cbaed4-7316-41fa-bc53-630a44da9a89" />

## | Dashboard |


<img width="400" height="500" alt="SS 2" src="https://github.com/user-attachments/assets/961dd38a-c425-4fbe-b6e2-a3e075d3a157" />

## | Add Transaction Modal |


<img width="400" height="500" alt="SS 1" src="https://github.com/user-attachments/assets/081a2405-a689-4d55-a920-852948fbd0ee" />

---

## 🚀 Features

-   Secure user authentication **(Login/Register)** using JWT.
-   Full CRUD functionality to Add, Edit, and Delete transactions.
-   Filter transactions by type **(Income/Expense)** and by date range.
-   Interactive dashboard to view all transactions in a clean table.
-   Visual analytics page with progress bars to see **income vs. expense** breakdown.
-   Fully responsive design that works on mobile and desktop devices.

---

## 💻 Tech Stack

-   **Frontend:** React, Ant Design (AntD), React Router, Axios
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB (with Mongoose for object data modeling)
-   **Authentication:** JSON Web Tokens (JWT)

---

## 🛠️ Setup and Installation

To run this project on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/zunair2002/ExpenseApp-MERN.git
    ```

2.  **Navigate to the project directory and install root dependencies:**
    ```bash
    cd (your root name)
    npm install
    ```

3.  **Install frontend dependencies:**
    ```bash
    npm install --prefix frontend
    ```

4.  **Install backend dependencies:**
    ```bash
    npm install --prefix backend
    ```

5.  **Create a `.env` file in the `backend` folder:**
    -   Inside the `backend` folder, create a new file named `.env`.
    -   Add your MongoDB Connection String to this file.
    ```
    MONGO_URL=your_mongodb_connection_string
    ```

6.  **Start the development server:**
    ```bash
    npm run dev
    ```
