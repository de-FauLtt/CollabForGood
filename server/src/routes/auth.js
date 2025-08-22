// server/routes/auth.js
import express from "express";
import prisma from "../prismaClient.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token.js";

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

    const token = generateToken({ id: ngo.id, role: 'ngo' });
    // Don't send the password back to the client
    const { password: _, ...ngoData } = ngo;

    res.status(201).json({ 
      success: true,  // Add success flag for consistency
      message: "NGO registered successfully", 
      ngo: ngoData,
      role: 'ngo',
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

    const existingDonor = await prisma.donor.findUnique({
      where: { email: email }
    });

    if (existingDonor) {
      return res.status(409).json({
        success: false,
        error: 'An account with this email already exists.'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const donor = await prisma.donor.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = generateToken({ id: donor.id, role: 'donor' });
    const { password: _, ...donorData } = donor;

    res.status(201).json({ 
      success: true,  // Add success flag for consistency
      message: "Donor registered successfully", 
      ngo: donorData,
      role: 'donor',
    });

  } catch (error) {
    console.error('Donor registration error:', error);
    
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

// NGO Login
router.post("/ngo-login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const ngo = await prisma.nGO.findUnique({ where: { email } });

    if (!ngo) {
      return res.status(404).json({ error: "NGO not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, ngo.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate and return the token
    const token = generateToken({ id: ngo.id, role: 'ngo' });
    res.json({ token, role: 'ngo' });
  } catch (error) {
    console.error('NGO login error:', error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
});

// Donor Login
router.post("/donor-login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const donor = await prisma.donor.findUnique({ where: { email } });

    if (!donor) {
      return res.status(404).json({ error: "Donor not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, donor.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate and return the token
    const token = generateToken({ id: donor.id, role: 'donor' });
    res.json({ token, role: 'donor' });
  } catch (error) {
    console.error('Donor login error:', error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
});

export default router;
