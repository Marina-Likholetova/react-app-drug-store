import React from "react";
import { useSelector } from "react-redux";
import ProductList from "./common/ProductList";


export default function Products() {
    const products = useSelector(state => state.products.value);

    return (
        <div className="content-wrapper pd-1-3">
            <h1 className="title">All products</h1>
            <ProductList data={products} />
        </div>
    );
}
