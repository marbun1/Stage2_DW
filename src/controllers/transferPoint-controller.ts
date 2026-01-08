import { Request, Response } from "express";

import { prisma } from "../prisma/client";
import AppError from "../../utils/app-error";

export const transferPoints = async (req: Request, res: Response, next:any) => {
  const { amount, senderId, receiverId } = req.body
  
  try {

        //validasi lebih besar 0
        if (
          typeof amount !== "number" ||
          !Number.isInteger(amount) ||
          amount <= 0
        ) {
          throw new AppError("Transfer amount must be greater than 0", 400);
        }
        // 1. Check user existence (sender & recipient)
        const [senderExists, recipientExists] = await Promise.all([
            prisma.user.findUnique({ where: {id: senderId} }),
            prisma.user.findUnique({ where: {id: receiverId} }),
        ]);

        // Check if sender exists
        if (!senderExists) { throw new AppError('Sender not found', 404); }
        // Check if recipient exists
        if (!recipientExists) { throw new AppError('Recipient not found', 404); }
        
        // 2. Transaction (Atomic)
        await prisma.$transaction(async (tx) => {
            // Deduct points from sender
            const sender = await tx.user.update({
                where: {id: senderId},
                data: {points: {decrement: amount}},
            });

            // 3. Validate: Check if sender has enough point
            if (sender.points < 0) {
                throw new AppError('Insufficient points', 400);
            }

            // Add points to recipient
            const recipient = await tx.user.update({
                where: {id: receiverId},
                data: {points: {increment: amount}},
            });
        });

    } catch (error) {
        next(error);
    }

    res.status(200).json({ message: 'Points transferred successfully' });
}

// Controller function to READ users points with end point /transfer-point/:userId
export const getUserPoints = async (req: Request, res: Response, next: any) => {
    try {
        const userId = parseInt(req.params.userId as string); // Get userId from request parameters
        // Fetch user by ID
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, points: true }, // Select only the points field
        });

        // Check if user exists
        if (!user) { throw new AppError('User not found', 404);}

        // Respond with the user's points
        res.status(200).json({ 
            message: 'User points retrieved successfully',
            points: user.points });
    } catch (error) {
        next(error);
    }

  
};

