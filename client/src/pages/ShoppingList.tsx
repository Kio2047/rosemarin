import React, {useEffect} from 'react';
import { setItems } from '../redux/actions';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import type { ShoppingListItem } from '../types/propTypes';
import {deleteItem, getMyShoppingList} from "../Utils/apiDBServiceShoppingList";

const ShoppingList = () => {

    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.items);

    useEffect(() => {
        getMyShoppingList()
            // .then(recipes => console.log(recipes))
            .then(itemsSL => dispatch(setItems(itemsSL)))
            .catch(err => console.log.bind(err))
    }, []);

    const delItemHelper = (items: ShoppingListItem[], id: number) => {
        const filtered = items.filter(item => item.id !== id);
        return [...filtered]
    }

    const delItemHandler = (id: number) => {
        deleteItem({id})
            .then(res => console.log(res))
            .catch(err => console.log.bind(err))
        dispatch(setItems(delItemHelper(items, id)));
    }

    return (
        <div>
            <input type="checkbox" id="my-modal" className="modal-toggle"/>
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Shopping list</h3>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                            <tr>
                                <th>Delete</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Unit</th>

                            </tr>
                            </thead>
                            <tbody>
                            {
                                items?.map((item, i) =>
                                    <tr key={i}>
                                        <th className="text-orange-800 text-2xl cursor-pointer hover:text-black"
                                            onClick={() => delItemHandler(item.id!)}
                                        >X
                                        </th>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.unit}</td>

                                    </tr>)
                            }

                            </tbody>
                        </table>
                    </div>

                    <div className="modal-action">
                        <label htmlFor="my-modal" className="btn btn-warning">Close</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingList;