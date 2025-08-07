const transactionmodel = require("../models/transactionmodel");

const getalldata = async (req,res)=>{
    try{
        const data = await transactionmodel.find({userid:req.body.userid});
        res.status(200).json(data);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

const addexpensedata = async (req,res)=>{
    try{
        const newtransaction = new transactionmodel(req.body);
        await newtransaction.save();
        res.status(201).send("transaction successfully!");
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
} 

const deletedata = async (req, res) => {
    try {
        await transactionmodel.findOneAndDelete({ _id: req.body.transactionId });
        res.status(200).send('Transaction Deleted Successfully!');
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json(error);
    }
} 

const editData = async (req, res) => {
  try {
    await transactionmodel.findOneAndUpdate(
      { _id: req.body.transactionId }, 
      req.body.payload 
    );
    res.status(200).send("Edit successful");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


module.exports = { getalldata, addexpensedata, deletedata, editData };