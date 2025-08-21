// server/routes/auth.js
import express from "express";
import prisma from "../prismaClient.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// NGO Signup
// NGO Signup
router.post("/ngo-signup", async (req, res) => {
  try {
    const { name, email, password, orgType, location, phoneNumber } = req.body;
    
    const existingNGO = await prisma.nGO.findUnique({
      where: { email: email }
    });

    if (existingNGO) {
      return res.status(409).json({ 
        success: false,
        error: 'An account with this email already exists. Please use a different email or try logging in.' 
      });
    }

    // Remove the 'else' - it's unnecessary after a return
    const hashedPassword = await bcrypt.hash(password, 10);

    const ngo = await prisma.nGO.create({
      data: {
        name,
        email,
        password: hashedPassword,
        orgType,
        location,
        phoneNumber,
      },
    });

    // Don't send the password back to the client
    const { password: _, ...ngoData } = ngo;

    res.status(201).json({ 
      success: true,  // Add success flag for consistency
      message: "NGO registered successfully", 
      ngo: ngoData 
    });

  } catch (error) {
    console.error('NGO registration error:', error);
    
    // Handle specific Prisma unique constraint errors as a fallback
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return res.status(409).json({ 
        success: false,
        error: 'An account with this email already exists.' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: "Registration failed. Please try again." 
    });
  }
});

// Donor Signup
router.post("/donor-signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const donor = await prisma.donor.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "Donor registered successfully", donor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
