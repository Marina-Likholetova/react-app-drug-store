import React from "react";
import { NavLink } from "react-router-dom";

import Carousel from "./common/Carousel";
import { categories } from "../db/productsDb";
import { carouselData } from "../db/carouselDb";


export default function Home() {
    return (
        <>
            <div className="content-wrapper">
                <Carousel carouselData={carouselData} />
            </div>

            <div className="content-wrapper cart-list pd-1-3">
                {categories.map((item) => (
                    <div className="cart cart__category" style={{ backgroundImage: `url(${item.img})` }}>
                        <NavLink
                            to={`categories/${item.name.replace(" ", "_")}`}
                            className="cart__category-link"
                        >
                            {item.name}
                        </NavLink>
                    </div>
                ))}
            </div>
        </>
    );
}
