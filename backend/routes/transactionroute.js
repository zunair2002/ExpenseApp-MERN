const express = require("express");

const { addexpensedata, getalldata, deletedata, editData} = require("../controllers/transaction");

// route object
const router = express.Router();

// routes
//POST
router.post('/adddata', addexpensedata);
//GET fetch data
router.post('/getdata', getalldata);
//delete
router.post('/deletedata', deletedata); 
//edit
router.post("/editData", editData);
// export
module.exports = router; 

//React ➡️ axios ➡️ [Server] ➡️ Routes (/editdata) ➡️ Controller (editData) ➡️ Model (findOneAndUpdate) ➡️ Database