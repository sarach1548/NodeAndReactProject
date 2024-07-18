import {getAll} from '../services/users.service'
import { Request, Response } from 'express';
import { User } from "../models/users";


import express from 'express';
const router = express.Router();
//const  {getAll} = require( '../services/users.service')
router.get('/', getAll);
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const users = await User.findOne({
            where: {
                id: req.params.id
            },
            raw: true
        })

        if (!users) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(users);
    } catch (err) {

        res.status(500).json({ message: 'Internal server error' });

        console.error('Error:', err);
    }
});
router.put('/:id',async (req: Request, res: Response) =>{

}); 
export default router;