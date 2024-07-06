import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const medsController = async (req, res) => {
  try {
    const { name, price, imageUrl } = req.body;
    const med = await prisma.medicine.create({
      data: {
        name: name,
        price: price,
        imageUrl: imageUrl,
      },
    });

    res.status(200).json({ success: true, message: med });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMedicine = async (req, res) => {
  try {
    const getMed = await prisma.medicine.findMany();
    res.status(500).json({ success: true, message: getMed });
  } catch (error) {
    res.status(500).json({ success: true, message: error.message });
  }
};
