import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    const parsedPhoneNumber = parseInt(phoneNumber, 10);
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber: parsedPhoneNumber,
        password: hashedPassword,
      },
    });

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const loginuser = await prisma.user.findFirst({
      where: { email: email },
    });
    const passwordMatch = bcrypt.compareSync(password, loginuser.password);
    if (passwordMatch === true) {
      const payload = {
        firstName: loginUser.firstName,
        lastName: loginUser.lastName,
        phoneNumber: loginUser.phoneNumber,
        email: loginUser.email,
      };
      res.status(200).json({ message: payload });
    } else {
      res.json("wrong credentials");
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "20m",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
