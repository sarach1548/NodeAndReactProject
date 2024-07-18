import { User } from "../models/users";
import { Request, Response } from 'express';

const getAll = () => async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();

        if (!users) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(users);
    } catch (err) {

        res.status(500).json({ message: 'Internal server error' });

        console.error('Error:', err);
    }
}

export {getAll}