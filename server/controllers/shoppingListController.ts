import { Request, Response} from 'express'

/// <reference> session.d.ts
import * as express from '../types/request'
import ShoppingListItem from '../models/ShoppingListItem';

const addItem = async (req: Request, res: Response) => {
    try {
        if (req.user){
            const UserId = req.body.user.id;
            const {name, unit, quantity} = req.body;
            const result = await ShoppingListItem.create({
                name,
                unit,
                quantity,
                UserId,
            });
            res.status(201).send(result);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({"message": "Due to error item has not been added"});
    }
}

const updateItem = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await ShoppingListItem.destroy({where: {id}});
        await ShoppingListItem.create({
            name: req.body.name,
            unit: req.body.unit,
            quantity: req.body.quantity,
            // todo const userId = req.session.sid;
            UserId: 1
        });
        res.status(200).send({"message": "Item has been successfully updated"});
    } catch (err) {
        console.log(err);
        res.status(500).send({"message": "Due to error item has not been updated"});
    }
}

const removeItem = async (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        await ShoppingListItem.destroy({where: {id}});
        res.status(200).send({"message": "Item has been successfully deleted"});
    } catch (err) {
        console.log(err);
        res.status(500).send({"message": "Due to error item has not been deleted"});
    }
}

const getAllItems = async (req: Request, res: Response) => {
    try {
        if (req.user){
            const UserId = req.user.id
            const allItems = await ShoppingListItem.findAll({where: {UserId}});
            res.status(200).send(allItems);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({"message": "Due to error items have not been received"})
    }
}


export default {addItem, removeItem, updateItem, getAllItems}

