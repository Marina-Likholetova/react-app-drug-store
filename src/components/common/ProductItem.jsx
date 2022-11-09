import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import Tab from "./Tab";
import { useDispatch } from "react-redux";
import { incrementByAmount } from "../../features/account/accountSlice";
import Counter from "./Counter";

export default function ProductItem() {
    const { id } = useParams();
    const navigate = useNavigate();
    const userStatus = useSelector((state) => state.account.value.status);
    const products = useSelector((state) => state.products.value);
    const product = products.find((item) => item.id === Number(id));
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();


    const increment = () => {
        setCount(count + 1);
    }

    const decrement = () => {
        count !== 0 && setCount(count - 1);
    }


    return (
        <div className="content-wrapper">
            <Link className="primary-link" to="/">Back to Homepage</Link>
            <div className="product-item">
                <div className="product-item__image image-wrapper">
                    <img src={product.img} alt={product.title} />
                </div>

                <div className="product-item__content">
                    <h3 className="product-item__title title">{product.title}</h3>
                    <span className="sm-sub">Product code {product.id}</span>
                    <span className="product-item__price">{product.price + product.currency}</span>
                    <div className="box">
                        <Counter count={count} decrement={decrement} increment={increment} />
                        <Button
                            variant="contained"
                            color="warning"
                            style={{ textTransform: "none" }}
                            onClick={() => {
                                if (userStatus) {
                                    dispatch(incrementByAmount({ id, count }));
                                    setCount(0);
                                } else {
                                    navigate("/login")
                                }
                            }}
                        >
                            Add to cart
                        </Button>
                    </div>
                    <Tab tabContent={{ Description: product.description, Ingredients: "Some ingredients" }} />
                </div>
            </div>
        </div>
    );
}
