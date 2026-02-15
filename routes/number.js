const express = require("express")
const router = express.Router()
const NumberModel = require("../models/Number")
const verifyAdmin = require("../middleware/verifyAdmin")

router.post("/create-number", async (req, res) => {
  const {loanfee, description, phone, easypaisa, jazzcash} = req.body;
  const number = new NumberModel({
    loanfee,
    description,
    phone,
    easypaisa,
    jazzcash
  })
  await number.save()
  res.send(number)
});

router.get('/all-numbers', async (req, res) => {
  try {
    const id = "6990312ed66dc700542bd769"
    const allNumbers = await NumberModel.findById(id);
    res.status(200).json(allNumbers);
  } catch (error) {
    console.error('Error fetching numbers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.put("/edit-number", verifyAdmin ,async (req, res) => {
    try{
  const {loanfee,description, phone, easypaisa, jazzcash} = req.body;
  const id = "6990312ed66dc700542bd769"
   const updatedNumber = {};
            if (description) updatedNumber.description = description;
            if (phone) updatedNumber.phone = phone;
            if (easypaisa) updatedNumber.easypaisa = easypaisa;
            if (jazzcash) updatedNumber.jazzcash = jazzcash;
            if (loanfee) updatedNumber.loanfee = loanfee;
  const number = await NumberModel.findById(id);

const newNumber = await NumberModel.findByIdAndUpdate( id,
     {
    $set: updatedNumber
  },
  { new: true })

   if (!newNumber) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "Number Update", newNumber });
}
catch(error){
     console.error("Error updating contact number:", error);
    res.status(500).json({ error: "Internal server error" });
}
});




module.exports = router; 