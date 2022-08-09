import { Request, Response} from 'express'

/// <reference> session.d.ts
import * as express from '../models/types/request'
import Model from '../models/queries/shoppingListQueries'

const addItem = async (req: Request, res: Response) => {
    try {
        if (req.user){
            const UserId = req.user.id;
            const {name, unit, quantity} = req.body;
            const newItem = await Model.createShoppingListItem({name, unit, quantity, UserId})

            console.log('shoppingListController, addItem successful 🟢')
            res.status(201).json(newItem);
        }
    } catch (error) {
        console.log('shoppingListController, addItem error 🔴: ', error);
        res.status(500).send({"message": "Due to error item has not been added"});
    }
}

const updateItem = async (req: Request, res: Response) => {
    try {
        const id = +req.params.id;
        const UserId = req.session.sid
        const {name, unit, quantity} = req.body
        await Model.updateItem({id, name, unit, quantity, UserId})

        console.log('shoppingListController, updateItem successful 🟢') 
        res.status(200).send({"message": "Item has been successfully updated"});
    } catch (error) {
        console.log('shoppingListController, updateItem error 🔴: ', error);
        res.status(500).send({"message": "Due to error item has not been updated"});
    }
}

const removeItem = async (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        await Model.removeItem(id);
            
        console.log('shoppingListController, removeItem successful 🟢') 
        res.status(200).send({"message": "Item has been successfully deleted"});
    } catch (error) {
        console.log('shoppingListController, removeItem error 🔴: ', error);
        res.status(500).send({"message": "Due to error item has not been deleted"});
    }
}

const getUserItems = async (req: Request, res: Response) => {
    try {
        if (req.user){
            const UserId = req.user.id
            const userItems = await Model.getUserItems(UserId);
            
            console.log('shoppingListController, getUserItems successful 🟢')  
            res.status(200).send(userItems);
        }
    } catch (error) {
        console.log('shoppingListController, getUserItems error 🔴: ', error); 
        res.status(500).send({"message": "Due to error items have not been received"})
    }
}


export default {addItem, removeItem, updateItem, getUserItems}

