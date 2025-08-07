const express = require("express");
const { logincontroller, registercontroller } = require("../controllers/usercontroller");

// route object
const router = express.Router();

// routes
// POST | LOGIN
router.post("/login", logincontroller);

// POST | REGISTER
router.post("/register", registercontroller);

// export
module.exports = router;