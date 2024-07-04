import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    console.log("Received request to register user:", req.body); 
    const parsedPhoneNumber = parseInt(phoneNumber, 10);
    const hashedPassword = bcrypt.hashSync(password, 10);
   

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber:parsedPhoneNumber,
        password: hashedPassword,
      },
    });

   
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
   
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
