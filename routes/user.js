const express = require("express")
const router = express.Router()
const nodemailer = require('nodemailer')
const User = require("../models/User")
const verifyAdmin = require("../middleware/verifyAdmin")


  router.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "travelbyservice@gmail.com",
      pass: "dzyyijaemkjezbbn", 
    },
  });

 try {
  await transporter.sendMail({
    from: "travelbyservice@gmail.com",
    to,
    subject,
    html: text,
  });

  return res.status(200).json({ message: "Email sent successfully" });
} catch (error) {
  console.error(error);
  return res.status(500).json({ error: "Failed to send email" });
}
});



router.post("/create", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      job,
      country,
      phoneNumber,
      address,
      cnicNumber,
      status,
      passportFrontImage,
      passportBackImage,
      frontCnic,
      backCnic,
      passportSizePhotoImage,
    } = req.body;

    if (
      !firstName || !lastName || !email || !job || !country || !phoneNumber || !address || !cnicNumber ||
      !passportFrontImage || !passportBackImage || !frontCnic || !backCnic || !passportSizePhotoImage
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User with this email already exists" });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      job,
      country,
      phoneNumber,
      address,
      cnicNumber,
      status: status || undefined,
      passportFrontImage,
      passportBackImage,
      frontCnic,
      backCnic,
      passportSizePhotoImage,
    });

    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});



// Backward-compatible: update loan status route now updates 'status'
router.put("/update-loan-status/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { loanStatus, status } = req.body;
    
    const newStatus = status || loanStatus;
    if (!id || !newStatus) {
      return res.status(400).json({ error: "User ID and status are required" });
    }

   const user = await User.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true } // return updated user
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Status updated successfully", user });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Preferred route name
router.put("/update-status/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!id || !status) {
      return res.status(400).json({ error: "User ID and status are required" });
    }
    const user = await User.findByIdAndUpdate(id, { status }, { new: true });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "Status updated successfully", user });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get-users", verifyAdmin,async (req, res) => {
  try {
    const users = await User.find();  
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



router.get("/by-cnic/:cnic", async (req, res) => {
  try {
    const cnic = req.params.cnic;

    const user = await User.findOne({ cnicNumber: cnic });

    if (!user) {
      return res.status(404).json({ error: "User not found with this CNIC" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error finding user by CNIC:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



router.get("/user-by-cnic/:cnic", async (req, res) => {
  
  const cnic = req.params.cnic;
  try {
    const user = await User.findOne({ cnicNumber: cnic });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user by CNIC:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router; 