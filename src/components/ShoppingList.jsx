import React from "react";
import { useDispatch, useSelector } from "react-redux";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { increment, decrement, removeShoppingCart } from "../features/account/accountSlice";
import Counter from "./common/Counter";


export default function ShoppingList() {
    const shoppingCarts = useSelector((state) => state.account.value.shoppingCarts);
    const products = useSelector(state => state.products.value);
    const dispatch = useDispatch();
    console.log(products);

    const isshoppingCarts = (id) => {
        const result = shoppingCarts.find((item) => Number(item.id) === id);
        return result;
    };

    const shoppingList = products
        .map((item) => {
            const shoppingCart = isshoppingCarts(item.id);
            return (shoppingCart) ? { ...item, ...shoppingCart } : ""
        })
        .filter((item) => item);

    const total = shoppingList.reduce((acc, curr) => acc + curr.price * curr.count, 0);


    
    return (
        <div className="content-wrapper shopping-container pd-1-3">
            <ul className="shopping-list">
                {shoppingList.map((item, i) => (
                    <li className="shopping-item">
                        <span>{i + 1}</span>
                        <div className="image-wrapper item__image">
                            <img src={item.img} alt={item.title} />
                        </div>
                        <div className="item">
                            <p className="item__title">{item.title}</p>
                            <div className="item__details">
                                <span className="item__price">{`${item.price} ${item.currency}`}</span>
                                <Counter
                                    count={item.count}
                                    decrement={() => dispatch(decrement(item.id))}
                                    increment={() => dispatch(increment(item.id))}
                                />
                            </div>
                        </div>
                        <span className="item__price">{`${item.count * item.price} ${item.currency}`}</span>
                        <IconButton aria-label="delete" onClick={() => dispatch(removeShoppingCart(item.id))}>
                            <DeleteIcon />
                        </IconButton>
                    </li>
                ))}
            </ul>
            <div className="total">
                <span>Total: </span>
                <p>{total}</p>
            </div>
        </div>
    );
}
