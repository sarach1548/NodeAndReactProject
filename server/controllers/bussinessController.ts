1
import { addBusiness, updateBusiness } from "../services/bussines.service";
import { Request, Response } from 'express';
import {  CustomError } from "../errors/CustomError"

const express = require('express');
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const result = await addBusiness(req.body);
        res.send(result);
    } catch (err: any) {
        if (err instanceof CustomError) {
            res.status(err.statusCode).send(err.message);
        } else {
            res.status(500).send('Internal Server Error');
        }
        console.error('Error:', err);
    }
});

router.put('/:businessId', async (req: Request, res: Response) => {
    try {
        const businessId = parseInt(req.params.businessId);
        const updatedData = req.body;

        const result = await updateBusiness(businessId,  updatedData);
        res.send(result);
    } catch (err: any) {
        if (err instanceof CustomError) {
            res.status(err.statusCode).send(err.message);
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
});

export default router;